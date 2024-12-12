/* eslint-disable */
import chroma from 'chroma-js';

type KeyValueArray = [number, chroma.Color][];

const parseValueColorArray = (
  tool: string,
  value: string | null | undefined,
): KeyValueArray | undefined => {
  if (!value) return undefined;

  try {
    // Step 1: Clean and sanitize the input
    const sanitizedValue = value
      .replace(/\s/g, '') // Remove all whitespace
      .replace(/'/g, '"') // Standardize single quotes to double quotes
      .replace(/(\[|,)(#[0-9a-fA-F]{3,6})([\],])/g, '$1"$2"$3') // Quote hex colors properly
      .replace(/,+/g, ',') // Remove duplicate commas
      .replace(/[\[\]]+/g, ''); // Remove stray brackets

    // Step 2: Split the sanitized input into key-value entries
    const entries = sanitizedValue.split(',');

    if (entries.length % 2 !== 0) {
      console.warn(`Invalid input format for tool "${tool}":`, value);
      return undefined;
    }

    // Step 3: Parse and validate key-value pairs
    const keyValuePairs: KeyValueArray = [];
    for (let i = 0; i < entries.length; i += 2) {
      const key = Number(entries[i]);
      let color = entries[i + 1];

      // Fix any trailing or leading characters that may remain
      color = color.replace(/^"|"$/g, ''); // Remove outer quotes
      color = color.replace(/"]+$/, ''); // Remove trailing bracket artifacts

      if (isNaN(key)) {
        console.warn(`Invalid number at position ${i}:`, entries[i]);
        return undefined;
      }

      if (!chroma.valid(color)) {
        console.warn(`Invalid color at position ${i + 1}:`, color);
        return undefined;
      }

      keyValuePairs.push([key, chroma(color)]);
    }

    return keyValuePairs.length > 0 ? keyValuePairs : undefined;
  } catch (error) {
    console.warn(`Failed to parse color array for tool "${tool}":`, error);
    return undefined;
  }
};

export { parseValueColorArray };
