import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


const poppins = Poppins({ subsets: ["latin"], weight : ['400','500','600','700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: "Mela",
  description: "Mela is a place where you figure things out",
  icons:{icon:'/assets/images/logo.svg'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
    <html lang="en">
      <body className={poppins.className}>{children}</body>
    </html>
    </ClerkProvider>
  );
}
