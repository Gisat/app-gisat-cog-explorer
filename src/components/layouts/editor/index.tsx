import React, { useState, useEffect } from 'react';
import MonacoEditor from '@monaco-editor/react';
import { getCogParams } from '@/utils/get-cog-params';

interface EditorProps {
	initialContent: string;
}

const Editor: React.FC<EditorProps> = () => {

	//const value = JSON.stringify(getCogParams());

	return (
		<MonacoEditor
			language="jsonc"
			value='Hello world'
			options={{ theme: 'vs-light' }}
		/>
	);
};

export default Editor;