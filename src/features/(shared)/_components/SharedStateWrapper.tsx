import { Dispatch } from "react";
import { AppSharedState } from "../_appState/state.models";
import { OneOfStateActions } from "../_appState/state.models.actions";
import { Nullable } from "../_logic/types.universal";
import { SharedStateContext, SharedStateDispatchContext } from "../_appState/state.context";

export default (props: {
    children: any,
    sharedState: AppSharedState,
    sharedStateDispatchFunction: Dispatch<Nullable<OneOfStateActions>>
}
) =>
    <SharedStateContext.Provider value={props.sharedState}>
        <SharedStateDispatchContext.Provider value={props.sharedStateDispatchFunction}>
            {props.children}
        </SharedStateDispatchContext.Provider>
    </SharedStateContext.Provider>
