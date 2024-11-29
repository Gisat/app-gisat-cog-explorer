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

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState("");

  const onChange = (event: any) => {
    setValue(event);
    console.log("aa", event);
    //updateParam(toolName, event);
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
          placeholder="Input placeholder"
          value={value}
          onChange={onChange}
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ClippedColor };
