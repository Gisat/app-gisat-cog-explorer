import { useState } from "react";
// Mantine-based components
import {
  ColorInput as MantineColorInput,
  Input as MantineInput,
} from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "clippedColor";

const ClippedColor = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue: string = tool.value ? tool.value : tool.defaultValue;

  const mantineValue = (() => {
    if (parsedValue === null || parsedValue === undefined) {
      console.warn(
        "Invalid input: parsedValue is null or undefined",
        parsedValue
      );
      return undefined;
    }

    // Convert parsedValue to a string if it's not already
    const stringValue = String(parsedValue);

    // Split the value by commas and convert to numbers
    const components = stringValue
      .split(",")
      .map((v) => parseInt(v.trim(), 10));

    // Validate that there are exactly 4 components
    if (components.length === 4) {
      const [r, g, b, a] = components;
      const alpha = a / 255; // Normalize alpha to 0-1
      return `rgba(${r},${g},${b},${alpha})`;
    }

    console.warn("Invalid color format: expected 4 components", stringValue);
    return undefined;
  })();

  const [value, setValue] = useState(mantineValue);

  const onChange = (event: any) => {
    setValue(event);
    updateParam(toolName, event);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineColorInput
          mt="xs"
          format="rgba"
          placeholder="rgba(0, 0, 0, 0)"
          value={value}
          onChange={onChange}
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ClippedColor };
