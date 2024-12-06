import { Switch as MantineSwitch } from '@mantine/core';
import { useState } from 'react';
// Mantine-based components
// Utils

import { CogSettingTool } from '@/config/cog/cogToolsConfig';
import { useUpdateParam } from '@/hooks/url/useUpdateParam';
import { getTool } from '@/utils/url/getTool';

const toolName: CogSettingTool['name'] = 'useAutoRange';

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
