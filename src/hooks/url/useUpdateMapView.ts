import { useSearchParams, useRouter } from "next/navigation";

/**
 * Custom hook to update the map view parameters (`lon`, `lat`, `boxRange`) in the URL query string.
 *
 * @returns A function to update `lon`, `lat`, and `boxRange` in the query string.
 */
export const useUpdateMapView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    lon: string | number,
    lat: string | number,
    boxRange: string | number
  ): void => {
    // Round `lon` and `lat` to 2 decimal places and ensure `boxRange` is an integer
    const roundedLon = parseFloat(lon.toString()).toFixed(2);
    const roundedLat = parseFloat(lat.toString()).toFixed(2);
    const roundedBoxRange = Math.round(parseFloat(boxRange.toString()));

    // Clone current query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update or set the parameters
    params.set("lon", roundedLon);
    params.set("lat", roundedLat);
    params.set("boxRange", roundedBoxRange.toString());

    // Push updated query string to the router
    router.push(`?${params.toString()}`, { scroll: false });
  };
};
