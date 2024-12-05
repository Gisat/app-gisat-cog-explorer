import chroma from "chroma-js";
import { useState } from "react";
// Mantine-based components
import { ColorInput as MantineColorInput } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "nullColor";

const NullColor = () => {
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
    <MantineColorInput
      mt="sm"
      label={tool.title}
      description={tool.description}
      format="hex"
      placeholder="Color"
      value={value}
      onChange={onChange}
    />
  );
};

export { NullColor };
