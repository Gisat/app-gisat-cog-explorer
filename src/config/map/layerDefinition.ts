export type LayerDefinition = {
  key: string;
  layerKey: string;
  name: string;
  opacity?: number;
  options: {
    colorScale?: string[];
    useHeatMap?: boolean;
    colorScaleValueRange?: number[];
    useChannel?: number | undefined;
    clipLow?: number;
    clipHigh?: number;
    blurredTexture?: boolean;
    url: undefined | string;
    type: string;
    hoverable?: boolean;
    pickable?: boolean;
    cogBitmapOptions: any;
  };
  type: string;
};
