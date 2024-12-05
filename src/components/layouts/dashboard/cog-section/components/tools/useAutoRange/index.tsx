import { useState } from "react";
// Mantine-based components
import { Switch as MantineSwitch, Input as MantineInput } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "useAutoRange";

const UseAutoRange = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);
  /**
   * TODO: What should be the fallback value if url has no param?
   */
  const parsedValue = tool.value ? tool.value : false;

  const [checked, setChecked] = useState(parsedValue);

  const onChange = (event: any) => {
    setChecked(!checked);
    updateParam(toolName, event.currentTarget.checked);
  };

  return (
    <>
      <MantineSwitch
        mt="lg"
        checked={checked}
        onChange={onChange}
        label={tool?.title}
        description={tool?.description}
      />
    </>
  );
};

export { UseAutoRange };
