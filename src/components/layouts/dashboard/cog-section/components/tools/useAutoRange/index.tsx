import { useState } from "react";
// Mantine-based components
import { Switch as MantineSwitch, Input as MantineInput } from "@mantine/core";
// Import cog tools config
import { cogSettings } from "@/config/cog/cog-tools-config";
// Utils
import { getParamsUrl } from "@/utils/getParamsUrl";
import { urlParams } from "@/types/urlParams";
import { useHandleParamChange } from "@/utils/useHandleParamChange";

const tool = cogSettings.find((t) => t.name === "useAutoRange");
if (!tool) {
  console.warn("Tool with name 'useAutoRange' not found.");
}

const parcedParam = getParamsUrl(undefined, false) as Partial<urlParams>;
const parcedValue = parcedParam.useAutoRange;

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
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineSwitch mt="xs" checked={checked} onChange={onChange} />
      </MantineInput.Wrapper>
    </>
  );
};

export { UseAutoRange };
