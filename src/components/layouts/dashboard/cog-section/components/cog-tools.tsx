import { useState } from "react";
import { cogSettings } from "@/config/cog/cog-tools-config";
import {
	isValidColor,
	isValidColorScale,
	isValidCommaSeparatedNumbers,
	isValidCommaSeparatedValueColorPairs,
} from "@/utils/dataTypes";

// Import cog tools' data types
import { CogValueType } from '@/config/cog/cog-value-types';
import { MantineInputType } from '@/config/cog/mantine-input-types';
import { Range, CogSettingTool } from '@/config/cog/cog-tools-config';

// Mantine-based components
import { Switch, Checkbox, ColorInput, ColorPicker, Input, JsonInput, NumberInput, Slider, Text } from "@mantine/core";

// Component mappings for each type
const componentMap: Record<MantineInputType, React.ComponentType<any>> = {
	[MantineInputType.Switch]: Switch,
	[MantineInputType.Checkbox]: Checkbox,
	[MantineInputType.ColorInput]: ColorInput,
	[MantineInputType.ColorPicker]: ColorPicker,
	[MantineInputType.Input]: Input,
	[MantineInputType.JsonInput]: JsonInput,
	[MantineInputType.NumberInput]: NumberInput,
	[MantineInputType.Slider]: Slider
};

const CogTools = () => {

	// Dynamic state for storing tool values and errors
	const [toolValues, setToolValues] = useState(
		cogSettings.reduce((acc, tool) => ({ ...acc, [tool.name]: tool.defaultValue }), {})
	);

	// State to store validation errors
	const [errors, setErrors] = useState<Record<string, string | null>>({});

	// Handle value change for each tool
	const handleChange = (name: string, value: any) => {
		// Update the value in state
		setToolValues((prevValues) => ({ ...prevValues, [name]: value }));

		// Validate value and update error state if needed
		const error = validateValue(name, value);
		setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
	};

	// Validation function for each tool based on its valueType
	const validateValue = (name: string, value: any) => {
		const tool = cogSettings.find((tool) => tool.name === name);
		if (!tool) return null;

		switch (tool.valueType) {
			case CogValueType.Color:
				return isValidColor(value) ? null : "Invalid color format";
			case CogValueType.ColorScale:
				return isValidColorScale(value) ? null : "Invalid color scale";
			case CogValueType.CommaSeparatedNumbers:
				return isValidCommaSeparatedNumbers(value) ? null : "Expected comma-separated numbers";
			case CogValueType.CommaSeparatedValueColorPairs:
				return isValidCommaSeparatedValueColorPairs(value) ? null : "Expected value-color pairs";
			default:
				return null;
		}
	};

	return (
		<div>
			{cogSettings.map((tool: CogSettingTool) => {
				const ToolComponent = componentMap[tool.type as MantineInputType];
				if (!ToolComponent) return null;

				return (
					<div key={tool.name} style={{ marginBottom: "1.5rem" }}>
						<Input.Wrapper
							size="sm"
							label={tool.title}
							description={tool.description}
						// error={errorMsg}
						// required
						>
							<ToolComponent

								onChange={(value: any) => handleChange(tool.name, value)}
								{...(tool.valueRange && { min: tool.valueRange.min, max: tool.valueRange.max })}
								description={tool.description}
								// label='' todo: optional label if in wrapper specified
								error={errors[tool.name]}
							/>
						</Input.Wrapper>
						{errors[tool.name] && (
							<p style={{ color: "red", fontSize: "0.875rem" }}>{errors[tool.name]}</p>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default CogTools;