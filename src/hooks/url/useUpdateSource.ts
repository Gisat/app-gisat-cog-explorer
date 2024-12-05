import { useSearchParams, useRouter } from "next/navigation";

/**
 * Custom hook to push Data Source refference to URL.
 *
 * @returns The `updateSource` function to update or remove Data Source refference.
 */
export const useUpdateSource = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    url: string // https://example.com/path/to/cog.tif
  ): void => {
    // Clone current query parameters
    const param = new URLSearchParams(searchParams.toString());

    // Update or remove the parameter
    if (url !== undefined && url !== null) {
      param.set("cogUrl", url.toString()); // Update the parameter
    } else {
      param.delete("cogUrl"); // Remove the parameter
    }

    // Push updated query string to the router
    router.push(`?${param.toString()}`, { scroll: false });
  };
};
