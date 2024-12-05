import { useState } from "react";
// Mantine-based components
import { NumberInput as MantineNumberInput } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "useChannel";

const UseChannel = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue: number = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState<number>(parsedValue);

  const onChange = (event: any) => {
    setValue(event);
    updateParam(toolName, event);
  };

  return (
    <>
      <MantineNumberInput
        label={tool.title}
        description={tool.description}
        mt="lg"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export { UseChannel };
