import { UsedDatasourceTypes } from "@/features/(shared)/_logic/models.panther.datasources"
import { RenderingLayer } from "./models.layers"
import { LayerGeneralProps } from "./map.layers.models"
import { createGeojsonLayer } from "./map.layers.geojson";
import { createTileLayer } from "./map.layers.tile";
import { createMVTLayer } from "./map.layers.mvt";
import { LayerTreeInteraction } from "@/features/(shared)/_logic/models.panther.layertree";
import { createWMSLayer } from "./map.layers.wms";

export const parseLayersFromSharedState = (
  sharedStateLayers: RenderingLayer[],
  interactionRenderingMap: Map<LayerTreeInteraction, any>) => {

  const layerSwitch = (layer: RenderingLayer) => {

    const layerProps: LayerGeneralProps = {
      style: null,
      sourceNode: layer.datasource,
      isActive: layer.isActive,
      onClickHandler: layer.interaction && interactionRenderingMap.get(layer.interaction)
    }

    switch (layer.datasource.datasourceType) {

      case UsedDatasourceTypes.Tiled:
        return createTileLayer(layerProps)

      case UsedDatasourceTypes.MVT:
        return createMVTLayer(layerProps)

      case UsedDatasourceTypes.WMS:
        return createWMSLayer(layerProps)

      case UsedDatasourceTypes.Spatial:
        return createGeojsonLayer(layerProps)

      default:
        throw new Error(`Datasource Error - Unknown datasource type ${layer.datasource.datasourceType}`);

    }
  }
  return sharedStateLayers.map((source: RenderingLayer) => {
    return layerSwitch(source)
  })
}