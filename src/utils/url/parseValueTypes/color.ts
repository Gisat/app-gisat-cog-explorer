const parseColor = (
  tool: string,
  value: string | null | undefined
): number[] | undefined => {
  if (value === null || value === undefined) return undefined;

  // Split the value by commas and convert to numbers
  const parsed = value.split(",").map((v) => parseInt(v.trim(), 10));

  // Validate that all components are valid numbers
  if (parsed.some((v) => isNaN(v) || !isFinite(v))) {
    console.warn(`Invalid color value: ${value}`);
    return undefined;
  }

  return parsed; // Return the parsed color array
};

export { parseColor };
