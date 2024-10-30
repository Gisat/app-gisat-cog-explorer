import { useState } from 'react';

interface InputProps {
	className: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value?: string | number;
	placeholder?: string;
	type?: string;
	step?: string | number;
	min?: number;
	max?: number;
}

export default function Input({
	className,
	onChange,
	value = '',
	min,
	max,
	placeholder,
	type,
	step,
}: InputProps) {
	const [stateValue, setStateValue] = useState(value);

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		setStateValue(evt.target.value);
		onChange(evt);
	};

	return (
		<input
			className={className}
			onChange={handleChange}
			value={stateValue}
			min={min}
			max={max}
			type={type}
			placeholder={placeholder}
			{...(step && { step })}
		/>
	);
}