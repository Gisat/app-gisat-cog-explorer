import { useState } from "react";
// Mantine-based components
import {
  NumberInput as MantineNumberInput,
  Input as MantineInput,
  Flex,
} from "@mantine/core";
// Utils

import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolNameMin: CogSettingTool["name"] = "clipLow";
const toolNameMax: CogSettingTool["name"] = "clipHigh";

const Clip = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const toolMin: CogSettingTool = getTool(toolNameMin);
  const toolMax: CogSettingTool = getTool(toolNameMax);
  /**
   * TODO: What should be the fallback value if url has no param?
   */
  const parsedValueMin = toolMin.value ? toolMin.value : toolMin.defaultValue;
  const parsedValueMax = toolMax.value ? toolMax.value : toolMax.defaultValue;

  const [valueMin, setValueMin] = useState<string | number>("");
  const [valueMax, setValueMax] = useState<string | number>("");

  const onChangeMin = (event: any) => {
    setValueMin(event);
    updateParam(toolNameMin, event);
  };
  const onChangeMax = (event: any) => {
    setValueMax(event);
    updateParam(toolNameMax, event);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key="clip"
        label="Clip values"
        description="Set minimum and maximum values for clipping the input data. Leave blank to keep all values within the specified range."
      >
        <Flex>
          <MantineNumberInput
            mt="xs"
            value={valueMin}
            onChange={onChangeMin}
            placeholder="Min"
          />
          <MantineNumberInput
            mt="xs"
            value={valueMax}
            onChange={onChangeMax}
            placeholder="Max"
          />
        </Flex>
      </MantineInput.Wrapper>
    </>
  );
};

export { Clip };
