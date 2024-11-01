'use client'

import CogBitmapParams from '@/data/CogBitmapParams'
import CheckboxWithLabel from '@/components/ui/settings/checkbox-with-label';
import Slider from '@/components/ui/settings/slider';
import Input from '@/components/ui/settings/input';
import CogUrlInput from '@/components/layouts/dashboard/cog-settings/components/cog-url-input';

// Styles
// import classes from '@/styles/Dashboard.module.css';

const CogSettings = () => {

	return (
		<div>

			<CogUrlInput />

			{CogBitmapParams.map(d => {
				const type = typeof d.type === 'string' ? d.type : d.type.inputType;
				const value = typeof d.type === 'object' ? d.type.value : null;
				switch (type) {
					case 'checkbox':
						return <CheckboxWithLabel label={d.title} name={d.name} key={d.name} description={d.description} size='sm' />;
					case 'slider':
						return <Slider label={d.title} name={d.name} key={d.name} size='sm' />;

					default:
						return null;
				}
			})}
		</div>
	);
};

export default CogSettings;