import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';

interface EditorProps {
	initialContent: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
	const [content, setContent] = useState<string>(initialContent);

	// Update content dynamically if initialContent prop changes
	useEffect(() => {
		setContent(initialContent);
	}, [initialContent]);

	// Explicitly typing the function for handling content changes
	const handleEditorChange = (newValue: string | undefined) => {
		if (typeof newValue === 'string') {
			setContent(newValue);
		}
	};

	return (
		<MonacoEditor
			height="500px"
			language="jsonc"
			value={content}
			onChange={handleEditorChange}
			options={{ theme: 'vs-light' }}
		/>
	);
};

export default Editor;