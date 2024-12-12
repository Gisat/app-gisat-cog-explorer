/* eslint-disable */
import chroma from 'chroma-js';

const parseColorArray = (
  tool: string,
  value: string | null | undefined,
): chroma.Color[] | undefined => {
  if (value === null || value === undefined) return undefined;

  try {
    // Sanitize the input by removing brackets, quotes, and extra whitespace
    const sanitizedValue = value
      .replace(/[\[\]'"]/g, '') // Remove [ ] ' "
      .trim();

    // Split the sanitized string into individual components based on commas or spaces
    const components = sanitizedValue.split(/,\s*|\s+/);

    // Parse each component to ensure it's a valid color and convert to chroma.Color
    const chromaColors = components
      .map((color) => {
        try {
          return chroma(color); // Convert to chroma.Color
        } catch (error) {
          //   console.warn(`Invalid color detected for tool "${tool}": ${color}`);
          return null; // Ignore invalid colors
        }
      })
      .filter((color): color is chroma.Color => color !== null); // Remove invalid colors

    // Ensure the output is in the desired format
    if (chromaColors.length === 0) {
      //   console.warn(`No valid colors found for tool "${tool}": ${value}`);
      return undefined;
    }
    return chromaColors;
  } catch (error) {
    console.error(`Error parsing color array for tool "${tool}":`, error);
    return undefined;
  }
};

export { parseColorArray };
