function arrayToRgba(colorArray: [number, number, number, number?]): string {
  if (colorArray.length < 3 || colorArray.length > 4) {
    throw new Error("Invalid color array. Expected format: [R, G, B, A]");
  }

  const [r, g, b, a = 255] = colorArray; // default alpha to 255 if not provided
  const alpha = (a / 255).toFixed(2); // normalize alpha to 0-1 range

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Example usage
// const rgbaColor = arrayToRgba([255, 0, 255, 255]);
// console.log(rgbaColor); // Output: "rgba(255, 0, 255, 1)"

export default arrayToRgba;
