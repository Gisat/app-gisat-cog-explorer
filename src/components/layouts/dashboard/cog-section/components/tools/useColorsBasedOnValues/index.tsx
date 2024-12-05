import { useState } from "react";
// Mantine-based components
import { Switch as MantineSwitch, Flex } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "useColorsBasedOnValues";

const UseColorsBasedOnValues = () => {
  // Hooks
  const updateParam = useUpdateParam();
  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [checked, setChecked] = useState(parsedValue);

  const onChange = (event: any) => {
    setChecked(!checked);
    updateParam(toolName, event.currentTarget.checked);
  };

  return (
    <>
      <MantineSwitch
        label={tool.title}
        description={tool.description}
        mt="lg"
        checked={checked}
        onChange={onChange}
      />
    </>
  );
};

export { UseColorsBasedOnValues };
