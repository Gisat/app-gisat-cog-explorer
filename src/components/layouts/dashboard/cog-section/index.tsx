'use client'

import CogUrlInput from '@/components/layouts/dashboard/cog-section/components/cog-url-input';
import CogSettings from '@/components/layouts/dashboard/cog-section/components/cog-settings';

// Styles
// import classes from '@/styles/Dashboard.module.css';

const CogSection = () => {

	return (
		<div>
			<CogUrlInput />
			<CogSettings />
		</div>
	);
};

export default CogSection;