/* eslint-disable */
import { useSearchParams } from 'next/navigation';

import { cogSettings, CogSettingTool } from '@/config/cog/cogToolsConfig';
import { CogValueType } from '@/config/cog/cogValueTypes';
import { urlParams } from '@/types/urlParams';

import {
  parseBoolean,
  parseColor,
  parseColorArray,
  parseNumber,
  parseNumberArray,
  parseNumberNull,
  parseValueColorArray,
} from './parseValueTypes';

/**
 * Utility function to retrieve a single parameter from the URL or search parameters.
 *
 * @param toolName - The name of the tool from CogSettingsTool.
 * @returns The tool object with the parsed value, or tool with `undefined` value in case value has not parsed.
 */
export const getTool = (toolName: CogSettingTool['name']): CogSettingTool => {
  // Find the corresponding tool configuration
  const tool = cogSettings.find((tool) => tool.name === toolName);

  if (!tool) {
    throw new Error(
      `No settings found for tool name: "${toolName}" in COG Settings.`,
    );
  }

  // Retrieve search parameters from `useSearchParams`
  const searchParams = useSearchParams();

  const paramValue = searchParams.get(toolName);

  // Parse the parameter value based on its type
  const value = parseValueByType(tool.valueType, toolName, paramValue);

  // Return the tool object with the parsed value
  return {
    ...tool,
    value,
  };
};

/**
 * Parses a parameter value based on its value type.
 *
 * @param valueType - The type of the parameter (e.g., Boolean, Number, Text).
 * @param paramName - The name of the parameter.
 * @param paramValue - The raw parameter value as a string.
 * @returns The parsed value, or `undefined` if parsing is not applicable.
 */
const parseValueByType = (
  valueType: CogValueType,
  paramName: CogSettingTool['name'],
  paramValue: string | null | undefined, // String because taken form URL
): urlParams[keyof urlParams] | undefined => {
  if (paramValue === undefined || paramValue === '' || paramValue === null) {
    return undefined;
  } else {
    switch (valueType) {
      case CogValueType.Boolean:
        return parseBoolean(paramName, paramValue);
      case CogValueType.Number:
        return parseNumber(paramName, paramValue);
      case CogValueType.NumberNull:
        return parseNumberNull(paramName, paramValue);
      case CogValueType.Color:
        return parseColor(paramName, paramValue);
      case CogValueType.ColorArray:
        return parseColorArray(paramName, paramValue);
      case CogValueType.NumberArray:
        return parseNumberArray(paramName, paramValue);
      case CogValueType.ValueColorArray:
        return parseValueColorArray(paramName, paramValue);
      case CogValueType.Text:
        return undefined; // Or add Text parsing logic if needed
      default:
        console.warn(
          `Unsupported value type: "${valueType}" for parameter: "${paramName}".`,
        );
        return undefined;
    }
  }
};
