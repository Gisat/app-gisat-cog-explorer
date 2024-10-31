import type { Metadata } from "next";
import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';

// Mantine
import { createTheme, MantineProvider, ColorSchemeScript } from '@mantine/core';

const theme = createTheme({
  /** Put your mantine theme override here */
});

// Styles
import '@/styles/global.css'; // Global
import '@mantine/core/styles.css'; // Mantine styles

export const metadata: Metadata = {
  title: 'COG Explorer by GISAT',
  description: 'Internal application for COGs',
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          <AppProvider>
            {children}
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;