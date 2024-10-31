'use client'

import Link from 'next/link';
import Image from 'next/image';
import CogSettings from './cog-settings';

// Styles
import classes from '@/styles/Dashboard.module.css';

const Dashboard = () => {

	// code here

	return (
		<aside className={classes.aside}>
			<div className={classes.content}>
				<div className={classes.logo}>
					<Link href="/" aria-label="Home">
						<Image
							src='/gisat.svg'
							alt='GISAT Logo'
							width={100}
							height={40}
							priority
						/>
						<span>|</span>
						<h1>COG Explorer</h1>
					</Link>
				</div>
				<div className={classes.settings}>
					<CogSettings />
				</div>
				<div>
					Footer
				</div>
			</div>
		</aside>
	)
}

export default Dashboard;