import chroma from "chroma-js";

const parseColor = (
  tool: string,
  value: string | null | undefined
): chroma.Color | undefined => {
  // Validate input
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  // Trim the input to remove extra spaces
  const trimmedValue = value.trim();

  try {
    // Parse the color using chroma-js
    const color = chroma(trimmedValue);

    // If no error is thrown, the input is valid
    return color;
  } catch (e) {
    // Log the invalid input value
    // console.log(` value: "${value}"`);
    return undefined;
  }
};

export { parseColor };
