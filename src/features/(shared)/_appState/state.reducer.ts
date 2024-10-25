
import { parseDatasourcesToRenderingLayers } from "../_logic/parsers.layers"
import { OneOfStateActions } from "./state.models.actions"
import { AppSharedState } from "./state.models"
import { reduceHandlerActiveLayerChange } from "./state.reducer.handlers"
import { Nullable } from "../_logic/types.universal"

/**
 * React reducer for shared application state. Use it in useReducer react hook
 * @param currentState Current state instance
 * @param action One of possible actions for the application shared state
 * @returns New version of application shared state
 */
export const reducerSharedAppState = (currentState: AppSharedState, action: Nullable<OneOfStateActions>): AppSharedState => {

    if(!action)
        return currentState

    switch (action.type) {

        case "fetchSources":
            return { ...currentState, renderingLayers: parseDatasourcesToRenderingLayers(action.payload, currentState.appNode) }

        case "appNode":
            return { ...currentState, appNode: action.payload }

        case "layerActiveChange":
            return reduceHandlerActiveLayerChange(currentState, action)

        default:
            throw new Error("Shared State: Unknown action type");
    }
}
