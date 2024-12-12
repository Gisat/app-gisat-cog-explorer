import { Input as MantineInput, CloseButton } from '@mantine/core';
import { useState } from 'react';

// Mantine-based components
// Utils
import { CogSettingTool } from '@/config/cog/cogToolsConfig';
import { useUpdateParam } from '@/hooks/url/useUpdateParam';
import { getTool } from '@/utils/url/getTool';

const toolName: CogSettingTool['name'] = 'colorScaleValueRange';

const ColorScaleValueRange = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const defaultValue =
    parsedValue !== '' && parsedValue !== undefined ? parsedValue : '';

  const [value, setValue] = useState(String(defaultValue));

  const onChange = (event: any) => {
    setValue(event.currentTarget.value);
    updateParam(toolName, event.currentTarget.value);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        mt="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineInput
          placeholder="number1, number2, number3, ..."
          value={value}
          onChange={onChange}
          rightSectionPointerEvents="all"
          mt="xs"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => {
                setValue('');
                updateParam(toolName, '');
              }}
              style={{ display: value ? undefined : 'none' }}
            />
          }
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ColorScaleValueRange };
