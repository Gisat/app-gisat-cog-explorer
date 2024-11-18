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
            if (parsedValue == "") {
              parsedValue = tool.defaultValue;
            }
            break;
          case CogValueType.CommaSeparatedColors:
            // Split comma-separated values into an array
            if (
              paramValueString &&
              paramValueString.startsWith("[") &&
              paramValueString.endsWith("]")
            ) {
              try {
                parsedValue = JSON.parse(paramValueString).map(
                  (color: string) => color.trim()
                );
              } catch (error) {
                console.error(
                  "Invalid JSON format in paramValueString:",
                  paramValueString
                );
                parsedValue = null; // Set to null if parsing fails
              }
            } else if (paramValueString) {
              const decodedParamValueString =
                decodeURIComponent(paramValueString);

              // Check if the decoded value starts and ends with a quote
              if (
                decodedParamValueString.startsWith('"') &&
                decodedParamValueString.endsWith('"')
              ) {
                try {
                  // Remove the starting and ending quotes and split by comma
                  const colorArray = decodedParamValueString
                    .slice(1, -1) // Remove starting and ending quotes
                    .split('","') // Split by '","' to get individual colors
                    .map((color: string) => color.trim()); // Trim spaces if any

                  parsedValue = colorArray;
                } catch (error) {
                  console.error(
                    "Error processing paramValueString:",
                    decodedParamValueString
                  );
                  parsedValue = null; // Set to null if splitting fails
                }
              } else {
                // Handle other types of values if necessary
                parsedValue = null;
              }
            } else {
              console.warn(
                "paramValueString is not in a valid array format:",
                paramValueString
              );
              parsedValue = null; // Set to null if the format is incorrect
            }

            // Set parsedValue to null if it results in an empty array after parsing
            if (Array.isArray(parsedValue) && parsedValue.length === 0) {
              parsedValue = null;
            }
            break;
          case CogValueType.CommaSeparatedNumbers:
            // Handle comma-separated values as an array of strings
            parsedValue = paramValueString
              .split(",")
              .map((item) => item.trim());
            if (parsedValue == "") {
              parsedValue = null;
            }
            break;
          case CogValueType.ValueColorArray:
            // Match patterns that look like ["1", "red"], [1, "red"], or [1, red]
            const pairsRegex =
              /\[["']?(\d+)["']?,\s*["']?([a-zA-Z#0-9]+)["']?\]/g;
            parsedValue = [];
            let match;

            // Extract each [number, color] pair from the string
            while ((match = pairsRegex.exec(paramValueString)) !== null) {
              // Convert the first element to a number even if it's a string
              const number = parseInt(match[1], 10); // Will parse "1" as 1
              const color = match[2]; // Second element remains a string for the color
              parsedValue.push([number, color]);
            }

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
