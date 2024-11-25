import { CogValueType } from "@/config/cog/cog-value-types";
import { parseBoolean, parseNumber } from "./parseValueTypes";
import { cogSettings } from "@/config/cog/cog-tools-config";
import { urlParams } from "@/types/urlParams";

/**
 * Utility function to retrieve a single parameter from the URL or provided search parameters.
 *
 * @param paramName - The name of the parameter to retrieve.
 * @param searchParams - Optional `URLSearchParams` object (e.g., from `useSearchParams`).
 * @param url - Optional URL string to extract the parameter from.
 * @returns The parsed value of the parameter, or `undefined` if it doesn't exist.
 */

export const getParam = <ParamName extends keyof urlParams>(
  paramName: ParamName,
  searchParams?: URLSearchParams,
  url?: string
): urlParams[ParamName] | undefined => {
  // Use the provided URL or the current browser URL
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  if (!currentUrl && !searchParams) {
    console.warn("No URL or search parameters provided.");
    return undefined;
  }

  // Use provided searchParams or extract from the URL
  const params =
    searchParams || new URLSearchParams(new URL(currentUrl).search);

  // Retrieve the parameter value
  const paramValue = params.get(paramName);

  if (paramValue === null || paramValue === "") {
    // Return undefined if the parameter is not present
    return undefined;
  }

  // Determine the parameter's type based on cogSettings
  const tool = cogSettings.find((tool) => tool.name === paramName);

  if (!tool) {
    console.error(
      `No configuration found for parameter: ${paramName} in COG Settings`
    );
  }

  // Parse the parameter value based on its type
  switch (tool?.valueType) {
    case CogValueType.Boolean:
      return parseBoolean(paramName, paramValue) as urlParams[ParamName];
    case CogValueType.Number:
      return parseNumber(paramName, paramValue) as urlParams[ParamName];
    // Add cases for other value types as needed
    case CogValueType.Text:
      return null as urlParams[ParamName];
  }
};
