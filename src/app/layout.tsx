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
  title: 'Ai.DIT™ | AI Integrated Data Intelligence Tool',
  description: 'AI Integrated Data Intelligence Tool',
  keywords: [
    'AI Audit',
    'AI Audit Tool',
    'AI Audit Assistant',
    'AI Audit Automation',
    'AI Audit Report',
  ],
  icons: {
    icon: '/aidit-favicon.svg',
  },
  authors: [{ name: 'Sandeep Chandran, Vishwas Sharma' }],
  publisher: 'Sandeep Chandran',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
