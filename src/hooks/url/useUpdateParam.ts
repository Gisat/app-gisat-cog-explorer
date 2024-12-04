import { useSearchParams, useRouter } from "next/navigation";
import { cogSettings, CogSettingTool } from "@/config/cog/cog-tools-config";
import { CogValueType } from "@/config/cog/cog-value-types";
import { postColor } from "@/utils/url/postValueTypes/color";
import { postColorArray } from "@/utils/url/postValueTypes/colorArray";

// Define a utility type to map tool names to their value types
type CogSettingsValueType = {
  [T in CogSettingTool["name"]]: CogSettingTool["value"];
};

/**
 * Custom hook to update query parameters based on tool settings.
 *
 * @returns The `updateParam` function to update or remove query parameters.
 */
export const useUpdateParam = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (
    name: CogSettingTool["name"],
    value: CogSettingsValueType[CogSettingTool["name"]]
  ): void => {
    const tool = cogSettings.find((t) => t.name === name);

    if (!tool) {
      console.warn(`No tool found for name: ${name}`);
      return;
    }

    const { valueType } = tool;

    // Clone current query parameters
    const params = new URLSearchParams(searchParams.toString());

    // Update or remove the parameter
    if (value !== undefined && value !== null && value !== "") {
      switch (valueType) {
        case CogValueType.Color:
          const color: string | undefined = postColor(name, value);
          if (color !== undefined && color !== null && color !== "") {
            params.set(name, color);
          } else {
            params.delete(name);
          }
          break;
        case CogValueType.ColorArray:
          const colorArray: string | undefined = postColorArray(name, value);
          if (
            colorArray !== undefined &&
            colorArray !== null &&
            colorArray !== ""
          ) {
            params.set(name, colorArray);
          } else {
            params.delete(name);
          }
          break;
        default:
          params.set(name, value.toString()); // Update the parameter
      }
    } else {
      params.delete(name); // Remove the parameter
    }

    // Push updated query string to the router
    router.push(`?${params.toString()}`, { scroll: false });
  };
};
