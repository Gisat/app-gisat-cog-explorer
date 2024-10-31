'use client'

import { createQueryString } from '@/utils/url'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import CogBitmapParams from '@/data/CogBitmapParams'
import CheckboxWithLabel from '@/components/ui/settings/checkbox-with-label';

// Styles
// import classes from '@/styles/Dashboard.module.css';

const CogSettings = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const cogUrl = searchParams.get('cogUrl');
	const [stateCogUrl, setStateCogUrl] = useState(cogUrl);

	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	const onUrlChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const cogUrl = evt.target.value;
		setStateCogUrl(cogUrl);
		router.push('?' + createQueryStringCallback('cogUrl', cogUrl, Array.from(searchParams.entries())).toString()); // Scroll: false
	};

	return (
		<div>

			<label>
				<span>COG Url</span>
				<input onChange={onUrlChange} value={stateCogUrl?.toString()} />
			</label>

			{CogBitmapParams.map(d => {
				const type = typeof d.type === 'string' ? d.type : d.type.inputType;
				const value = typeof d.type === 'object' ? d.type.value : null;
				switch (type) {
					case 'bool':
						return <CheckboxWithLabel label={d.title} name={d.name} key={d.name} />;
					default:
						return null;
				}
			})}
		</div>
	);
};

export default CogSettings;