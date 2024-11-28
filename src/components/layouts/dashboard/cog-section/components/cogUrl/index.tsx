import { useState } from "react";
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

  // Fetch the source
  const source = getSource();

  // States
  const [value, setValue] = useState<string>();
  const [tempValue, setTempValue] = useState<string>();
  const [error, setError] = useState<string | null>();

  /**
   * Validate and update the URL parameter.
   */
  const handleButtonClick = () => {
    const { parsedValue: validValue, error: validationError } =
      parseSource(tempValue);

    if (validationError) {
      setError(validationError);
      return;
    }

    // Update state and source
    setError(null);
    setValue(validValue!);
    updateSource("cogUrl");
  };

  return (
    <MantineInput.Wrapper
      size="sm"
      key="cogUrl"
      label="Data source"
      description="URL address to your .tif raster"
      error={error}
      required
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        <MantineInput
          value={tempValue}
          onChange={(e) => setTempValue(e.target.value)}
          placeholder="https://example.com/COG_raster.tif"
          leftSection={<IconLink size={16} />}
          required
          error={!!error}
        />
        <Button onClick={handleButtonClick} ml="xs">
          <IconPlayerPlayFilled size={12} />
        </Button>
      </div>
    </MantineInput.Wrapper>
  );
};

export { CogUrl };
