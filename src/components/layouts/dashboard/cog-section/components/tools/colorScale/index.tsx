import { useState } from "react";
// Mantine-based components
import {
  Input as MantineInput,
  PillsInput,
  Pill,
  Combobox,
  useCombobox,
  Tabs,
} from "@mantine/core";
// Utils
import { useUpdateParam } from "@/hooks/url/useUpdateParam";
import { getTool } from "@/utils/url/getTool";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

const toolName: CogSettingTool["name"] = "colorScale";

const ColorScale = () => {
  // Hooks
  const updateParam = useUpdateParam();

  const tool: CogSettingTool = getTool(toolName);

  const parsedValue = tool.value ? tool.value : tool.defaultValue;

  const [search, setSearch] = useState("");
  const [value, setValue] = useState<string[]>(parsedValue || []);

  const handleValueSelect = (val: string) =>
    setValue((current) =>
      current.includes(val) ? current : [...current, val.trim()]
    );

  const handleValueRemove = (val: string) =>
    setValue((current) => current.filter((v) => v !== val));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
    onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
  });

  const values = value.map((item) => (
    <Pill key={item} withRemoveButton onRemove={() => handleValueRemove(item)}>
      {item}
    </Pill>
  ));

  const handleFreeFormSubmit = () => {
    if (search.trim()) {
      handleValueSelect(search.trim());
      setSearch("");
      combobox.closeDropdown();
    }
  };

  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key={tool?.name}
        label={tool?.title}
        description={tool?.description}
      >
        <Tabs defaultValue="manual" orientation="horizontal">
          <Tabs.List>
            <Tabs.Tab value="manual">Manual</Tabs.Tab>
            <Tabs.Tab value="palette" disabled>
              Color palettes
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="manual">
            <div>123123</div>
          </Tabs.Panel>
          <Tabs.Panel value="palette">Color palettes</Tabs.Panel>
        </Tabs>
      </MantineInput.Wrapper>
    </>
  );
};

export { ColorScale };
