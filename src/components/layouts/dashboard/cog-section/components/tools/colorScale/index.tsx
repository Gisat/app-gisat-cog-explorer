import { useState } from "react";
import chroma from "chroma-js";

// Mantine-based components
import {
  ColorInput as MantineColorInput,
  Input as MantineInput,
  CloseButton,
} from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "colorScale";

const ColorScale = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState();

  const onChange = (event: any) => {
    setValue(event.currentTarget.value);
    updateParam(toolName, event.currentTarget.value);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineInput
          placeholder="[color1, color2, color3, ...]"
          value={value}
          onChange={onChange}
          rightSectionPointerEvents="all"
          mt="xs"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => {
                // setValue("");
                updateParam(toolName, "");
              }}
              style={{ display: value ? undefined : "none" }}
            />
          }
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ColorScale };
