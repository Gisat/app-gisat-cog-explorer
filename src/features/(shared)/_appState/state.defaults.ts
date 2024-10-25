import { UsedGraphNodes } from "../_logic/models.panther"
import { AppSharedState } from "./state.models"

/**
 * Creates default version of the shared app state before data input from backend
 * @returns 
 */
export const defaultStateValue = () => {
    const defaultState: AppSharedState = {
        appNode: {
            key: "default",
            description: null,
            lastUpdatedAt: Date.now(),
            nameDisplay: "Default App Node",
            nameInternal: "defaultAppNode",
            nodeType: UsedGraphNodes.Application,
            configuration: {}
        },
        renderingLayers: []
    }

    return defaultState
}