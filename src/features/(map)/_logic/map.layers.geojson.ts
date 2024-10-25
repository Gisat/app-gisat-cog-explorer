import { GeoJsonLayer } from "deck.gl";
import { UsedDatasourceTypes } from "@/features/(shared)/_logic/models.panther.datasources";
import { LayerGeneralProps } from "./map.layers.models";

/**
 * Creates GeoJson type of the DeckGL layer
 * @param props 
 * @returns 
 */
export const createGeojsonLayer = (props: LayerGeneralProps) => {

    // props destruction
    const { sourceNode: { source, key, datasourceType } } = props

    // datasource node validation
    const requiredDatasourceType = UsedDatasourceTypes.Spatial
    if (datasourceType != requiredDatasourceType)
      throw new Error(`Datasource error - ${requiredDatasourceType} is required`);
  
    if(!source.url)
      throw new Error(`Datasource error - ${requiredDatasourceType} requires source part with URL`);

    const layer = new GeoJsonLayer({
        id: key,
        visible: props.isActive,
        data: source.url, 
        filled: true,
        stroked: true,
        pointRadiusScale: .2,
        getPointRadius: 50,
        getFillColor: [255, 100, 100],
        getLineColor: [255, 100, 100],
      })

      return layer
}