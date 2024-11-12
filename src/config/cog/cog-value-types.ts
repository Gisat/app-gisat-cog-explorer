export enum CogValueType {
  Boolean = "boolean", // For switchable values, e.g., Checkbox, Switch
  Number = "number", // For numeric values, e.g., NumberInput, Slider
  Text = "text", // For plain text, e.g., TextInput, Textarea
  Color = "color", // For single color inputs, e.g., ColorInput
  ColorScale = "colorScale", // For color scales or gradients, e.g., ColorPicker
  Selection = "selection", // For selectable values, e.g., NativeSelect, Radio
  Range = "range", // For min/max or numeric ranges, e.g., Slider
  JsonObject = "jsonObject", // For structured JSON-like data, e.g., JsonInput
  CommaSeparatedNumbers = "commaSeparatedNumbers", // For lists of numbers separated by commas
  CommaSeparatedColors = "commaSeparatedColors", // For lists of numbers separated by commas
  CommaSeparatedValueColorPairs = "commaSeparatedValueColorPairs", // For arrays of value-color pairs
}
