import { BitmapLayer, TileLayer } from "deck.gl";
import { UsedDatasourceTypes } from "@/features/(shared)/_logic/models.panther.datasources";
import { LayerGeneralProps } from "./map.layers.models";

/**
 * Creates Tile type of the DeckGL layer
 * @param props 
 * @returns 
 */
export const createTileLayer = (props: LayerGeneralProps) => {

  // props destruction
  const { sourceNode: { source, key, datasourceType } } = props

  // datasource node validation
  const requiredDatasourceType = UsedDatasourceTypes.Tiled
  if (datasourceType != requiredDatasourceType)
    throw new Error(`Datasource error - ${requiredDatasourceType} is required`);

  if(!source)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part`);

  if(!source.url)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part with URL`);

  // build DeckGL layer
  const layer = new TileLayer<ImageBitmap>({
    id: key,
    visible: props.isActive,
    data: [source.url],
    minZoom: 0,
    maxZoom: 19,
    tileSize: 256,
    maxRequests: 20,
    pickable: true,
    renderSubLayers: props => {
      const [[west, south], [east, north]] = props.tile.boundingBox;
      const { data, ...otherProps } = props;

      return [
        new BitmapLayer(otherProps, {
          image: data,
          bounds: [west, south, east, north]
        })
      ];
    }
  })

  return layer
}