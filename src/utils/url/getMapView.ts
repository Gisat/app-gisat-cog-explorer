/* eslint-disable */
import { useSearchParams } from 'next/navigation';

/**
 * Utility function to retrieve `lon`, `lat`, and `boxRange` from the URL query parameters.
 *
 * @returns An object containing the parsed `lon`, `lat`, and `boxRange`.
 */
export const getMapView = (): {
  lon: number | undefined;
  lat: number | undefined;
  boxRange: number | undefined;
} => {
  // Retrieve search parameters from `useSearchParams`
  const searchParams = useSearchParams();

  // Get the raw parameter values from the query string
  const rawLon = searchParams.get('lon');
  const rawLat = searchParams.get('lat');
  const rawBoxRange = searchParams.get('boxRange');

  // Parse and validate the parameters
  const lon = parseCoordinate(rawLon);
  const lat = parseCoordinate(rawLat);
  const boxRange = parseBoxRange(rawBoxRange);

  // Return the parsed map view object
  return { lon, lat, boxRange };
};

/**
 * Parses and validates a coordinate value (`lon` or `lat`).
 *
 * @param value - The raw coordinate value as a string.
 * @returns The parsed coordinate as a number, or `undefined` if invalid.
 */
const parseCoordinate = (value: string | null): number | undefined => {
  if (value === null || value === undefined) return undefined;

  const parsedValue = parseFloat(value);
  if (isNaN(parsedValue)) {
    console.warn(`Invalid coordinate value: "${value}"`);
    return undefined;
  }

  // Round to 2 decimal places
  return parseFloat(parsedValue.toFixed(2));
};

/**
 * Parses and validates the box range value.
 *
 * @param value - The raw box range value as a string.
 * @returns The parsed box range as an integer, or `undefined` if invalid.
 */
const parseBoxRange = (value: string | null): number | undefined => {
  if (value === null || value === undefined) return undefined;

  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    console.warn(`Invalid box range value: "${value}"`);
    return undefined;
  }

  return parsedValue;
};
