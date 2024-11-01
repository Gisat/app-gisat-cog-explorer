import { useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createQueryString } from '@/utils/url';

// Mantine
import { Button, Input } from '@mantine/core';

// React icons
import { IconLink } from '@tabler/icons-react';
import { IconPlayerPlayFilled } from "@tabler/icons-react";

const CogUrlInput = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const cogUrl = searchParams.get('cogUrl');

	const [inputValue, setInputValue] = useState(cogUrl);
	const [tempInputValue, setTempInputValue] = useState(cogUrl); // Temporary state for the input
	const [error, setError] = useState<string | null>(null);

	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	const handleButtonClick = () => {
		// Reset error message
		setError(null);

		// Trim any leading or trailing whitespace from the input value
		const trimmedValue = (tempInputValue || '').trim();

		// Regex pattern to match complex URLs ending in .tif
		const urlPattern = /^(https?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=%]+\.tif)$/i;
		if (!urlPattern.test(trimmedValue)) {
			setError("URL must start with https:// and end with .tif");
			return; // Stop further execution if validation fails
		}

		// If validation passes, clear error and proceed
		setTempInputValue(trimmedValue); // Update temporary state to trimmed value
		setInputValue(trimmedValue);
		router.push(
			'?' + createQueryStringCallback('cogUrl', trimmedValue, Array.from(searchParams.entries())).toString(),
			{ scroll: false }
		);
	};

	return (
		<Input.Wrapper
			label="Data source"
			description={<><b>URL address</b> to your .tif raster</>}
			error={error} // Show error message if validation fails
			required
			size="sm"
		>
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<Input
					value={tempInputValue ?? ''}
					onChange={(e) => setTempInputValue(e.target.value)} // Update temporary input value
					placeholder="https://example.com/COG_raster.tif"
					my="xs"
					leftSection={<IconLink size={16} />}
					required
					error={!!error} // Only show error outline when there's an error
				/>
				<Button
					onClick={handleButtonClick} // Trigger validation and URL update on button click
					ml="xs"
					my={0}
				>
					<IconPlayerPlayFilled size={16} />
				</Button>
			</div>
		</Input.Wrapper>
	);
}

export default CogUrlInput;