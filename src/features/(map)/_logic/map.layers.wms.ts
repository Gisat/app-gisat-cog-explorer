import { UsedDatasourceTypes } from "@/features/(shared)/_logic/models.panther.datasources";
import { LayerGeneralProps } from "./map.layers.models";
import {_WMSLayer as WMSLayer} from '@deck.gl/geo-layers';

/**
 * Creates WMS type of the DeckGL layer
 * @param props 
 * @returns 
 */
export const createWMSLayer = (props: LayerGeneralProps) => {

  // props destruction
  const { sourceNode: { source, key, datasourceType } } = props

  // datasource node validation
  const requiredDatasourceType = UsedDatasourceTypes.WMS
  if (datasourceType != requiredDatasourceType)
    throw new Error(`Datasource error - ${requiredDatasourceType} is required`);

  if (!source)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part`);

  if (!source.url)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part with URL`);

  if (!source.configuration)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires configuration`);

  if (!source.configuration.sublayers)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires sublayers in configuration`);

  // build DeckGL layer
  const layer = new WMSLayer({
    id: key,
    visible: props.isActive,
    data: source.url,
    minZoom: 0,
    maxZoom: 16,
    opacity: .05,
    layers: source.configuration.sublayers,
    serviceType: 'wms',
  })

  return layer
}