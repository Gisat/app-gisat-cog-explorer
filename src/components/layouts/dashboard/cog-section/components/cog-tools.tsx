import { useCallback, useState } from "react";

import {
	isValidColor,
	isValidColorScale,
	isValidCommaSeparatedNumbers,
	isValidCommaSeparatedValueColorPairs,
} from "@/utils/dataTypes";

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'

// Import cog tools' data types
import { CogValueType } from '@/config/cog/cog-value-types';
import { MantineInputType } from '@/config/cog/mantine-input-types';
import { cogSettings } from "@/config/cog/cog-tools-config";
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

// Define tool values type based on CogSettingTool['name'] for keys
type ToolValues = Record<CogSettingTool['name'], any>;

const CogTools = () => {

	// URL
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	// Getting default tool values from cog-tools-config
	const initialToolValues = cogSettings.reduce((acc, tool) => {
		return {
			...acc,
			[tool.name]: {
				defaultValue: tool.defaultValue,
				// valueRange: tool.valueRange || null,
			},
		};
	}, {});

	const [toolValues, setToolValues] = useState<ToolValues>(initialToolValues);

	// Define a centralized onChange function
	const handleChange = (name: string, value: any) => {
		// Update state
		setToolValues(prevValues => ({ ...prevValues, [name]: value }));

		// Update URL query
		router.push('?' + createQueryStringCallback(name, value, Array.from(searchParams.entries())).toString(), { scroll: false });
	};

	// State to store validation errors
	// const [errors, setErrors] = useState<Record<string, string | null>>({});

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
		<>
			{cogSettings.map((tool: CogSettingTool) => {
				const ToolComponent = componentMap[tool.type as MantineInputType];
				if (!ToolComponent) return null;

				// Current value for this tool
				const value = toolValues[tool.name];
				let defaultValue;

				if (tool.name === 'alpha') {
					defaultValue = searchParams.get(tool.name) !== null && searchParams.get(tool.name) !== '' ? Number(searchParams.get(tool.name)) : tool.defaultValue
				} else {
					defaultValue = undefined;
				}

				return (
					<Input.Wrapper
						size="sm"
						key={tool.name}
						label={tool.title}
						description={tool.description}
					// error={errorMsg}
					// required
					>
						<ToolComponent

							// value={value}
							defaultValue={defaultValue}
							onChange={(value: any) => {
								const isValid = validateValue(tool.name, value);
								if (isValid === null) {
									handleChange(tool.name, value); // Only call handleChange if validation passes
								} else {
									console.warn(isValid);
								}
							}}
							// defaultValue

							{...(tool.valueRange && { min: tool.valueRange.min, max: tool.valueRange.max })}
						// label='' todo: optional label if in wrapper specified
						// error={errors[tool.name]}
						/>
					</Input.Wrapper>
				);
			})}
		</>
	);
};

export default CogTools;