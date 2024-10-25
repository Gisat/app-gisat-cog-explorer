import { RenderingLayer } from "@/features/(map)/_logic/models.layers";
import { ApplicationClient, GraphNode } from "../_logic/models.panther";

/**
 * Shared state of the application
 */
export interface AppSharedState {
    appNode: ApplicationClient, // context of the application from the backend
    renderingLayers: RenderingLayer[] // backend layers in rendering context
}