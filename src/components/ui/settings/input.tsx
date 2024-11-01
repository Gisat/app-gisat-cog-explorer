// Mantine components
import { Input as InputMantine } from '@mantine/core';

interface InputProps {
	// Wrapper props

	label: string;	// Title
	description?: string | React.ReactNode;	// String or some html code
	errorMsg?: string;
	requiredLabel?: boolean;
	sizeWrapper?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';

	// Input props

	icon?: React.ReactNode;
	placeholder?: string;
	sizeInput?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
	radiusInput?: 'sm' | 'md' | 'lg' | 'xl' | 'xs';
	disabled?: boolean;
	requiredInput?: boolean;
	errorInput?: boolean;

	// Important logic
	value?: string;	// Value should be the string (not validated), e.g 'https://example.com'
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
	// Wrapper props
	label,
	description,
	errorMsg,
	requiredLabel = false,
	sizeWrapper = 'sm',

	// Input props
	icon,	// No default icon
	placeholder,	// No default value
	sizeInput = 'sm',
	requiredInput = false,
	radiusInput = 'sm',
	errorInput = false,
	disabled = false,

	// logic
	value,
	onChange
}) => {

	return (
		<InputMantine.Wrapper
			label={label}
			description={description}
			error={errorMsg}
			required={requiredLabel} // red dot but includes <label data-required="true" /> into html
			// withAsterisk //REQ red dot * (without including "required" to <label/>)
			size={sizeWrapper}
		>
			<InputMantine
				size={sizeInput}
				radius={radiusInput}
				placeholder={placeholder}
				error={errorInput}
				disabled={disabled}
				leftSection={icon}
				required={requiredInput}

				// Logic
				value={value}
				onChange={onChange}
			/>
		</InputMantine.Wrapper >
	);
};

export default Input;