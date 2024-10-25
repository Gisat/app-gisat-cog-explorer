import { MVTLayer } from "deck.gl";
import { UsedDatasourceTypes } from "@/features/(shared)/_logic/models.panther.datasources";
import { LayerGeneralProps } from "./map.layers.models";

/**
 * Creates MVT type of the DeckGL layer
 * @param props 
 * @returns 
 */
export const createMVTLayer = (props: LayerGeneralProps) => {

  // props destruction
  const { sourceNode: { source, key, datasourceType } } = props

  // datasource node validation
  const requiredDatasourceType = UsedDatasourceTypes.MVT
  if (datasourceType != requiredDatasourceType)
    throw new Error(`Datasource error - ${requiredDatasourceType} is required`);

  if (!source)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part`);

  if (!source.url)
    throw new Error(`Datasource error - ${requiredDatasourceType} requires source part with URL`);

  // build DeckGL layer
  const layer = new MVTLayer({
    id: key,
    visible: props.isActive,
    data: source.url,
    minZoom: 0,
    maxZoom: 16,
    getLineColor: [0, 0, 200, 255],
    getFillColor: [0, 0, 255, 255],
    pointRadiusScale: 10,
    pointRadiusMinPixels: 2,
    pointRadiusMaxPixels: 5,
    getElevation: d => d.properties.height, // Example of how to use properties from the vector tile
    pickable: true,
    onHover: ({ object, x, y }) => {
      const canvas = document.querySelector('canvas');
      if (!canvas)
        throw new Error("MSV Rendering: Missing canvas");

      if (object) {
        canvas.style.cursor = 'pointer';  // Change cursor when hovering over a point
      } else {
        canvas.style.cursor = 'default';  // Reset cursor when not hovering
      }
    },
    onClick: (info, event) => {

      if (!props.onClickHandler)
        return

      const geojsonObject = info.object
      const attributes = geojsonObject.properties
      props.onClickHandler(attributes, null)
    }
  })

  return layer
}