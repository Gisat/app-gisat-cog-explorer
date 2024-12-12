import { Input as MantineInput, CloseButton } from '@mantine/core';
import chroma from 'chroma-js';
import { useState } from 'react';

// Mantine-based components
// Utils

import { CogSettingTool } from '@/config/cog/cogToolsConfig';
import { useUpdateParam } from '@/hooks/url/useUpdateParam';
import { getTool } from '@/utils/url/getTool';

const toolName: CogSettingTool['name'] = 'colorScale';

const ColorScale = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const parsedColors = parsedValue
    ? parsedValue.map((color: { _rgb: string | number | chroma.Color }) =>
        chroma(color._rgb).hex(),
      )
    : '';

  const [value, setValue] = useState(String(parsedColors));

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
          placeholder="color1, color2, color3, ..."
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

export { ColorScale };
