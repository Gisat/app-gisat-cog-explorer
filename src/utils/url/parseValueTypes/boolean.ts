const parseBoolean = (
  tool: string,
  value: string | null | undefined
): boolean | undefined => {
  const lowerValue = value?.toLowerCase();
  if (lowerValue === "true") return true;
  if (lowerValue === "false") return false;
  return undefined; // Return underfined for invalid inputs
};

export { parseBoolean };
