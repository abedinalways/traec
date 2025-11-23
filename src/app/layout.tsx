/** @format */

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Glory,
  Inter,
  Lexend,
  Manrope,
  Open_Sans,
} from "next/font/google";
import "../styles/globals.css";

const glory = Glory({
  variable: "--font-glory",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
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
  title: "Evoke",
  description: "Event-Planning-Marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${glory.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        <main className='mt-16'>{children}</main>
      </body>
    </html>
  );
}
