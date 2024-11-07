import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
	content: string | undefined;
}

const Editor: React.FC<EditorProps> = ({ content }) => {
	return (
		<MonacoEditor
			language="json"
			value={content}
			options={{ theme: 'vs-light' }}
		/>
	);
};

export default Editor;