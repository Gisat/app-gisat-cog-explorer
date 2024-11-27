import { useState } from "react";
// Mantine-based components
import {
  NumberInput as MantineNumberInput,
  Input as MantineInput,
} from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "useChannel";

const UseChannel = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);
  /**
   * TODO: What should be the fallback value if url has no param?
   */
  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState<string | number>("");

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
        <MantineNumberInput mt="xs" value={value} onChange={onChange} />
      </MantineInput.Wrapper>
    </>
  );
};

export { UseChannel };
