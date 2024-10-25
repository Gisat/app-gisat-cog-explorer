import { createContext, Dispatch } from "react";
import { OneOfStateActions } from "./state.models.actions";
import { defaultStateValue } from "./state.defaults";
import { AppSharedState } from "./state.models";

/**
 * Creates react context for shared application state
 */
export const SharedStateContext = createContext<AppSharedState>(defaultStateValue());

/**
 * Creates react context for shared state dispatch method
 */
export const SharedStateDispatchContext = createContext<Dispatch<OneOfStateActions>>(() => console.log("none"));
