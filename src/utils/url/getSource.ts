/* eslint-disable */
import { useSearchParams } from 'next/navigation';

type GetSourceResult = {
  source: {
    parsedValue: string | undefined;
    error: string | null;
  };
};

/**
 * @returns the reference of the Data Source as a string in https://[...].tif format or an error message.
 */
export const getSource = (): GetSourceResult => {
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('cogUrl');
  const source = parseSource(paramValue);
  return { source };
};

/**
 * Parse and validate the cogUrl value.
 *
 * @param value - The input value to validate and parse.
 * @returns The trimmed and validated URL string, or an error message if invalid.
 */
export const parseSource = (
  value: string | null | undefined,
): { parsedValue: string | undefined; error: string | null } => {
  if (value === null || value === undefined || value.trim() === '') {
    return { parsedValue: undefined, error: 'URL cannot be empty' };
  }

  const trimmedValue = value.trim();

  // Regex pattern to validate URLs ending in .tif
  const urlPattern = /^(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+\.tif)$/i;
  if (!urlPattern.test(trimmedValue)) {
    return {
      parsedValue: undefined,
      error: 'URL must start with https:// and end with .tif',
    };
  }

  return { parsedValue: trimmedValue, error: null };
};
