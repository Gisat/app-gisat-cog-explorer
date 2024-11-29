import { useMemo } from "react";

/**
 * Type definition for the input properties to `useInitView`.
 * All properties are required.
 */
type InitViewProps = {
  lon?: string | number; // Longitude as a string or number
  lat?: string | number; // Latitude as a string or number
  boxRange?: string | number; // Box range as a string or number
};

/**
 * Type definition for the output structure of `useInitView`.
 */
export type InitViewResult = {
  center: {
    lon: number; // Longitude as a number
    lat: number; // Latitude as a number
  };
  boxRange: number; // Box range as a number
};

/**
 * React hook to compute and memoize a map view configuration.
 *
 * @param input - An optional object containing `lon`, `lat`, and `boxRange` values.
 *                Defaults are applied for missing or invalid values. Default view - Czech Republic.
 *
 * @returns A memoized object with the `center` coordinates (`lon` and `lat`) and `boxRange`.
 *
 * Example Usage:
 * ```tsx
 * const initView = useInitView({ lon: "15.5", lat: "50.1", boxRange: 120000 });
 * console.log(initView);
 * // Logs: { center: { lon: 15.5, lat: 50.1 }, boxRange: 120000 }
 * ```
 */
const useInitView = (input: Partial<InitViewProps> = {}): InitViewResult => {
  const { lon = 15.473, lat = 49.8175, boxRange = 560000 } = input;

  return useMemo(() => {
    return {
      center: {
        lon: Number.isFinite(Number(lon)) ? Number(lon) : 14.35, // Parse and validate longitude
        lat: Number.isFinite(Number(lat)) ? Number(lat) : 49.92, // Parse and validate latitude
      },
      boxRange: Number.isFinite(Number(boxRange)) ? Number(boxRange) : 94088, // Parse and validate box range
    };
  }, [lon, lat, boxRange]); // Dependencies for memoization
};

export { useInitView };
