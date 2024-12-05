import { useState } from "react";
// Mantine-based components
import { NumberInput as MantineNumberInput } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "multiplier";

const Multiplier = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);
  /**
   * TODO: What should be the fallback value if url has no param?
   */
  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState<number>(parsedValue);

  const onChange = (event: any) => {
    setValue(event);
    updateParam(toolName, event);
  };

  return (
    <>
      <MantineNumberInput
        mt="sm"
        label={tool.title}
        description={tool.description}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export { Multiplier };
