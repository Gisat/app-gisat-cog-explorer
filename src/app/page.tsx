'use client'

import React, { useState, useEffect } from 'react';
import { useSearchParams } from "next/navigation";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import Map from '@/components/layouts/map'
import { getCogParams } from '@/utils/get-cog-params';

// Styles
import classes from '@/styles/Home.module.css';
import Dashboard from "@/components/layouts/dashboard";
import Editor from "@/components/layouts/editor";
import { getCogMetadata } from '@/utils/get-cog-metadata';

/**
 * Todo list:
 * 1. Implement Analytics (use-analytics)
 * 2. ...
 */

export default function Home() {

  // Editor with metadata
  const searchParams = useSearchParams();
  const [metadata, setMetadata] = useState<string>(
    "Welcome to COG Explorer! Enter your COG URL into the data source field to start exploring its metadata."
  );

  useEffect(() => {
    async function fetchMetadata() {
      const cogMetadata = await getCogMetadata(searchParams);
      if (cogMetadata) {
        setMetadata(JSON.stringify(cogMetadata, null, 2));
      } else {
        setMetadata("Failed to load metadata. Please check the COG URL.");
      }
    }

    fetchMetadata();
  }, [searchParams]);

  // Editor with params
  const [cogParams, setCogParams] = useState<string>();
  useEffect(() => {
    const updatedCogParams = JSON.stringify(getCogParams(searchParams), null, 2);
    setCogParams(updatedCogParams);
  }, [searchParams]);

  return (
    <main className={classes.main}>
      <PanelGroup autoSaveId="app-main-panelgroup" direction="horizontal" className={classes.panelGroup}>
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
            <Panel className={classes.consolePanel} defaultSize={20} collapsible={true} minSize={20} maxSize={70}>
              <PanelGroup direction="horizontal">
                <Panel defaultSize={50}>
                  <Editor content={metadata} />
                </Panel>
                <PanelResizeHandle className={classes.handleSide} />
                <Panel defaultSize={50}>
                  <Editor content={cogParams} />
                </Panel>
              </PanelGroup>
            </Panel>
          </PanelGroup>
        </Panel>
      </PanelGroup>
    </main>
  );
}
