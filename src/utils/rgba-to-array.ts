function rgbaToArray(rgbaString: string) {
  // Extract the numbers using a regular expression
  const match = rgbaString.match(
    /rgba?\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/
  );
  if (!match) {
    throw new Error("Invalid RGBA format");
  }

  // Parse the values and convert alpha to 0-255 scale
  const r = parseInt(match[1], 10);
  const g = parseInt(match[2], 10);
  const b = parseInt(match[3], 10);
  const a = Math.round(parseFloat(match[4]) * 255);

  return [r, g, b, a];
}

// Example usage
// const rgbaString = "rgba(255, 0, 255, 1)";
// console.log(rgbaToArray(rgbaString)); // Output: [255, 0, 255, 255]

export default rgbaToArray;
