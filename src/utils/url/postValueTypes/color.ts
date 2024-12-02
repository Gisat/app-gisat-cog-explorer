import { cogSettings, CogSettingTool } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import chroma from "chroma-js";

const postColor = (
  tool: CogSettingTool["name"],
  value: string
): string | undefined => {
  const toolConfig = cogSettings.find((t: any) => t.name === tool);

  if (toolConfig?.valueType === CogValueType.Color) {
    try {
      // Handle Mantine RGBA format "rgba(255, 255, 255, 1)"
      if (value.startsWith("rgba")) {
        const rgbaMatch = value
          .replace(/rgba|\(|\)|\s/g, "") // Remove "rgba", parentheses, and spaces
          .split(",")
          .map(Number); // Convert to numbers

        // Validate that the RGBA components are valid
        if (
          rgbaMatch.length === 4 &&
          rgbaMatch.every(
            (n, index) => (index < 3 ? n >= 0 && n <= 255 : n >= 0 && n <= 1) // RGB: 0-255, Alpha: 0-1
          )
        ) {
          // Convert alpha to 0-255 range
          const rgbaWithAlpha = [
            rgbaMatch[0],
            rgbaMatch[1],
            rgbaMatch[2],
            Math.round(rgbaMatch[3] * 255), // Scale alpha to 0-255
          ];

          return rgbaWithAlpha.join(","); // Return as "255,255,255,255"
        } else {
          console.warn(`Invalid RGBA format: ${value}`);
          return undefined;
        }
      } else {
        console.warn(`Unsupported color format: ${value}`);
        return undefined;
      }
    } catch (error) {
      console.error(`Failed to parse color: ${value}`, error);
      return undefined;
    }
  } else {
    return undefined; // Return undefined for unsupported value types
  }
};

export { postColor };
