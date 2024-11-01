'use client'

import CogUrlInput from '@/components/layouts/dashboard/cog-section/components/cog-url-input';
import CogTools from '@/components/layouts/dashboard/cog-section/components/cog-tools';

// Styles
// import classes from '@/styles/Dashboard.module.css';

const CogSection = () => {

	return (
		<div>
			<CogUrlInput />
			<CogTools />
		</div>
	);
};

export default CogSection;