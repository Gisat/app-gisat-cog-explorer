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
            parsedValue = transformToColor(paramValueString);
            break;
          case CogValueType.CommaSeparatedColors:
            // Split comma-separated values into an array
            parsedValue = paramValueString.includes(",")
              ? JSON.parse(paramValueString).map((color: string) =>
                  color.trim()
                )
              : [paramValueString.trim()];
            break;
          case CogValueType.CommaSeparatedNumbers:
            // Handle comma-separated values as an array of strings
            parsedValue = paramValueString
              .split(",")
              .map((item) => item.trim());
            break;
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
