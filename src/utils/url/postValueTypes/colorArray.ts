import { cogSettings, CogSettingTool } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import chroma from "chroma-js";

const postColorArray = (
  tool: CogSettingTool["name"],
  value: string
): chroma.Color | undefined => {
  const toolConfig = cogSettings.find((t: any) => t.name === tool);

  if (toolConfig?.valueType === CogValueType.Color) {
    try {
      // Handle Mantine RGBA format "rgba(196, 216, 151, 1)"
      if (value.startsWith("rgba")) {
        const rgbaMatch = value
          .replace(/rgba|\(|\)|\s/g, "") // Remove "rgba", parentheses, and spaces
          .split(",")
          .map(Number); // Convert to numbers

        if (rgbaMatch.length === 4) {
          // Convert to chroma.Color
          console.log(
            chroma(
              rgbaMatch[0],
              rgbaMatch[1],
              rgbaMatch[2],
              rgbaMatch[3]
            ).rgba()
          );
          return chroma(rgbaMatch[0], rgbaMatch[1], rgbaMatch[2], rgbaMatch[3]);
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

export { postColorArray };
