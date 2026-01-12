import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSansBengali = Noto_Sans_Bengali({
  variable: "--font-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Borno AI - AI-Powered Learning Platform",
  description:
    "Transform your learning experience with AI-powered tools for Bangla education",
  icons: {
    icon: [
      { url: "/borno.png" },
      { url: "/borno.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/borno.png",
    shortcut: "/borno.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSansBengali.variable} antialiased`}
      >
        <ClerkProvider>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
