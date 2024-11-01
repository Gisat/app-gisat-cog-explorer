'use client'

// Styles
import classes from '@/styles/Dashboard.module.css';
import { Logo } from '@/components/ui/logo';
import CogSection from './cog-section';

const Dashboard = () => {

	// code here

	return (
		<aside className={classes.aside}>
			<div className={classes.content}>
				<Logo
					href='/'
					src='/gisat.svg'
					ariaLabel='GISAT logo'
					// src='custom_path'
					alt='GISAT'
					width={130}
					expanded
					expandedText='COG Explorer'
				/>
				<div className={classes.settings}>
					<CogSection />
				</div>
				<div>
					Footer
				</div>
			</div>
		</aside>
	)
}

export default Dashboard;