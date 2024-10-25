import { AppSharedState } from "./state.models";
import { ActionLayerActiveChange } from "./state.models.actions";

/**
 * Handles action of the change of layer activity (make a layer yes/not visible)
 * @param state 
 * @param action 
 * @returns 
 */
export const reduceHandlerActiveLayerChange = (state: AppSharedState, action: ActionLayerActiveChange): AppSharedState => {
    const { payload } = action

    const changedLayerIndex = state.renderingLayers.findIndex(layer => layer.datasource.key === payload.key)

    if (changedLayerIndex < 0)
        throw new Error(`Shared State: Layer with key ${payload.key} not found`);

    const updatedLayers = state.renderingLayers
    updatedLayers[changedLayerIndex] = { 
        ...state.renderingLayers[changedLayerIndex], 
        isActive: payload.newValue }

    return { ...state, renderingLayers: updatedLayers }
}