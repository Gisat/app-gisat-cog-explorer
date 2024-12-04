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

const toolName: CogSettingTool["name"] = "clippedColor";

const ClippedColor = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue: string = tool.value ? tool.value : tool.defaultValue;

  const parsedColor = chroma(parsedValue).hex();

  const [value, setValue] = useState();

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
          format="hex"
          placeholder="HEX color"
          value={value}
          onChange={onChange}
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ClippedColor };
