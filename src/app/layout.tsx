import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';

// Load Roboto font
const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify font weights (400 = Regular, 700 = Bold)
  variable: '--font-roboto', // Create a CSS variable for Tailwind use
});

export const metadata: Metadata = {
  title: 'Ai.Dit',
  description: 'A.I Audit Assistant',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={roboto.variable}>
      <body>{children}</body>
    </html>
  );
}
