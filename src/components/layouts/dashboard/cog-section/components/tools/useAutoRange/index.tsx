import { useState } from "react";
import { useSearchParams } from "next/navigation";
// Mantine-based components
import { Switch as MantineSwitch, Input as MantineInput } from "@mantine/core";
// Import cog tools config
import { cogSettings } from "@/config/cog/cog-tools-config";
// Utils

import { urlParams } from "@/types/urlParams";
import { useHandleParamChange } from "@/utils/url/useHandleParamChange";
import { getParam } from "@/utils/url/getParam";

// const searchParams = useSearchParams();
// const tool = getParam("useAutoRange", searchParams);

const parcedValue = true;

const UseAutoRange = () => {
  const [checked, setChecked] = useState(parcedValue);

  const { handleParamChange } = useHandleParamChange();

  const onChange = (event: any) => {
    setChecked(!checked);
    handleParamChange("useAutoRange", event.currentTarget.checked); // To fix (tool.name)
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key="123"
        label="{tool?.title}"
        description="{tool?.description}"
      >
        <MantineSwitch mt="xs" checked={checked} onChange={onChange} />
      </MantineInput.Wrapper>
    </>
  );
};

export { UseAutoRange };
