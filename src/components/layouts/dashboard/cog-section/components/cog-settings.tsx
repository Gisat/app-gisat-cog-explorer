import { isValidColor, isValidColorScale, isValidCommaSeparatedNumbers, isValidCommaSeparatedValueColorPairs } from '@/utils/dataTypes'
import CogBitmapParams from '@/data/CogBitmapParams'

import BoolOption from './options/bool'
import NumberOption from './options/number'
import ColorOption from './options/color'
import TextOption from './options/text'
import ArrayOption from './options/array'
import RangeOption from './options/range'

const getValidator = (validatorType: string) => {

	switch (validatorType) {
		case 'color':
			return isValidColor
		case 'colorScale':
			return isValidColorScale
		case 'commaSeparatedNumbers':
			return isValidCommaSeparatedNumbers
		case 'commaSeparatedValueColorPairs':
			return isValidCommaSeparatedValueColorPairs
		default:
			return null
	}
}

const CogSettings = () => {

	// Some code here

	return (
		<div>
			{
				CogBitmapParams.map(d => {
					const type = typeof d.type === 'string' ? d.type : d.type.inputType
					const value = typeof d.type === 'object' ? d.type.value : null
					switch (type) {
						case 'bool':
							return <BoolOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
								<p>
									{d.description}
								</p>
							</BoolOption>
						case 'range':
							return <RangeOption title={d.title} name={d.name} key={d.name} min={0} max={100} defaultValue={d.defaultValue}>
								<p>
									{d.description}
								</p>
							</RangeOption>
						case 'number':
							return <NumberOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
								<p>
									{d.description}
								</p>
							</NumberOption>
						case 'color':
							return <ColorOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue}>
								<p>
									{d.description}
								</p>
							</ColorOption>
						case 'text':
							return <TextOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
								<p>
									{d.description}
								</p>
							</TextOption>
						case 'array':
							return <ArrayOption title={d.title} name={d.name} key={d.name} defaultValue={d.defaultValue} validation={typeof d.type === 'object' ? getValidator(d.type.value) : undefined}>
								<p>
									{d.description}
								</p>
							</ArrayOption>
						default:
							return null
					}

				})
			}
		</div>
	)
}

export default CogSettings;