import { useState } from "react";

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

const CogTools = () => {

	// Getting default tool values from cog-tools-config
	const initialToolValues = cogSettings.reduce((acc, tool) => {
		return {
			...acc,
			[tool.name]: {
				defaultValue: tool.defaultValue,
				valueRange: tool.valueRange || null,
			},
		};
	}, {});

	const [toolValues, setToolValues] = useState(initialToolValues);
	console.log('_ToolValues', toolValues);

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

	// URL
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	return (
		<div>
			{cogSettings.map((tool: CogSettingTool) => {
				const ToolComponent = componentMap[tool.type as MantineInputType];
				if (!ToolComponent) return null;

				// URL
				const urlVal = searchParams.get(tool.name) !== null && searchParams.get(tool.name) !== '' ? Number(searchParams.get(tool.name)) : ''

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


								value={urlVal}
								// defaultValue=



								{...(tool.valueRange && { min: tool.valueRange.min, max: tool.valueRange.max })}
							// label='' todo: optional label if in wrapper specified
							// error={errors[tool.name]}
							/>
						</Input.Wrapper>
						{/*errors[tool.name] && (
							<p style={{ color: "red", fontSize: "0.875rem" }}>{errors[tool.name]}</p>
						)*/}
					</div>
				);
			})}
		</div>
	);
};

export default CogTools;