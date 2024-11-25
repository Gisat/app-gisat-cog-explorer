"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { CogSettingTool } from "@/config/cog/cog-tools-config";

// Define a utility type to map tool names to their value types
type CogSettingsValueType = {
  [T in CogSettingTool["name"]]: T extends "alpha" | "multiplier"
    ? number
    : T extends "useAutoRange" | "useHeatMap"
    ? boolean
    : any; // Fallback for other types
};

// Custom hook definition
export const useHandleParamChange = () => {
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

    // Push updated query string to the router
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return { handleParamChange };
};
