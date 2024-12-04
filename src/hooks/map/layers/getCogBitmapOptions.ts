import {
  parseBoolean,
  parseColor,
  parseColorArray,
  parseNumber,
  parseNumberNull,
} from "@/utils/url/parseValueTypes";
import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import { LayerDefinition } from "@/types/layers/cogBitmapLayer";
import { useSearchParams } from "next/navigation";

type CogBitmapOptions = LayerDefinition["options"]["cogBitmapOptions"];

/**
 * Custom hook to compute CogBitmapOptions from URL parameters.
 *
 * @returns Parsed CogBitmapOptions object.
 */
export const useCogBitmapOptions = (): Partial<CogBitmapOptions> => {
  const searchParams = useSearchParams();

  // Temporary object to store options
  const rawOptions: Partial<CogBitmapOptions> = {};

  /********************************
   *      Iterate params
   *******************************/

  cogSettings.forEach((tool) => {
    const { name, valueType } = tool;
    const paramValue = searchParams.get(name);

    // Dynamically select the parser based on valueType
    switch (valueType) {
      case CogValueType.Boolean:
        rawOptions[name as keyof CogBitmapOptions] = parseBoolean(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.Number:
        rawOptions[name as keyof CogBitmapOptions] = parseNumber(
          tool.name,
          paramValue
        ) as any;
        break;
      case CogValueType.NumberNull:
        rawOptions[name as keyof CogBitmapOptions] = parseNumberNull(
          tool.name,
          paramValue
        ) as any;
        break;

      // Other cases
      case CogValueType.Color:
        rawOptions[name as keyof CogBitmapOptions] = parseColor(
          tool.name,
          paramValue
        ) as any;
      case CogValueType.ColorArray:
      // rawOptions[name as keyof CogBitmapOptions] = parseColorArray(
      //   tool.name,
      //   paramValue
      // ) as any;
      case CogValueType.CommaSeparatedColors:
      case CogValueType.CommaSeparatedNumbers:
      case CogValueType.CommaSeparatedValueColorPairs:
      case CogValueType.JsonObject:
      case CogValueType.Range:
      case CogValueType.Selection:
      case CogValueType.Text:
      case CogValueType.ValueColorArray:
        break;

      default:
        console.warn(`No parser defined for valueType: ${valueType}`);
        break;
    }
  });

  // Filter out `undefined` values
  const options: Partial<CogBitmapOptions> = Object.fromEntries(
    Object.entries(rawOptions).filter(([_, value]) => value !== undefined)
  ) as Partial<CogBitmapOptions>;

  return options;
};
