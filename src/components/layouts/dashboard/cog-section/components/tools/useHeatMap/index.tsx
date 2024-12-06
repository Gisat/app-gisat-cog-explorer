import { Switch as MantineSwitch } from '@mantine/core';
import { useState } from 'react';
// Mantine-based components
// Utils

import { CogSettingTool } from '@/config/cog/cogToolsConfig';
import { useUpdateParam } from '@/hooks/url/useUpdateParam';
import { getTool } from '@/utils/url/getTool';

const toolName: CogSettingTool['name'] = 'useHeatMap';

const UseHeatMap = () => {
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
        mt="lg"
        checked={checked}
        label={tool.title}
        description={tool.description}
        onChange={onChange}
      />
    </>
  );
};

export { UseHeatMap };
