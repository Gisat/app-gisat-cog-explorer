import MonacoEditor from "@monaco-editor/react";
import React, { useState, useEffect } from "react";
// Params
import { getParamsUrl } from "@/utils/url/getAllParams";

import { useSearchParams } from "next/navigation";

const Editor = () => {
  const searchParams = useSearchParams();
  const value = getParamsUrl(undefined, searchParams, true);

  return (
    <MonacoEditor
      language="json"
      value={String(value)}
      options={{ theme: "vs-light" }}
    />
  );
};

export default Editor;
