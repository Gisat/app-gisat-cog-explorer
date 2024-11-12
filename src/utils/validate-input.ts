// validate-input.ts

export function validateColorScaleValueRange(
  input: string
): [number, number] | any {
  // Check if input is a string and has a comma
  if (typeof input !== "string" || !input.includes(",")) {
    return undefined;
  }

  // Split input by comma and trim whitespace
  const values = input.split(",").map((value) => value.trim());

  // Ensure we have exactly two values
  if (values.length !== 2) {
    return undefined;
  }

  // Parse values to numbers
  const min = Number(values[0]);
  const max = Number(values[1]);

  // Check if both values are numbers and min is less than or equal to max
  if (!isNaN(min) && !isNaN(max) && min <= max) {
    return [min, max];
  }

  // Return undefined if validation fails
  return undefined;
}
