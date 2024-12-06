import { NumberInput as MantineNumberInput, Flex, Text } from '@mantine/core';
import { useState } from 'react';
// Mantine-based components
// Utils

import { CogSettingTool } from '@/config/cog/cogToolsConfig';
import { useUpdateParam } from '@/hooks/url/useUpdateParam';
import { getTool } from '@/utils/url/getTool';

const toolNameMin: CogSettingTool['name'] = 'clipLow';
const toolNameMax: CogSettingTool['name'] = 'clipHigh';

const Clip = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const toolMin: CogSettingTool = getTool(toolNameMin);
  const toolMax: CogSettingTool = getTool(toolNameMax);

  const [valueMin, setValueMin] = useState<number>(toolMin.value);
  const [valueMax, setValueMax] = useState<number>(toolMax.value);

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
      <Flex direction="column">
        <Text fz={14} fw="normal" mt="lg" component="label">
          Clip values
        </Text>
        <Text fz={12} fw="normal" c="gray" mt={0} component="label">
          Clip min and max raster values
        </Text>
      </Flex>
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
    </>
  );
};

export { Clip };
