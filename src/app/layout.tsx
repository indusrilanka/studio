import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using next/font for optimization
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

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
    <html lang="en" className={inter.variable}>
      <head>
        {/* Google Fonts link is managed by next/font, no manual <link> needed for Inter */}
      </head>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
