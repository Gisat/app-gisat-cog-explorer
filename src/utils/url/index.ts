import { useRouter } from "next/router";

/**
 * Remove a parameter from the query string.
 * @param param - The parameter to remove.
 */
export function removeQueryStringParam(param: string): void {
  const router = useRouter();
  const query = { ...router.query };

  delete query[param];

  router.push({ pathname: router.pathname, query }, undefined, {
    shallow: true,
  });
}

/**
 * Set or update a query string parameter.
 * @param param - The parameter to set.
 * @param value - The value to assign.
 */
export function setQueryStringParam(
  param: string,
  value: string | string[]
): void {
  const router = useRouter();
  const query = { ...router.query, [param]: value };

  router.push({ pathname: router.pathname, query }, undefined, {
    shallow: true,
  });
}

/**
 * Append a value to an array-type query parameter.
 * @param param - The parameter name.
 * @param value - The value to append.
 */
export function appendQueryStringParam(param: string, value: string): void {
  const router = useRouter();
  const query = { ...router.query };

  const currentVal = query[param];
  if (Array.isArray(currentVal)) {
    query[param] = [...currentVal, value];
  } else if (typeof currentVal === "string") {
    query[param] = [currentVal, value];
  } else {
    query[param] = [value];
  }

  router.push({ pathname: router.pathname, query }, undefined, {
    shallow: true,
  });
}

/**
 * Remove a value from an array-type query parameter.
 * @param param - The parameter name.
 * @param value - The value to remove.
 */
export function removeFromQueryStringParam(param: string, value: string): void {
  const router = useRouter();
  const query = { ...router.query };

  const currentVal = query[param];
  if (Array.isArray(currentVal)) {
    query[param] = currentVal.filter((v) => v !== value);
  } else if (currentVal === value) {
    delete query[param];
  }

  router.push({ pathname: router.pathname, query }, undefined, {
    shallow: true,
  });
}

/**
 * Check if a query parameter is present.
 * @param param - The parameter name.
 * @returns True if the parameter exists, false otherwise.
 */
export function isQueryStringParamPresent(param: string): boolean {
  const router = useRouter();
  return Object.prototype.hasOwnProperty.call(router.query, param);
}

/**
 * Get the value of a query string parameter.
 * @param param - The parameter name.
 * @returns The parameter value, which can be a string, an array of strings, or null.
 */
export function getQueryStringParam(param: string): string | string[] | null {
  const router = useRouter();
  return router.query[param] || null;
}

/**
 * Clear all query parameters except specified ones.
 * @param except - An array of parameters to retain.
 */
export function clearQueryStringsExcept(except: string[] = []): void {
  const router = useRouter();
  const query = { ...router.query };

  const newQuery = Object.keys(query)
    .filter((key) => except.includes(key))
    .reduce<Record<string, string | string[]>>((obj, key) => {
      obj[key] = query[key]!;
      return obj;
    }, {});

  router.push({ pathname: router.pathname, query: newQuery }, undefined, {
    shallow: true,
  });
}
