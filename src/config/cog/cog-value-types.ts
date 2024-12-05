export enum CogValueType {
  Text = "text", // For plain text, e.g., TextInput, Textarea
  ColorScale = "colorScale", // For color scales or gradients, e.g., ColorPicker
  Selection = "selection", // For selectable values, e.g., NativeSelect, Radio
  Range = "range", // For min/max or numeric ranges, e.g., Slider
  JsonObject = "jsonObject", // For structured JSON-like data, e.g., JsonInput
  CommaSeparatedNumbers = "commaSeparatedNumbers", // For lists of numbers separated by commas
  CommaSeparatedColors = "commaSeparatedColors", // For lists of numbers separated by commas
  CommaSeparatedValueColorPairs = "commaSeparatedValueColorPairs",
  ValueColorArray = "ValueColorArray",

  // New
  Boolean = "boolean", // For switchable values, e.g., useAutoRange
  Number = "number", // For numeric values, e.g. alpha (opacity)
  NumberArray = "numberArray", // For lists of numbers
  NumberNull = "numberNull", // TODO : REMOVE!
  Url = "url",
  Color = "color", // For single color inputs
  ColorArray = "colorArray", // For colors array
}
