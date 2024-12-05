import chroma from "chroma-js";
import { cogSettings, CogSettingTool } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";

const postValueColorArray = (
  tool: CogSettingTool["name"],
  value: string | null | undefined
): string | undefined => {
  const toolConfig = cogSettings.find((t) => t.name === tool);

  // Ensure the tool supports a ValueColorArray value type
  if (toolConfig?.valueType === CogValueType.ValueColorArray) {
    try {
      // Return undefined if the value is null or empty
      if (!value) return undefined;

      // Normalize the input into an array of pairs
      let parsedArray: [number, string][] = [];

      // Helper to validate colors
      const isValidColor = (color: string) => {
        try {
          return chroma.valid(color); // chroma-js validation
        } catch {
          return false;
        }
      };

      // Preprocess the input
      if (value.startsWith("[[")) {
        // Replace single quotes with double quotes
        let sanitizedValue = value.replace(/'/g, '"');

        // Convert unquoted color names to strings (e.g., black -> "black")
        sanitizedValue = sanitizedValue.replace(
          /(\[|\s|,)([a-zA-Z]+)(?=[,\]])/g,
          '$1"$2"'
        );

        // Quote HEX colors if not already quoted
        sanitizedValue = sanitizedValue.replace(
          /(\[|\s|,)(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})/g,
          '$1"$2"'
        );

        parsedArray = JSON.parse(sanitizedValue);

        // Validate each pair
        parsedArray.forEach(([key, color]) => {
          if (!Number.isInteger(Number(key)) || !isValidColor(color)) {
            throw new Error(`Invalid pair: ${key}, ${color}`);
          }
        });
      } else if (value.includes(",")) {
        // Input is a flat comma-separated string (e.g., 21,black,22,white)
        const items = value.split(",");
        if (items.length % 2 !== 0) throw new Error("Invalid input format");
        for (let i = 0; i < items.length; i += 2) {
          const key = parseInt(items[i].trim(), 10);
          const color = items[i + 1].trim();
          if (isNaN(key) || !isValidColor(color)) {
            throw new Error(`Invalid pair: ${items[i]}, ${items[i + 1]}`);
          }
          parsedArray.push([key, color]);
        }
      } else {
        throw new Error("Unsupported input format");
      }

      // Convert the array back to a consistent string format with HEX colors
      const result = parsedArray
        .map(([key, color]) => `${key},${chroma(color).hex().toUpperCase()}`)
        .join(",");
      return result;
    } catch (error) {
      return undefined;
    }
  }

  console.warn(`Tool "${tool}" does not support value color arrays.`);
  return undefined; // Unsupported value type
};

export { postValueColorArray };
