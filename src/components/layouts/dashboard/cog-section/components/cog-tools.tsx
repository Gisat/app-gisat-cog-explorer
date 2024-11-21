import { useCallback, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { createQueryString } from "@/utils/url";

// Import cog tools' data types
import { CogValueType } from "@/config/cog/cog-value-types";
import { MantineInputType } from "@/config/cog/mantine-input-types";
import { cogSettings } from "@/config/cog/cog-tools-config";
import { Range, CogSettingTool } from "@/config/cog/cog-tools-config";

// Import color convert  operations
import arrayToRgba from "@/utils/array-to-rgba";
import rgbaToArray from "@/utils/rgba-to-array";

// Mantine-based components
import {
  Switch,
  Checkbox,
  ColorInput,
  ColorPicker,
  Input,
  JsonInput,
  //   NumberInput,
  Slider,
  TagsInput,
} from "@mantine/core";
import stringToArrayFormat from "@/utils/string-to-array-format";

// Component mappings for each type
const componentMap: Record<MantineInputType, React.ComponentType<any>> = {
  [MantineInputType.Switch]: Switch,
  [MantineInputType.Checkbox]: Checkbox,
  [MantineInputType.ColorInput]: ColorInput,
  [MantineInputType.ColorPicker]: ColorPicker,
  [MantineInputType.Input]: Input,
  [MantineInputType.JsonInput]: JsonInput,
  //   [MantineInputType.NumberInput]: NumberInput,
  [MantineInputType.Slider]: Slider,
  [MantineInputType.TagsInput]: TagsInput,
};

// Define tool values type based on CogSettingTool['name'] for keys
type ToolValues = Record<CogSettingTool["name"], any>;

const CogTools = () => {
  // URL
  const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryStringCallback = useCallback(createQueryString, [
    searchParams,
  ]);

  // Getting default tool values from cog-tools-config
  const initialToolValues = cogSettings.reduce((acc, tool) => {
    return {
      ...acc,
      [tool.name]: {
        defaultValue: tool.defaultValue,
        // valueRange: tool.valueRange || null,
      },
    };
  }, {});

  const [toolValues, setToolValues] = useState<ToolValues>(initialToolValues);

  // Define a centralized onChange function
  const handleChange = (name: string, value: string | boolean | object) => {
    let processedValue;

    if (typeof value === "string" && name === "colorScale") {
      // Convert comma-separated colorScale string to an array of strings
      processedValue = stringToArrayFormat(value);
    } else if (value == "") {
      processedValue = null;
    } else {
      processedValue = value;
    }

    // Ensure processedValue is a string or number for query string
    const queryStringValue =
      typeof processedValue === "string" || typeof processedValue === "number"
        ? processedValue
        : JSON.stringify(processedValue);

    // Update state
    setToolValues((prevValues) => ({ ...prevValues, [name]: processedValue }));

    // Update URL query
    router.push(
      "?" +
        createQueryStringCallback(
          name,
          queryStringValue,
          Array.from(searchParams.entries())
        ).toString(),
      { scroll: false }
    );
  };

  return (
    <>
      {cogSettings.map((tool: CogSettingTool) => {
        const ToolComponent = componentMap[tool.type as MantineInputType];
        if (!ToolComponent) return null;

        // Current value for this tool
        // const value = toolValues[tool.name];

        // Handling default values

        let defaultValue;
        let placeholderValue;

        if (tool.name === "alpha") {
          defaultValue =
            searchParams.get(tool.name) !== null &&
            searchParams.get(tool.name) !== ""
              ? Number(searchParams.get(tool.name))
              : tool.defaultValue;
        }
        // else if (tool.type === MantineInputType.NumberInput) {
        //   // Channel
        //   defaultValue =
        //     searchParams.get(tool.name) !== null &&
        //     searchParams.get(tool.name) !== ""
        //       ? Number(searchParams.get(tool.name))
        //       : ".";
        // }
        else if (tool.valueType === CogValueType.Color) {
          defaultValue = arrayToRgba(tool.defaultValue);
        } else if (
          tool.type === MantineInputType.TagsInput &&
          tool.name === "colorScale"
        ) {
          const value = searchParams.get(tool.name);
          let valueTags: string[] | null = null; // Declare valueTags outside the if block

          if (value && value.startsWith("[") && value.endsWith("]")) {
            valueTags = JSON.parse(value).map((color: string) => color.trim());
          } else if (value && value.includes(",")) {
            valueTags = value
              .split(",")
              .map((color: string) => color.trim().replace(/"/g, ""));
          }

          placeholderValue = valueTags !== null ? valueTags : undefined; // Set defaultValue based on valueTags
        } else if (tool.type === MantineInputType.Input) {
          let value: string | number | null = searchParams.get(tool.name);
          if (value && value !== null && value !== "") {
            defaultValue = value;
          } else {
            defaultValue = defaultValue;
          }
        } else {
          defaultValue = undefined;
        }

        // Handling useState

        const [checked, setChecked] = useState(tool.defaultValue);

        const onChange = (event: any) => {
          if (tool.type === MantineInputType.Switch) {
            setChecked(!checked);
            handleChange(tool.name, event.currentTarget.checked);
          }
          if (tool.type === MantineInputType.Slider) {
            // Value output
            handleChange(tool.name, event);
          }
          //   if (tool.type === MantineInputType.NumberInput) {
          //     // Value output
          //     handleChange(tool.name, event);
          //   }

          if (tool.valueType === CogValueType.Color) {
            const value = rgbaToArray(event);
            handleChange(tool.name, value);
          }

          if (tool.type === MantineInputType.TagsInput) {
            handleChange(tool.name, event);
          }

          if (tool.type === MantineInputType.Input) {
            const value: any =
              event.target.value !== null && event.target.value !== ""
                ? String(event.target.value)
                : null;
            // console.log(value);
            handleChange(tool.name, value);
          }
        };

        return (
          <Input.Wrapper
            size="sm"
            key={tool.name}
            label={tool.title}
            description={tool.description}
            // error={errorMsg}
            // required

            // Styles
            {...(tool.type === MantineInputType.Slider ? { mb: "lg" } : {})}
          >
            <ToolComponent
              checked={checked}
              defaultValue={defaultValue}
              onChange={(event: any) => onChange(event)}
              // Sliders
              {...(tool.valueRange && {
                marks: [
                  {
                    value: tool.valueRange.min,
                    label: `${tool.valueRange.min}%`,
                  },
                  {
                    value: tool.valueRange.max,
                    label: `${tool.valueRange.max}%`,
                  },
                ],
              })}
              // Input
              {...(tool.type === MantineInputType.Input && {
                placeholder: "null",
              })}
              // Colors
              {...(tool.valueType === CogValueType.Color && {
                format: "rgba",
              })}
              // TagsInput
              {...(tool.type === MantineInputType.TagsInput && {
                placeholder:
                  Array.isArray(placeholderValue) && placeholderValue.length > 0
                    ? "Enter color"
                    : "HEX colors or color names",
                defaultValue: placeholderValue,
                allowDuplicates: true,
                clearable: true,
              })}
              {...(tool.name === "colorScaleValueRange" && {
                placeholder: "0, 255",
                defaultValue: defaultValue,
              })}
              {...(tool.name === "colorsBasedOnValues" && {
                placeholder: "[value, color], [...],",
              })}
              /**
               *  DISABLED Rules
               */

              {...(toolValues.useAutoRange === true &&
                tool.name === "colorScaleValueRange" && {
                  disabled: true,
                })}
              {...(toolValues.useColorsBasedOnValues === false &&
                tool.name === "colorsBasedOnValues" && {
                  disabled: true,
                })}

              // label='' todo: optional label if in wrapper specified
              // error={errors[tool.name]}
            />
          </Input.Wrapper>
        );
      })}
    </>
  );
};

export default CogTools;
