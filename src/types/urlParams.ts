// Props definition based on deck.gl-geotiff geoimage documentation
/**
 * https://github.com/gisat-panther/deck.gl-geotiff/tree/dev/geoimage/src/geoimage
 * version: v1.11.2
 */

export interface urlParams {
  // COG Params from URL
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

  // Map view Params
  lat?: number | undefined;
  lon?: number | undefined;
  boxRange?: number | undefined;

  // Data source (URL)
  url?: string | undefined;
}

type UrlParamTypes = {
  [K in keyof urlParams]: Exclude<urlParams[K], undefined>;
};
