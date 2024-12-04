import { cogSettings, CogSettingTool } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import chroma from "chroma-js";

const postColorArray = (
  tool: CogSettingTool["name"],
  value: string | null | undefined // Accept possible null or undefined
): string | undefined => {
  const toolConfig = cogSettings.find((t) => t.name === tool);

  if (toolConfig?.valueType === CogValueType.ColorArray) {
    try {
      // Ensure value is a string or return undefined for invalid types
      if (typeof value !== "string") {
        // console.warn(`Invalid value type for tool "${tool}":`, value);
        return undefined;
      }

      // Remove brackets, quotes, and extra spaces
      const sanitizedValue = value
        .replace(/[\[\]'"]/g, "") // Remove [ ] ' "
        .trim();

      // Split by commas or spaces into an array
      const components = sanitizedValue.split(/,\s*|\s+/);

      // Validate and convert each color to HEX
      const hexColors = components
        .map((color) => {
          try {
            return chroma(color).hex().toUpperCase(); // Convert to uppercase HEX
          } catch (error) {
            // console.warn(`Invalid color detected for tool "${tool}": ${color}`);
            return null; // Exclude invalid colors
          }
        })
        .filter((color): color is string => color !== null); // Remove nulls

      // Join HEX colors into a comma-separated string
      if (hexColors.length === 0) {
        // console.warn(`No valid colors found for tool "${tool}": ${value}`);
        return undefined;
      }

      return hexColors.join(",");
    } catch (error) {
      console.error(`Failed to process color array for tool "${tool}":`, error);
      return undefined;
    }
  }

  console.warn(`Tool "${tool}" does not support color arrays.`);
  return undefined; // Unsupported value type
};

export { postColorArray };
