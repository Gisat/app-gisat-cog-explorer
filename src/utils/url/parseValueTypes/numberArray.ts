const parseNumberArray = (
  tool: string,
  value: string | null | undefined
): number[] | undefined => {
  // Return undefined if the value is null, undefined, or empty
  if (!value) return undefined;

  try {
    // Clean the input string by removing brackets and extra spaces
    const cleanedValue = value.replace(/[\[\]]/g, "").trim();

    // Split the string by commas, trim spaces, and map each value to a number
    const parsed = cleanedValue
      .split(",")
      .map((item) => parseFloat(item.trim()))
      .filter((num) => !isNaN(num)); // Filter out any invalid numbers

    return parsed.length > 0 ? parsed : undefined; // Return undefined if the array is empty
  } catch (error) {
    console.warn(`Error parsing number array for tool "${tool}":`, error);
    return undefined;
  }
};

export { parseNumberArray };
