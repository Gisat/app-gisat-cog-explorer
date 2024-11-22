import { CogSettingTool } from "@/config/cog/cog-tools-config";
import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

// Define a utility type to map tool names to their value types
type CogSettingsValueType = {
  [T in CogSettingTool["name"]]: T extends "alpha" | "multiplier"
    ? number
    : T extends "useAutoRange" | "useHeatMap"
    ? boolean
    : any; // Fallback for other types
};

const createQueryString = (
  name: string,
  value: string | number,
  searchParams: string[][]
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value.toString());

  // return params.toString();
  return params;
};

export const useHandleParamChange = (
  name: CogSettingTool["name"],
  value: CogSettingsValueType[CogSettingTool["name"]]
) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleParamChange = (
    name: CogSettingTool["name"],
    value: CogSettingsValueType[CogSettingTool["name"]]
  ) => {
    // Clone current query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove the parameter
    if (value !== undefined && value !== null) {
      params.set(name, value.toString()); // Update the parameter
    } else {
      params.delete(name); // Remove the parameter
    }

    // Update the URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { handleParamChange };
};
