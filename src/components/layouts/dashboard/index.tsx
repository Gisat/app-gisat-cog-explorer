"use client";

// Styles
import classes from "@/styles/Dashboard.module.css";
import { Logo } from "@/components/ui/logo";
import CogSection from "./cog-section";
import DashboardFooter from "./footer";

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
