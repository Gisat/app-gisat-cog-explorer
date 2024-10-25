import { useEffect, useReducer } from "react";
import useSWR from "swr";
import { parseNodesFromPanther } from "../_appState/parsers.nodesFromResponse";
import { defaultStateValue } from "../_appState/state.defaults";
import { reducerSharedAppState } from "../_appState/state.reducer";
import { swrFetcher } from "../_logic/utils";

/**  Custom hook for creating shared app state by fetching data from panther backend */
export const useStateFromPanther = (fetchUrl: string) => {
  // Initialize the app state with useReducer
  const [sharedAppState, dispatch] = useReducer(
    reducerSharedAppState,
    defaultStateValue()
  );

  // Fetch data from the custom URL with SWR
  const { data, error, isLoading, isValidating } = useSWR(fetchUrl, swrFetcher);

  // Effect to update state based on the fetched data
  useEffect(() => {
    if (data) {
      // Parse the nodes from the response
      const { applicationsNode, datasourceNodes } = parseNodesFromPanther(data);

      // Dispatch actions to update the state
      dispatch({ type: "appNode", payload: applicationsNode });
      dispatch({ type: "fetchSources", payload: datasourceNodes });
    }
  }, [data, error]);

  // Return state and fetch status for usage in components
  return { sharedAppState, error, isLoading, isValidating, dispatch };
};
