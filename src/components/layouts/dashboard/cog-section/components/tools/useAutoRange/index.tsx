import { useCallback, useState } from "react";

import { useSearchParams, useRouter } from "next/navigation";
import { createQueryString } from "@/utils/url";

// Import cog tools' data types
import { CogValueType } from "@/config/cog/cog-value-types";
import { MantineInputType } from "@/config/cog/mantine-input-types";
import { cogSettings } from "@/config/cog/cog-tools-config";
import { Range, CogSettingTool } from "@/config/cog/cog-tools-config";

// Component
import { Input, Switch } from "@mantine/core";

const useAutoRange = () => {
  const router = useRouter();
  // const pathname = usePathname();
  const searchParams = useSearchParams();
  const createQueryStringCallback = useCallback(createQueryString, [
    searchParams,
  ]);

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

  return (
    <Input.Wrapper size="sm">
      <Switch />
    </Input.Wrapper>
  );
};

export { useAutoRange };
