import chroma from "chroma-js";
import { urlParams } from "@/types/urlParams";
import { parseBoolean, parseNumber } from "./parseValueTypes";
import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";

// A pure function to parse URL parameters
export const getParamsUrl = (
  searchParams: URLSearchParams,
  asJson: boolean = false
): Partial<urlParams> | string => {
  const result: Partial<urlParams> = {};

  // Parse the URL
  result.url = searchParams.get("url") || undefined;

  // Iterate over cogSettings to parse specific parameters
  cogSettings.forEach((tool) => {
    const { name, valueType } = tool;
    const paramValue = searchParams.get(name);

    switch (valueType) {
      case CogValueType.Boolean:
        result[name as keyof urlParams] = parseBoolean(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.Number:
        result[name as keyof urlParams] = parseNumber(
          tool.name,
          paramValue
        ) as any;
        break;
      default:
        console.warn(`No parser defined for valueType: ${valueType}`);
        break;
    }
  });

  // Convert result to JSON if requested
  return asJson ? JSON.stringify(result, null, 2) : result;
};
