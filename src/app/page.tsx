'use client'

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Map from '@/components/layouts/map'

// Styles
import classes from '@/styles/Home.module.css';
import Dashboard from "@/components/layouts/dashboard";
import Terminal from "@/components/layouts/terminal";

/**
 * Todo list:
 * 1. Implement Analytics (use-analytics)
 * 2. ...
 */

export default function Home() {
  return (
    <main className={classes.main}>
      <PanelGroup autoSaveId="app-main-panelgroup" direction="horizontal" className={classes.panelGroup}>
        <Panel defaultSize={30} minSize={30} className={classes.leftPanel}>
          <Dashboard />
        </Panel>
        <PanelResizeHandle className={classes.handleSide} />
        <Panel className={classes.rightPanel} minSize={50}>
          <PanelGroup autoSaveId="app-right-panelgroup" direction="vertical">
            <Panel className={classes.mapPanel}>
              <Map />
            </Panel>
            <PanelResizeHandle className={classes.handleSide} />
            <Panel className={classes.consolePanel} defaultSize={10} collapsible={true} minSize={20}>
              <Terminal />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle />
      </PanelGroup>
    </main>
  );
}
