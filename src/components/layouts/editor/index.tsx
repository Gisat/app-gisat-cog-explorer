import MonacoEditor from '@monaco-editor/react';

// Params
import { getLog } from '@/utils/url/getLog';

const Editor = () => {
  const value = getLog();

  return (
    <MonacoEditor
      language="json"
      value={String(value)}
      options={{ theme: 'vs-light' }}
    />
  );
};

export default Editor;
