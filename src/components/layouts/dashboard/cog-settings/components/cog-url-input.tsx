import { createQueryString } from '@/utils/url'
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import Input from '@/components/ui/settings/input';

// React icons
import { IconLink } from '@tabler/icons-react';


const CogUrlInput = () => {

	const router = useRouter();
	const searchParams = useSearchParams();
	const cogUrl = searchParams.get('cogUrl');
	const [stateCogUrl, setStateCogUrl] = useState(cogUrl);

	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	const onUrlChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const cogUrl = evt.target.value;
		setStateCogUrl(cogUrl);
		router.push('?' + createQueryStringCallback('cogUrl', cogUrl, Array.from(searchParams.entries())).toString(), { scroll: false })
	};


	// Here it the value
	let value = '';

	return (
		<Input
			// Wrapper props

			label='Data source'
			description={<><b>URL address</b> to your .tif raster</>}
			// errorMsg='Error message'
			requiredLabel
			sizeWrapper='sm'

			// Input props
			icon={<IconLink size={16} />}
			placeholder='https://example.com/COG_raster.tif'
			sizeInput='md'
			radiusInput='sm'
			// errorInput
			// disabled
			requiredInput

			// Main logic

			onChange={() => console.log('Changed input')}
		/>
	)
}

export default CogUrlInput;