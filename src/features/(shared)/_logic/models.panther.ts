import { Nullable } from "./types.universal";

/**
 * Entity that has relevant time interval.
 * Example: Period is connected to some time range.
 */
export interface HasInterval {
  validUtcIntervalIso: string;
  validFrom: number;
  validTo: number;
}

/**
 * Entity with custom configuration
 */
export interface HasConfigiration {
  configuration: any;
}

/**
 * What types of graph nodes we use in metadata model
 */
export enum UsedGraphNodes {
  Application = "application",
  Datasource = "datasource",
  Place = "place",
  Period = "period",
  Case = "case",
  Scenario = "scenario",
  Scope = "scope",
  Attribute = "attribute",
  AreaTree = "areaTree",
  AreaTreeLevel = "areaTreeLevel",
  LayerTemplate = "layerTemplate",
  Style = "style",
}

/**
 * Single node from Panther Metadata service
 */
export interface GraphNode {
  nodeType: UsedGraphNodes;
  key: string;
  nameDisplay: string;
  nameInternal: string;
  description: Nullable<string>;
  lastUpdatedAt: number;
}

export interface ApplicationClient extends GraphNode, HasConfigiration {}
