// import chroma from "chroma-js";
import { urlParams } from "@/types/urlParams";
// Import helpers (parsers)
import { parseBoolean, parseNumber, parseNumberNull } from "./parseValueTypes";
// Import COG Settings
import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";

export const getParamsUrl = (
  url?: string,
  searchParams?: URLSearchParams,
  asJson: boolean = false // Add a flag to determine the output format
): Partial<urlParams> | string => {
  // Default to the current browser URL if no URL is provided
  const currentUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");

  // Error handling
  if (!currentUrl) {
    console.warn("No URL available to parse.");
    return asJson ? "{}" : {};
  }
  if (!searchParams) {
    console.warn("No search parameters provided.");
    return asJson ? "{}" : {};
  }

  const params = new URLSearchParams(new URL(currentUrl).search);
  const result: Partial<urlParams> = {};

  /********************************
   *      Iterate params
   *******************************/

  // URL to data source

  // COG Params from URL
  cogSettings.forEach((tool) => {
    const { name, valueType } = tool;
    const paramValue = searchParams.get(name);

    // Dynamically select the parser based on valueType
    switch (valueType) {
      case CogValueType.Boolean:
        result[name as keyof urlParams] = parseBoolean(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.Number:
        // Cast `name` to `keyof urlParams` for type safety
        result[name as keyof urlParams] = parseNumber(
          tool.name,
          paramValue
        ) as any;
        break;

      case CogValueType.NumberNull:
        result[name as keyof urlParams] = parseNumberNull(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.Color:
        break;
      case CogValueType.ColorScale:
        break;
      case CogValueType.CommaSeparatedColors:
        break;
      case CogValueType.CommaSeparatedNumbers:
        break;
      case CogValueType.CommaSeparatedValueColorPairs:
        break;
      case CogValueType.JsonObject:
        break;
      case CogValueType.Range:
        break;
      case CogValueType.Selection:
        break;
      case CogValueType.Text:
        break;
      case CogValueType.ValueColorArray:
        break;

      // Add other value types if necessary
      default:
        console.warn(`No parser defined for valueType: ${valueType}`);
        break;
    }
  });

  // Convert the result to JSON if requested
  return asJson ? JSON.stringify(result, null, 2) : result;
};
