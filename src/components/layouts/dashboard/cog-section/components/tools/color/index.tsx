import chroma from "chroma-js";
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

const toolName: CogSettingTool["name"] = "color";

const Color = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue: string = tool.value ? tool.value : tool.defaultValue;

  const parsedColor = parsedValue ? chroma(parsedValue).hex() : undefined;

  const [value, setValue] = useState(parsedColor);

  const onChange = (event: any) => {
    setValue(event);
    updateParam(toolName, event);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        mt="sm"
        // label={tool?.title}
        description={tool?.description}
      >
        <MantineColorInput
          mt="xs"
          format="hex"
          placeholder="Color"
          value={value}
          onChange={onChange}
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { Color };
