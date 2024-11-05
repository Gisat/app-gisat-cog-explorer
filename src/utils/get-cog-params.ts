import { cogSettings } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import { transformToColor } from "./dataTypes";
import chroma from "chroma-js";

export const getCogParams = (searchParams: URLSearchParams) => {
  // Getting values by category
  const getBoolValues = () => {
    const values: Record<string, any> = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Boolean) {
        const paramValue = searchParams.get(p.name);
        const isTrue = paramValue === "true";
        if (p.defaultValue !== isTrue) {
          values[p.name] = isTrue;
        }
      }
    }
    return values;
  };

  const getNumberValues = () => {
    const values: Record<string, any> = {};
    for (const p of cogSettings) {
      if (p.valueType === CogValueType.Number) {
        const paramValue = searchParams.get(p.name);
        const parsed = paramValue ? Number.parseFloat(paramValue) : NaN;
        if (paramValue !== null && Number.isFinite(parsed)) {
          values[p.name] = parsed;
        }
      }
    }
    return values;
  };

  const getParams = () => {
    const values = {
      ...getBoolValues(),
      ...getNumberValues(),
    };
    return values;
  };

  return getParams();
};
