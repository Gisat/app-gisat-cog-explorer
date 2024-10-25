import { Nullable } from "@/features/(shared)/_logic/types.universal";

/**
 * Function type that represents map feature interaction
 */
export type FeatureInteractionFunc = (
    propertiesEntity: Nullable<any>,
    coordinatesEntity: Nullable<[number, number]>
) => void

/**
 * One of all possible map or feature interactions
 */
export type OneOfInteractionFunc = FeatureInteractionFunc // ... | OtherHandlerType etc.