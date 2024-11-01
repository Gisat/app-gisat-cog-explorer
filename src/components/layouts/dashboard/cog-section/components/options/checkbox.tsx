import { Switch as MantineSwitch, Text } from '@mantine/core';

interface SwitchProps {
	value: boolean; // Current value of the switch (checked/unchecked)
	onChange: (value: boolean) => void; // Function to handle the change event
	description?: string | JSX.Element; // Optional description text to display below the switch
	error?: string; // Optional error message to display in red text
	label?: string; // Optional label for the switch
}

const Checkbox: React.FC<SwitchProps> = ({ value, onChange, description, error, label }) => {
	return (
		<div style={{ marginBottom: '1rem' }}>
			{label && <Text>{label}</Text>}
			<MantineSwitch
				checked={value}
				onChange={(event) => onChange(event.currentTarget.checked)}
				style={{ marginBottom: '0.5rem' }}
			/>
			{description && (
				<Text color="dimmed" size="xs" style={{ marginTop: '0.25rem' }}>
					{description}
				</Text>
			)}
			{error && (
				<Text color="red" size="xs" style={{ marginTop: '0.25rem' }}>
					{error}
				</Text>
			)}
		</div>
	);
};

export default Checkbox;