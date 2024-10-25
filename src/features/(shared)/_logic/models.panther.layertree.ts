import { Nullable } from "./types.universal";

/**
 * Type of interaction in layer tree
 */
export enum LayerTreeInteraction{
    FeatureDetail = "feature-detail"
}

/**
 * Layer tree represents application-specific usage of the datasource layer (like level, interaction type etc.)
 */
export interface LayerTreeElement{
    key: string,
    level: number,
    isBasemap: boolean,
    category: string, // TODO in the future maybe Enum
    onClickInteraction: Nullable<LayerTreeInteraction>
}