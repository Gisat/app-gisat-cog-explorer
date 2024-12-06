'use client';

import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

// Styles
import Dashboard from '@/components/layouts/dashboard';
import Editor from '@/components/layouts/editor';
import Header from '@/components/layouts/header';
import Map from '@/components/layouts/map';
import classes from '@/styles/Home.module.css';

/**
 * Todo list:
 * 1. Implement Analytics (use-analytics)
 * 2. ...
 */

export default function Home() {
  return (
    <main className={classes.main}>
      <Header />
      <PanelGroup
        autoSaveId="app-main-panelgroup"
        direction="horizontal"
        className={classes.panelGroup}
      >
        <Panel defaultSize={25} minSize={25} className={classes.leftPanel}>
          <Dashboard />
        </Panel>
        <PanelResizeHandle className={classes.handleSide} />
        <Panel className={classes.rightPanel} minSize={50}>
          <PanelGroup autoSaveId="app-right-panelgroup" direction="vertical">
            <Panel className={classes.mapPanel}>
              <Map />
            </Panel>
            <PanelResizeHandle className={classes.handleSide} />
            <Panel
              className={classes.consolePanel}
              defaultSize={20}
              collapsible={true}
              minSize={20}
              maxSize={70}
            >
              <PanelResizeHandle className={classes.handleSide} />
              <Panel defaultSize={20} className={classes.consolePanel}>
                <Editor />
              </Panel>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </main>
  );
}
