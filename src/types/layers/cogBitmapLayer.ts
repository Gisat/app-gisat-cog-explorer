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
      useAutoRange?: boolean | undefined;
      useDataForOpacity?: boolean | undefined;
      alpha?: number | undefined;
      useHeatMap?: boolean | undefined;
      multiplier?: number | undefined;
      clipLow?: number | null | undefined;
      clipHigh?: number | null | undefined;
      clippedColor?: chroma.Color | undefined;
      colorScale?: chroma.Color[] | undefined;
      colorScaleValueRange?: number[] | undefined;
      useColorsBasedOnValues?: boolean | undefined;
      colorsBasedOnValues?: [number, chroma.Color][] | undefined;
      useColorClasses?: boolean | undefined;
      colorClasses?:
        | [chroma.Color, [number, number], [boolean, boolean]?][]
        | undefined;
      unidentifiedColor?: chroma.Color | undefined;
      nullColor?: chroma.Color | undefined;
      useSingleColor?: boolean | undefined;
      color?: chroma.Color | undefined;
      blurredTexture?: boolean | undefined;
    };
  };
  type: string;
}
