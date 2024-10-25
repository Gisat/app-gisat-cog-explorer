import { GraphNode, HasConfigiration } from "./models.panther"
import { Nullable } from "./types.universal"

/**
 * Style node - styling datasources
 */
export interface DatasourceStyling extends GraphNode {
  definition: object
}

/**
 * What datasources we use in system
 */
export enum UsedDatasourceTypes {
  Attribute = "property", // column with attribute values
  Spatial = "vector", // column with geomery values
  FeatureId = "featureId", // column with feature IDs values
  WMS = "wms", // WMS online source
  COG = "cogBitmap", // COG online source
  MVT = "mvt", // mapbox tiled vector image
  Tiled = "tiled" // tiled vector image
}

/**
 * General datasource structure. 
 * Datasource is geodata entity with some features.
 * We have variable types of datasources (shapefiles, images, attributes, online sources)
 */
export interface Datasource extends GraphNode {
  datasourceType: Nullable<UsedDatasourceTypes>
  source: Partial<Source>
}

export interface Source extends WebSource, PostgisSource, TiledVector, HasConfigiration { }


/**
 * Datasource data content inside postgis database managed by data service.
 * Mostly used for vector data (GeoJSON, SHP etc.)
 */
interface PostgisSource {
  propertyName: string
  vectorKey: string
}

/**
 * Datasource content for online datasources (WMS, WFS, WCF, Cog)
 * WMS - Web Map Service
 * WFS - Web Feature Service
 * WCF - Web Coverage Service
 * Cog - Cloud Optimized GeoTIFF
 */
interface WebSource {
  url: string,
}

/**
 * Tiled vector properties
 */
interface TiledVector {
  uniqueIdProperty: string,
  minZoom: number,
  maxZoom: number
}