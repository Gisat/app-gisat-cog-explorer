import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import { transformToColor } from "./dataTypes";

export const getCogParams = (searchParams: URLSearchParams) => {
  const getValues = () => {
    const values: Record<string, any> = {};

    for (const tool of cogSettings) {
      const paramValueString = searchParams.get(tool.name);
      let parsedValue: any;

      // Parse the paramValueString based on the tool's expected valueType
      if (paramValueString !== null) {
        switch (tool.valueType) {
          case CogValueType.Boolean:
            parsedValue = paramValueString === "true";
            break;
          case CogValueType.Number:
          case CogValueType.Range:
            parsedValue = Number(paramValueString);
            break;
          case CogValueType.Color:
          case CogValueType.ColorScale:
            // Transform color-related values if necessary
            parsedValue = transformToColor(paramValueString);
            break;
          // Add cases for additional types if needed
          default:
            parsedValue = paramValueString;
            break;
        }
      } else {
        // If paramValueString is null, use the tool's defaultValue
        parsedValue = tool.defaultValue;
      }

      values[tool.name] = parsedValue;
    }

    return values;
  };

  const getParams = () => {
    const values = {
      ...getValues(),
    };
    return values;
  };

  return getParams();
};
