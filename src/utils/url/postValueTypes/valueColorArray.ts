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

      let parsedArray: [number, string][] = [];

      // Detect and handle different input formats
      if (value.startsWith("[[")) {
        // Handle nested arrays (e.g., [[11,#ffe875],[12,#d8ff92],...])
        const sanitizedValue = value.replace(
          /(\[|\s|,)([0-9]+)(,)(#[a-fA-F0-9]{6}|#[a-fA-F0-9]{3})/g,
          '$1$2,"$4"'
        ); // Wrap hex color codes in quotes
        parsedArray = JSON.parse(sanitizedValue);
      } else if (value.includes(",") && !value.startsWith("[")) {
        // Handle flat comma-separated input (e.g., 11,#ffe875,12,#d8ff92,...)
        const items = value.split(",");
        if (items.length % 2 !== 0) throw new Error("Invalid input format");
        for (let i = 0; i < items.length; i += 2) {
          const key = parseInt(items[i].trim(), 10);
          const color = items[i + 1].trim();
          if (isNaN(key) || !/^#[a-fA-F0-9]{6}$/.test(color)) {
            throw new Error(`Invalid pair: ${items[i]}, ${items[i + 1]}`);
          }
          parsedArray.push([key, color]);
        }
      } else {
        throw new Error("Unsupported input format");
      }

      // Convert parsed array to the required output format
      const result = parsedArray
        .map(([key, color]) => `${key},${color}`)
        .join(",");
      return result;
    } catch (error) {
      console.error(
        `Failed to process value color array for tool "${tool}":`,
        error
      );
      return undefined;
    }
  }

  console.warn(`Tool "${tool}" does not support value color arrays.`);
  return undefined; // Unsupported value type
};

export { postValueColorArray };
