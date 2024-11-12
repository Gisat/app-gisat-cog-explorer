/**
 * Converts a comma-separated string to a formatted string that looks like an array.
 * @param input - The comma-separated string to convert.
 * @returns A string formatted as an array.
 */
export default function stringToArrayFormat(input: string): string[] {
  // Split the input by commas, trim whitespace, and filter out empty strings
  return input
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

// Example usage:
// const result = stringToArrayFormat("white, red, blue");
// console.log(result); // Output: '["white", "red", "blue"]'
