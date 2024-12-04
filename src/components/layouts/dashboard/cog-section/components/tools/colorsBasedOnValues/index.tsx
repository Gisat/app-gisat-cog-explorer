import { useState } from "react";
import chroma from "chroma-js";
// Mantine-based components
import { Input as MantineInput, CloseButton } from "@mantine/core";
// Utils
import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "colorsBasedOnValues";

const ColorsBasedOnValues = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const parsedKeyValueArray = parsedValue
    ? parsedValue.map(
        ([value, color]: [
          number,
          { _rgb: [number, number, number, number] }
        ]) => {
          const chromaColor = chroma(color._rgb).hex(); // Convert _rgb to a chroma.Color
          return [value, chromaColor]; // Return the tuple [key, chroma.Color]
        }
      )
    : "";

  // console.log("parsedKeyValueArray: ", String(parsedKeyValueArray));

  const [value, setValue] = useState(String(parsedKeyValueArray));

  const onChange = (event: any) => {
    setValue(event.currentTarget.value);
    updateParam(toolName, event.currentTarget.value);
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <MantineInput
          placeholder="[value1, color1], ..."
          value={value}
          onChange={onChange}
          rightSectionPointerEvents="all"
          mt="xs"
          rightSection={
            <CloseButton
              aria-label="Clear input"
              onClick={() => {
                setValue("");
                updateParam(toolName, "");
              }}
              style={{ display: value ? undefined : "none" }}
            />
          }
        />
      </MantineInput.Wrapper>
    </>
  );
};

export { ColorsBasedOnValues };
