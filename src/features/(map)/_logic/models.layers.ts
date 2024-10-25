import { Datasource } from "@/features/(shared)/_logic/models.panther.datasources";
import { LayerTreeInteraction } from "@/features/(shared)/_logic/models.panther.layertree";
import { Nullable } from "@/features/(shared)/_logic/types.universal";

/**
 * Layer in rendering context, but still undepedent to specific rendering framework
 */
export interface RenderingLayer {
    isActive: boolean,
    level: number,
    datasource: Datasource,
    category: string
    interaction: Nullable<LayerTreeInteraction>
}
