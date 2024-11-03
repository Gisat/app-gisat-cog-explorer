import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { transformToColor } from "./dataTypes";
import chroma from "chroma-js";

export const getCogParams = () => {
  const searchParams = useSearchParams()!;

  const versionRef = useRef(0);

  // Parameters definition
  type Params = {
    [key: string]: any;
  };
  const defaultParams: Params = {};

  const paramsRef = useRef(defaultParams);

  // Getting values by category
  const getBoolValues = () => {
    const values: Params = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Boolean) {
        const isTrue = paramsRef.current[p.name] === "true";
        if (p.defaultValue !== isTrue) {
          values[p.name] = isTrue;
        }
      }
    }
    return values;
  };

  const getRangeValues = () => {
    const values: Params = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Range) {
        const parsed = Number.parseFloat(paramsRef.current[p.name]);
        if (
          searchParams.has(p.name) &&
          Number.isFinite(parsed) &&
          parsed !== p.defaultValue
        ) {
          values[p.name] = parsed;
        }
      }
    }
    return values;
  };

  const getNumberValues = () => {
    const values: Params = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Number) {
        const parsed = Number.parseFloat(paramsRef.current[p.name]);
        if (
          searchParams.has(p.name) &&
          Number.isFinite(parsed) &&
          parsed !== p.defaultValue
        ) {
          values[p.name] = parsed;
        }
      }
    }
    return values;
  };

  const getColorValues = () => {
    const values: Params = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Color) {
        const asColor = transformToColor(paramsRef.current[p.name]);
        if (chroma.valid(asColor)) {
          values[p.name] = asColor;
        }
      }
    }
    return values;
  };

  const getParams = () => {
    return {
      ...getBoolValues(),
      ...getRangeValues(),
      ...getNumberValues(),
      ...getColorValues(),
    };
  };

  return getParams();
};
