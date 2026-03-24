import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
  title: 'Transit Platform - Smart Kathmandu Transport',
  description: 'Navigate Kathmandu Valley microbus and tempo network with ease',
  viewport: 'width=device-width, initial-scale=1.0, viewport-fit=cover',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        <main className="pb-safe">{children}</main>
      </body>
    </html>
  );
}
