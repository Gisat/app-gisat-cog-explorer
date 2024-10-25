import { AppSharedState } from "./state.models";

/**
 * Finds active layer in current shared state
 * @param state Actual shared state of the application
 * @returns Active layer from the state
 */
export const findActiveLayer = ({renderingLayers}: AppSharedState) => {
    const result = renderingLayers.find(layer => layer.isActive === true)
    return result
}