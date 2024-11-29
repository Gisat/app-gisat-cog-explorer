import { useState, useEffect } from "react";
// Mantine-based components
import { Input as MantineInput, Button } from "@mantine/core";
// React icons
import { IconLink, IconPlayerPlayFilled } from "@tabler/icons-react";
// Hooks
import { useUpdateSource } from "@/hooks/url/useUpdateSource";
import { getSource, parseSource } from "@/utils/url/getSource";

const CogUrl = () => {
  // Hooks
  const updateSource = useUpdateSource();
  const { source } = getSource();
  const url = source.parsedValue;

  const [value, setValue] = useState(url);
  const [validation, setValidation] = useState<{
    parsedValue: string | undefined;
    error: string | null;
  }>({ parsedValue: undefined, error: null });

  const onChange = (event: any): void => {
    setValue(event.currentTarget.value);
    // Auto validation
    const validationResult = parseSource(event.currentTarget.value);
    setValidation(validationResult);
  };

  /**
   * Validate and update the URL parameter.
   */
  const handleClick = () => {
    if (!validation.error && value !== null && value !== undefined) {
      updateSource(value);
    }
  };

  return (
    <MantineInput.Wrapper
      size="sm"
      key="cogUrl"
      label="Data source"
      description="URL address to your .tif raster"
      required
      error={validation.error ? validation.error : null}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <MantineInput
          value={value}
          onChange={onChange} // Allow free editing
          placeholder="https://example.com/COG_raster.tif"
          leftSection={<IconLink size={16} />}
          required
          // error={validation.error ? true : false}
        />
        <Button onClick={handleClick} ml="xs">
          <IconPlayerPlayFilled size={12} />
        </Button>
      </div>
    </MantineInput.Wrapper>
  );
};

export { CogUrl };
