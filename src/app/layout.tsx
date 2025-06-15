import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using next/font for optimization
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/core/ThemeProviderComponent";
import { DisableContextMenuProvider } from "@/components/core/DisableContextMenuProvider";

// If you have a variable font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter', // CSS variable for Inter font
});

export const metadata: Metadata = {
  title: 'LabTrak - Laboratory Management System',
  description: 'Efficiently manage your laboratory operations.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        {/* Google Fonts link is managed by next/font, no manual <link> needed for Inter */}
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DisableContextMenuProvider>
            {children}
          </DisableContextMenuProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
