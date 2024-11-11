import { ReactNode, useCallback, useState } from "react";

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { createQueryString } from '@/utils/url'

// Import cog tools' data types
import { CogValueType } from '@/config/cog/cog-value-types';
import { MantineInputType } from '@/config/cog/mantine-input-types';
import { cogSettings } from "@/config/cog/cog-tools-config";
import { Range, CogSettingTool } from '@/config/cog/cog-tools-config';

// Import color convert  operations
import arrayToRgba from '@/utils/array-to-rgba';
import rgbaToArray from "@/utils/rgba-to-array";

// Mantine-based components
import { Switch, Checkbox, ColorInput, ColorPicker, Input, JsonInput, NumberInput, Slider, TagsInput } from "@mantine/core";

// Component mappings for each type
const componentMap: Record<MantineInputType, React.ComponentType<any>> = {
	[MantineInputType.Switch]: Switch,
	[MantineInputType.Checkbox]: Checkbox,
	[MantineInputType.ColorInput]: ColorInput,
	[MantineInputType.ColorPicker]: ColorPicker,
	[MantineInputType.Input]: Input,
	[MantineInputType.JsonInput]: JsonInput,
	[MantineInputType.NumberInput]: NumberInput,
	[MantineInputType.Slider]: Slider,
	[MantineInputType.TagsInput]: TagsInput,
};

// Define tool values type based on CogSettingTool['name'] for keys
type ToolValues = Record<CogSettingTool['name'], any>;

const CogTools = () => {

	// URL
	const router = useRouter();
	// const pathname = usePathname();
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

	return (
		<>
			{cogSettings.map((tool: CogSettingTool) => {
				const ToolComponent = componentMap[tool.type as MantineInputType];
				if (!ToolComponent) return null;

				// Current value for this tool
				// const value = toolValues[tool.name];


				// Handling default values

				let defaultValue;

				if (tool.name === 'alpha') {
					defaultValue = searchParams.get(tool.name) !== null && searchParams.get(tool.name) !== '' ? Number(searchParams.get(tool.name)) : tool.defaultValue
				} else if (tool.valueType === CogValueType.Color) {
					defaultValue = arrayToRgba(tool.defaultValue);
				} else if (tool.type === MantineInputType.TagsInput) {
					defaultValue = tool.defaultValue;
				} else {
					defaultValue = undefined;
				}

				// Handling useState

				const [checked, setChecked] = useState(tool.defaultValue);



				const onChange = (event: any) => {
					if (tool.type === MantineInputType.Switch) {
						setChecked(!checked);
						handleChange(tool.name, event.currentTarget.checked)
					}
					if (tool.type === MantineInputType.Slider) {	// Value output
						handleChange(tool.name, event);
					}
					if (tool.type === MantineInputType.NumberInput) {	// Value output
						handleChange(tool.name, event);
					}

					if (tool.valueType === CogValueType.Color) {
						const value = rgbaToArray(event);
						handleChange(tool.name, value);
					}

					if (tool.type === MantineInputType.TagsInput) {
						handleChange(tool.name, event);
					}
				};

				return (
					<Input.Wrapper
						size="sm"
						key={tool.name}
						label={tool.title}
						description={tool.description}
						// error={errorMsg}
						// required

						// Styles
						{...(tool.type === MantineInputType.Slider ? { mb: "lg" } : {})}
					>
						<ToolComponent
							checked={checked}
							defaultValue={defaultValue}
							onChange={(event: any) => onChange(event)}

							// Sliders
							{...(tool.valueRange && {
								marks: [
									{ value: tool.valueRange.min, label: `${tool.valueRange.min}%` },
									{ value: tool.valueRange.max, label: `${tool.valueRange.max}%` }
								]
							})}
							// Colors
							{...(tool.valueType === CogValueType.Color && {
								format: "rgba"
							})}
							// TagsInput
							{...(tool.type === MantineInputType.TagsInput && {
								placeholder: 'HEX colors or color names',
								allowDuplicates: true,
								clearable: true
							})}

							/**
							 *  DISABLED Rules
							 */

							{...(toolValues.useAutoRange === true) && (tool.name === 'colorScaleValueRange') && {
								disabled: true
							}}

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