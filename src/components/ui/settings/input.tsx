import React, { useCallback, useState } from 'react';
import { Input as InputMantine, Text, Group } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/url';

interface InputProps {
	title: string;
	name: string;
	defaultValue?: string;
	validation?: (value: string) => boolean;
	placeholder?: string;
	children?: React.ReactNode;
}

const Input: React.FC<InputProps> = ({
	title,
	name,
	defaultValue = '',
	validation = null,
	placeholder = '',
	children,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const urlVal = searchParams.get(name) || '';
	const [value, setValue] = useState<string>(urlVal || defaultValue);
	const [isValid, setIsValid] = useState(true);

	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	const onChanged = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const val = evt.target.value;
		setValue(val);

		const valid = !val || (typeof validation === 'function' ? validation(val) : true);
		setIsValid(valid);

		// Update the query parameter with the new value
		router.push(
			'?' + createQueryStringCallback(name, val, Array.from(searchParams.entries())).toString(),
			{ scroll: false }
		);
	};

	return (
		<label className="block mt-2">
			<Text size="sm" className="mb-1">
				{title}
			</Text>
			<InputMantine
				value={value}
				onChange={onChanged}
				placeholder={placeholder}
				error={!isValid ? 'Invalid input' : null}
				styles={{
					input: {
						borderColor: isValid ? undefined : 'rose',
					},
				}}
			/>
			{children && <div style={{ marginTop: '0.5rem' }}>{children}</div>}
		</label>
	);
};

export default Input;