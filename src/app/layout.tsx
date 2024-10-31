import type { Metadata } from "next";
import { ReactNode } from 'react';
import { AppProvider } from '@/app/provider';

// Mantine
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '@/styles/mantineTheme';

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

      {/** dark mode can be implemented by changing body's classname */}
      <body className="ptr-light">
        {/** Mantine theme is defined separately */}
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