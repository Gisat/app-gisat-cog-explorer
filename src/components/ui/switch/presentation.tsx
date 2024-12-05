// Mantine-based components
import { Switch as MantineSwitch, Input as MantineInput } from "@mantine/core";

const Switch = () => {
  return (
    <>
      <MantineInput.Wrapper
        size="sm"
        key="{tool.name}"
        label="{tool.title}"
        description="{tool.description}"
      >
        <MantineSwitch defaultChecked label="I agree" />
      </MantineInput.Wrapper>
    </>
  );
};

export { Switch };
