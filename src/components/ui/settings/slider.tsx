import React, { useCallback, useState } from 'react';
import { Slider as SliderMantine, Loader, Text, Group } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { createQueryString } from '@/utils/url';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary';
type Size = 'sm' | 'md' | 'lg';

interface SliderProps {
	label: string;
	name: string;
	variant?: Variant;
	size?: Size;
	isLoading?: boolean;
	icon?: React.ReactNode;
	defaultValue?: number;
	min?: number;
	max?: number;
	step?: number;
	children?: React.ReactNode;
}

const variantStyles = {
	default: { color: 'blue' },
	destructive: { color: 'red' },
	outline: { color: 'gray' },
	secondary: { color: 'teal' },
};

const sizeStyles = {
	sm: { sliderSize: '4px', thumbSize: '12px' },
	md: { sliderSize: '6px', thumbSize: '16px' },
	lg: { sliderSize: '8px', thumbSize: '20px' },
};

const Slider: React.FC<SliderProps> = ({
	label,
	name,
	variant = 'default',
	size = 'md',
	isLoading = false,
	icon,
	defaultValue = 0,
	min = 0,
	max = 100,
	step = 1,
	children,
}) => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const initialSliderValue = parseFloat(searchParams.get(name) || `${defaultValue}`);
	const [value, setValue] = useState(initialSliderValue);

	const createQueryStringCallback = useCallback(createQueryString, [searchParams]);

	const handleChange = (newValue: number) => {
		setValue(newValue);
		router.push(
			'?' + createQueryStringCallback(name, newValue.toString(), Array.from(searchParams.entries())).toString(),
			{ scroll: false }
		);
	};

	const variantStyle = variantStyles[variant];
	const { sliderSize, thumbSize } = sizeStyles[size];

	return (
		<label>
			<Group align="center" style={{ cursor: 'pointer' }}>
				{icon && <span style={{ marginRight: '4px' }}>{icon}</span>}
				<Text style={{ cursor: 'default' }}>{label}</Text>
			</Group>

			{isLoading ? (
				<Loader size="sm" style={{ margin: '0.5rem 0' }} />
			) : (
				<SliderMantine
					value={value}
					onChange={handleChange}
					min={min}
					max={max}
					color='blue'
					marks={[
						{ value: 0, label: '0%' },
						{ value: 50, label: '50%' },
						{ value: 100, label: '100%' }
					]}
					step={step}
					style={{ marginBottom: '30px' }}
					thumbSize={parseInt(thumbSize, 10)}
				/>
			)}
		</label>
	);
};

export default Slider;