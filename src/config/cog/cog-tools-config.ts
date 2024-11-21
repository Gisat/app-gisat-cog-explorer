// Import COG value types and Mantine input types
import { MantineInputType } from "./mantine-input-types";
import { CogValueType } from "./cog-value-types";

// Define a type for the range values
export type Range = {
  min: number;
  max: number;
  step?: number; // Optional step value for more control
};

// Define an interface that describes each setting tool configuration
export interface CogSettingTool {
  name: string; // Unique name for the setting tool
  title: string; // Display title of the tool
  description: string | JSX.Element; // Description of the tool's function
  defaultValue: any; // Default value, could be boolean, number, etc.
  valueType: CogValueType; // Type of value for the setting, from cog-value-types
  valueRange?: Range; // Optional range for numeric input
  type: MantineInputType; // Mantine component to render, from mantine-input-types
}

// Array of COG setting tool configurations
export const cogSettings: CogSettingTool[] = [
  {
    name: "useAutoRange",
    title: "Auto Range",
    description: "Set automatic range of color gradient",
    defaultValue: false,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
  {
    name: "useDataForOpacity",
    title: "Data for Opacity",
    description:
      "Visualise data with opacity of each pixel according to its value",
    defaultValue: false,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
  {
    name: "alpha",
    title: "Opacity",
    description: "Adjust the COG layer opacity",
    defaultValue: 100,
    valueRange: { min: 0, max: 100, step: 1 },
    valueType: CogValueType.Number,
    type: MantineInputType.Slider,
  },
  {
    name: "useHeatMap",
    title: "Heat Map",
    description: "Generate data as a color heatmap",
    defaultValue: true,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
  {
    name: "useChannel",
    title: "Channel",
    description: "Specify a single channel to use",
    defaultValue: null,
    valueType: CogValueType.Number,
    type: MantineInputType.Input,
  },
  {
    name: "multiplier",
    title: "Multiplier",
    description: "Multiplies each value",
    defaultValue: 1,
    valueType: CogValueType.Number,
    type: MantineInputType.Input,
  },
  {
    name: "clipLow",
    title: "Clip Low",
    description: "Generate only data greater than this (default null)",
    defaultValue: null,
    valueType: CogValueType.Number,
    type: MantineInputType.Input,
  },
  {
    name: "clipHigh",
    title: "Clip High",
    description:
      "Only display data values less than this threshold (default null).",
    defaultValue: null,
    valueType: CogValueType.Number,
    type: MantineInputType.Input,
  },
  {
    name: "clippedColor",
    title: "Clipped Color",
    description:
      "Set color for clipped values when using clipLow or clipHigh, (default [0, 0, 0, 0]).",
    defaultValue: [0, 0, 0, 0],
    valueType: CogValueType.Color,
    type: MantineInputType.ColorInput,
  },
  {
    name: "colorScale",
    title: "Color Scale",
    description:
      "Array of colors, with options like chroma.js and Color Brewer",
    defaultValue: undefined,
    valueType: CogValueType.CommaSeparatedColors,
    type: MantineInputType.TagsInput,
  },
  {
    name: "colorScaleValueRange",
    title: "Color Scale Value Range",
    description:
      "Set min and max range values or exact color values if useAutoRange is false",
    defaultValue: null,
    // valueRange: { min: 0, max: 255, step: 1 },
    valueType: CogValueType.CommaSeparatedNumbers,
    type: MantineInputType.Input,
  },
  {
    name: "useColorsBasedOnValues",
    title: "Colors Based on Values",
    description: "Assign pixels colors based on defined data values",
    defaultValue: false,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
  {
    name: "colorsBasedOnValues",
    title: "Colors Based on Values",
    description:
      "Array of value-color pairs, used if useColorsBasedOnValues is true",
    defaultValue: null,
    valueType: CogValueType.ValueColorArray,
    type: MantineInputType.Input,
  },
  {
    name: "unidentifiedColor",
    title: "Unidentified Color",
    description:
      "Set color for unidentified values if useColorsBasedOnValues is true",
    defaultValue: [0, 0, 0, 0],
    valueType: CogValueType.Color,
    type: MantineInputType.ColorInput,
  },
  {
    name: "nullColor",
    title: "Null Color",
    description: "Set color for noData values",
    defaultValue: [0, 0, 0, 0],
    valueType: CogValueType.Color,
    type: MantineInputType.ColorInput,
  },
  {
    name: "useSingleColor",
    title: "Single Color",
    description: "Display data values only with single color",
    defaultValue: false,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
  {
    name: "color",
    title: "Color",
    description: "Set color if useSingleColor is true",
    defaultValue: [255, 0, 255, 255],
    valueType: CogValueType.Color,
    type: MantineInputType.ColorInput,
  },
  {
    name: "blurredTexture",
    title: "Blurred Texture",
    description:
      "Define blurring behaviour for textures when zoomed in. Default is true for blurry textures",
    defaultValue: false,
    valueType: CogValueType.Boolean,
    type: MantineInputType.Switch,
  },
];
