"use client"
// @ts-ignore
import { AnalyticsProvider } from 'use-analytics';
import CogRasterForm from '../components/CogRasterForm'
import Map from '../components/Map'
import analytics from '../utils/analytics';
import './mainPage.css'
import Parameters from '@/components/Parameters';


export default function Home() {
  return (
    <AnalyticsProvider instance={analytics}>
      <main className="h-screen">
        <div className="grid grid-cols-3 h-screen">
          <div className="side-panel bg-slate-50 col-span-1">
            <CogRasterForm />
          </div>
          <div className="map col-span-2 relative">
            <Map />
          </div>
        </div>
      </main>
    </AnalyticsProvider >
  )
}
