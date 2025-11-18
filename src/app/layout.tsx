import type { Metadata } from "next";
import { Geist, Geist_Mono, Glory, Inter } from "next/font/google";
import '../styles/globals.css'
import Navbar from "@/components/reusable/Navbar";

const glory= Glory({
  variable: "--font-glory",
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Evoke',
  description: 'Event-Planning-Marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${glory.variable} ${geistMono.variable} ${inter.variable} antialiased`}
      >
        <Navbar/>
        <main className="">{children}</main>

      </body>
    </html>
  );
}
