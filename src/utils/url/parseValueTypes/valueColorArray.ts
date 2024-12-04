import chroma from "chroma-js";

type KeyValueArray = [number, chroma.Color][];

const parseValueColorArray = (
  tool: string,
  value: string | null | undefined
): KeyValueArray | undefined => {
  if (!value) return undefined; // Return undefined for null/undefined/empty input

  try {
    // Preprocess the input to make it valid JSON
    const sanitizedValue = value
      .trim()
      .split(",") // Split by commas
      .reduce<string[]>((acc, curr, index, arr) => {
        // Pair numbers with colors
        if (index % 2 === 0) {
          const number = parseFloat(curr);
          const color = arr[index + 1];
          if (!isNaN(number) && color && /^#[a-fA-F0-9]{3,6}$/.test(color)) {
            acc.push(`[${number}, "${color}"]`);
          } else {
            throw new Error(
              `Invalid input format at index ${index}: ${curr}, ${color}`
            );
          }
        }
        return acc;
      }, [])
      .join(","); // Join pairs with commas

    const jsonString = `[${sanitizedValue}]`; // Wrap in array brackets

    console.debug(`Sanitized JSON string for tool "${tool}":`, jsonString);

    // Parse the JSON string
    const parsedArray = JSON.parse(jsonString);

    // Ensure the parsed value is an array of key-value pairs
    if (!Array.isArray(parsedArray)) {
      console.warn(`Invalid format: Expected an array. Received:`, parsedArray);
      return undefined;
    }

    // Map the parsed array to the KeyValueArray type
    const keyValueArray: KeyValueArray = parsedArray.map((pair) => {
      if (
        Array.isArray(pair) &&
        pair.length === 2 &&
        typeof pair[0] === "number" &&
        typeof pair[1] === "string"
      ) {
        const key = pair[0];
        const color = chroma(pair[1]);
        return [key, color];
      } else {
        throw new Error(
          `Invalid pair format: Expected [number, string]. Received: ${JSON.stringify(
            pair
          )}`
        );
      }
    });

    return keyValueArray.length > 0 ? keyValueArray : undefined; // Return undefined if the array is empty
  } catch (error) {
    console.warn(`Failed to parse color array for tool "${tool}":`, error);
    return undefined;
  }
};

export { parseValueColorArray };
