import type { Metadata } from "next";
import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';

// Styles
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'COG Explorer by GISAT',
  description: 'Internal application for COGs',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
};

export default RootLayout;