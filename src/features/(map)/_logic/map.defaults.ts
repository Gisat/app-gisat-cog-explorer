import { MapViewState } from "@deck.gl/core"
import { MapView } from "deck.gl"

/**
 * Default state of the map
 * @returns 
 */
export const defaultMapState = () => {
    const initMapState: MapViewState = {
        latitude: 41.89,
        longitude: 12.46,
        zoom: 4.5,
        maxZoom: 20,
        maxPitch: 89,
        bearing: 0,
      }

    return initMapState
}

/**
 * Default state of the map view
 * @returns 
 */
export const defaultMapView = () => {
  const defaultView = new MapView({ repeat: true })
  return defaultView
}