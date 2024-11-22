"use client";

import { useSearchParams } from "next/navigation";
import { getParamsUrl } from "./getParamsUrl";
import { urlParams } from "@/types/urlParams";

// A React hook to dynamically fetch URL parameters
export const useParamsUrl = (
  asJson: boolean = false
): Partial<urlParams> | string => {
  const searchParams = useSearchParams(); // Reactively get current search params

  // Call the pure function to parse parameters
  return getParamsUrl(new URLSearchParams(searchParams.toString()), asJson);
};
