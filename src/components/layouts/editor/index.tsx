import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import MonacoEditor from '@monaco-editor/react';
import { getCogParams } from '@/utils/get-cog-params';

interface EditorProps {
	initialContent: string;
}

const Editor: React.FC<EditorProps> = ({ initialContent }) => {
	const searchParams = useSearchParams();
	const cogUrl = searchParams.get("cogUrl");

	const [value, setValue] = useState<string>(initialContent);

	useEffect(() => {
		const updatedValue = JSON.stringify(getCogParams(searchParams), null, 2);
		setValue(updatedValue);
	}, [searchParams]);

	return (
		<MonacoEditor
			language="json"
			value={value}
			options={{ theme: 'vs-light' }}
		/>
	);
};

export default Editor;