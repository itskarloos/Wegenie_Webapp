import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { SpeedInsights } from '@vercel/speed-insights/next';

const poppins = Poppins({ subsets: ["latin"], weight : ['400','500','600','700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Wegenie",
  description: "Start Cultivating Hope, Change Life's, Impact The World Now!",
  icons:{icon:'/assets/images/Logo.svg'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body className={poppins.className}>{children}<SpeedInsights /></body>
    </html>
    </ClerkProvider>
  );
}
