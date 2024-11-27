import { useState } from "react";
// Mantine-based components
import { Switch as MantineSwitch, Input as MantineInput } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "useHeatMap";

const UseHeatMap = () => {
  // Hooks
  const updateParam = useUpdateParam();
  const tool: CogSettingTool = getTool(toolName);
  /**
   * TODO: What should be the fallback value if url has no param?
   */
  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [checked, setChecked] = useState(parsedValue);

  const onChange = (event: any) => {
    setChecked(!checked);
    updateParam(toolName, event.currentTarget.checked);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineSwitch mt="xs" checked={checked} onChange={onChange} />
      </MantineInput.Wrapper>
    </>
  );
};

export { UseHeatMap };
