import { cogSettings, CogSettingTool } from '@/config/cog/cogToolsConfig';
import { CogValueType } from '@/config/cog/cogValueTypes';

const postNumberArray = (
  tool: CogSettingTool['name'],
  value: string | number | (string | number)[] | null | undefined,
): string | undefined => {
  const toolConfig = cogSettings.find((t) => t.name === tool);

  // Ensure the tool supports a NumberArray value type
  if (toolConfig?.valueType === CogValueType.NumberArray) {
    try {
      // Normalize the input into an array
      let normalizedArray: number[] = [];

      if (Array.isArray(value)) {
        // Handle array input
        normalizedArray = value
          .map((item) => {
            const num = typeof item === 'number' ? item : parseFloat(item);
            return !isNaN(num) ? num : null; // Return null for invalid numbers
          })
          .filter((num): num is number => num !== null); // Filter out null values
      } else if (typeof value === 'string') {
        // Handle various string formats
        normalizedArray = value
          .replace(/[[\]"']/g, '') // Remove brackets and quotes
          .split(',') // Split by commas
          .map((item) => parseFloat(item.trim())) // Trim and parse numbers
          .filter((num) => !isNaN(num)); // Filter valid numbers
      } else if (typeof value === 'number') {
        // Handle single number input
        normalizedArray = [value];
      } else {
        // Return undefined for invalid input
        return undefined;
      }

      // Ensure the result is a properly formatted string
      const result = normalizedArray.join(',');
      console.log('Processed Result:', result); // Debugging log
      return result;
    } catch (error) {
      console.error(
        `Failed to process number array for tool "${tool}":`,
        error,
      );
      return undefined;
    }
  }

  console.warn(`Tool "${tool}" does not support number arrays.`);
  return undefined; // Unsupported value type
};

export { postNumberArray };
