import { Slider as MantineSlider } from "@mantine/core";

interface SliderProps {
	label: string;	// Title
}


const Slider: React.FC<SliderProps> = ({
	label
}) => {

	return (
		<MantineSlider
			label='ssss'
		/>
	)

}

export default Slider;