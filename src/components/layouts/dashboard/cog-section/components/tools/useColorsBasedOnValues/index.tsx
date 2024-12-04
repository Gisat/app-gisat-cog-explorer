import { useState } from "react";
// Mantine-based components
import {
  Switch as MantineSwitch,
  Input as MantineInput,
  Button,
  Flex,
} from "@mantine/core";
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
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <Flex>
          <MantineSwitch mt="xs" checked={checked} onChange={onChange} />
          {/* <Button ml="lg" variant="outline" size="xs">
            Reset
          </Button> */}
        </Flex>
      </MantineInput.Wrapper>
    </>
  );
};

export { UseColorsBasedOnValues };
