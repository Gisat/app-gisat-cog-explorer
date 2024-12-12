/* eslint-disable */
import chroma from 'chroma-js';

import { cogSettings, CogSettingTool } from '@/config/cog/cogToolsConfig';
import { CogValueType } from '@/config/cog/cogValueTypes';

const postColor = (
  tool: CogSettingTool['name'],
  value: string,
): string | undefined => {
  // Find the tool configuration
  const toolConfig = cogSettings.find((t: any) => t.name === tool);

  // Ensure the tool supports a Color value type
  if (toolConfig?.valueType === CogValueType.Color) {
    try {
      // Use chroma-js to validate and normalize the color
      const color = chroma(value);

      // If valid, return the normalized hex string
      return color.hex().toLowerCase(); // Normalize to lowercase hex
    } catch (e) {
      // If chroma-js throws an error, the input is not a valid color
      console.warn(`Invalid color value: "${value}"`);
      return undefined;
    }
  } else {
    return undefined; // Return undefined for unsupported value types
  }
};

export { postColor };
