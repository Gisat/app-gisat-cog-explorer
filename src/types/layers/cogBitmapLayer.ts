export interface LayerDefinition {
  key: string;
  layerKey: string;
  name: string;
  opacity: number;
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
    cogBitmapOptions: {
      useAutoRange?: boolean;
      useDataForOpacity?: boolean;
      alpha?: number;
      useHeatMap?: boolean;
      multiplier?: number;
      clipLow?: number | null;
      clipHigh?: number | null;
      clippedColor?: chroma.Color;
      colorScale?: chroma.Color[];
      colorScaleValueRange?: number[];
      useColorsBasedOnValues?: boolean;
      colorsBasedOnValues?: [number, chroma.Color][];
      useColorClasses?: boolean;
      colorClasses?: [chroma.Color, [number, number], [boolean, boolean]?][];
      unidentifiedColor?: chroma.Color;
      nullColor?: chroma.Color;
      useSingleColor?: boolean;
      color?: chroma.Color;
      blurredTexture?: boolean;
    };
  };
  type: string;
}
