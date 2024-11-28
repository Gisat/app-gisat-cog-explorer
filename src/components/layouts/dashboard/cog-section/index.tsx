"use client";

import CogTools from "@/components/layouts/dashboard/cog-section/components/cog-tools";
import { CogUrl } from "./components/cogUrl";

// Styles
// import classes from '@/styles/Dashboard.module.css';

const CogSection = () => {
  return (
    <div>
      <CogUrl />
      <CogTools />
    </div>
  );
};

export default CogSection;
