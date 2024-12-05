import { useState } from "react";
// Mantine-based components
import { Slider as MantineSlider, Text } from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "alpha";

const Alpha = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [value, setValue] = useState(parsedValue);

  const onChange = (event: any) => {
    setValue(event);
    updateParam(toolName, event);
  };

  return (
    <>
      <Text size="sm" mt="lg">
        Layer {tool?.title}
      </Text>
      <MantineSlider
        mt="xs"
        mb="xl"
        value={value}
        defaultValue={tool.value}
        step={tool.valueRange?.step}
        min={tool.valueRange?.min}
        max={tool.valueRange?.max}
        onChange={onChange}
        marks={[
          { value: 0, label: "0%" },
          { value: 100, label: "100%" },
        ]}
      />
    </>
  );
};

export { Alpha };
