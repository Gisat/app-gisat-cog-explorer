import { cogSettings } from '@/config/cog/cogToolsConfig';

const parseNumber = (
  tool: string,
  value: string | null | undefined,
): number | undefined => {
  if (value === null || value === undefined) return undefined;
  const parsed = parseFloat(value);
  if (isNaN(parsed) || !isFinite(parsed)) return undefined;

  // Retrieve the tool configuration
  const toolConfig = cogSettings.find((t: any) => t.name === tool);

  // Apply value range if defined
  // Example: alpha (opacity from 0 to 100)
  if (toolConfig?.valueRange) {
    const { min, max, step } = toolConfig.valueRange;
    if (parsed < min) return min; // Clamp to min
    if (parsed > max) return max; // Clamp to max

    // Disable decimals if step is defined and >= 1
    if (step !== undefined && step >= 1) {
      return Math.round(parsed); // Round to the nearest integer
    }
  }

  return parsed;
};

export { parseNumber };
