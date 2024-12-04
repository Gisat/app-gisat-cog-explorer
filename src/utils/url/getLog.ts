import { urlParams } from "@/types/urlParams";
import { useSearchParams } from "next/navigation";
// Import helpers (parsers)
import {
  parseBoolean,
  parseColor,
  parseNumber,
  parseNumberArray,
  parseNumberNull,
  parseColorArray,
  parseValueColorArray,
} from "./parseValueTypes";
// Import COG Settings
import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";

export const getLog = (): string | null => {
  const searchParams = useSearchParams();
  const result: Record<string, any> = {};

  /********************************
   *      Iterate params
   *******************************/

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
        result[name as keyof urlParams] = parseColor(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.ColorArray:
        result[name as keyof urlParams] = parseColorArray(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.NumberArray:
        result[name as keyof urlParams] = parseNumberArray(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.ValueColorArray:
        result[name as keyof urlParams] = parseValueColorArray(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.ColorScale:
        break;
      case CogValueType.CommaSeparatedColors:
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

      // Add other value types if necessary
      default:
        console.warn(`No parser defined for valueType: ${valueType}`);
        break;
    }
  });

  // Convert the result to JSON if requested
  return JSON.stringify(result, null, 2);
};
