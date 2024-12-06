import { DeckGlMap } from '@gisatcz/ptr-maps';
// React hooks
import { useState } from 'react';

// Map configuration
import { useCogBitmapLayer } from '@/hooks/map/layers/useCogBitmapLayer';
import { InitViewResult, useInitView } from '@/hooks/map/view/useInitView';
import { useUpdateMapView } from '@/hooks/url/useUpdateMapView';
import { getMapView } from '@/utils/url/getMapView';
// Import Layers (Hooks)

const Map = (): React.ReactElement => {
  // Import Hooks
  const initialView = useInitView(getMapView()); // Inits view. getMapView is optional
  const updateMapView = useUpdateMapView(); // Just a hook
  /*****************
   *  Map View
   *****************/
  const [viewState, setViewState] = useState<InitViewResult>(initialView);

  const onViewChange = (event: any) => {
    const view = { ...viewState, ...event };
    const lon = view.center.lon;
    const lat = view.center.lat;
    const boxRange = view.boxRange; // Convert zoom to box range (in meters)
    setViewState(view); // Map view state
    updateMapView(lon, lat, boxRange); // Push view to URL
  };

  /*****************
   *  Map Layers
   *****************/
  const cogBitmapLayer = useCogBitmapLayer();

  const layers = cogBitmapLayer?.options.url ? [cogBitmapLayer] : []; // TODO: TypeScript friendly layers

  return (
    <DeckGlMap
      view={{ ...viewState }}
      backgroundLayer={{
        key: 'background-osm',
        type: 'wmts',
        options: {
          url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        },
      }}
      layers={layers}
      onViewChange={onViewChange}
      onZoomEnd={{}}
      onPanEnd={{}}
    />
  );
};

export default Map;
