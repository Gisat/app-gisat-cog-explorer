'use client';

import CogSection from './cog-section';
import classes from './Dashboard.module.css';
import DashboardFooter from './footer';

const Dashboard = () => {
  // code here

  return (
    <aside className={classes.aside}>
      <div className={classes.content}>
        <div>
          <CogSection />
        </div>
        <div>
          <DashboardFooter />
        </div>
      </div>
    </aside>
  );
};

export default Dashboard;
