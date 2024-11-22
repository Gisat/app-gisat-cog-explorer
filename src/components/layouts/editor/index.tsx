import MonacoEditor from "@monaco-editor/react";

// import { getParamsUrl } from "@/utils/getParamsUrl";
import { useParamsUrl } from "@/utils/useParamsUrl";

const Editor = () => {
  const urlParams = useParamsUrl();

  return (
    <MonacoEditor
      language="json"
      value={JSON.stringify(urlParams, null, 2)}
      options={{ theme: "vs-light" }}
    />
  );
};

export default Editor;
