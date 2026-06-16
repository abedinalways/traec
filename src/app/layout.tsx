/** @format */

import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Glory,
  Inter,
  
  Open_Sans,
  Playfair_Display,
  
} from "next/font/google";
import "./styles/globals.css";
import localFont from "next/font/local";
import { AuthModalProvider } from "./context/AuthModalContext";
import ReduxProvider from "./ReduxProvider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";



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

// const manrope = Manrope({
//   variable: "--font-manrope",
//   subsets: ["latin"],
// });

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

// const lexend = Lexend({
//   variable: "--font-lexend",
//   subsets: ["latin"],
// });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
}); 

const brittney = localFont({
  src: [
    {
      path: "../../public/fonts/Britney-Bold.otf",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-brittney",
  display: "swap",
});
const brittney_regular = localFont({
  src: [
    {
      path: "../../public/fonts/Britney-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-brittney_regular",
  display: "swap",
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
    <html lang="en">
      <body
        className={`${geistSans.variable} ${glory.variable} ${openSans.variable} ${geistMono.variable} ${inter.variable} ${brittney.variable} ${brittney_regular.variable} antialiased`}
      >
        <ReduxProvider>
          <main className="mt-16">
            <Suspense fallback={<div>Loading...</div>}>
              <AuthModalProvider>{children}</AuthModalProvider>
            </Suspense>
          </main>

          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={3000}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
