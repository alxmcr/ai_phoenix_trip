import Header from "@/components/sections/header";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Phoenix Trip",
    default: "Phoenix Trip",
  },
  icons: {
    icon: "/logo-phoenix-trip-ai-16x16.svg",
    apple: "/logo-phoenix-trip-ai-16x16.svg",
  },
  openGraph: {
    title: "Phoenix Trip - AI-powered insights from passenger trip experiences",
    description:
      "Get AI-powered insights from passenger trip experiences with sentiment analysis, actionable recommendations, and more.",
    url: "https://ai-phoenix-trip.vercel.app",
    siteName: "Phoenix Trip",
    images: [
      {
        url: "https://ai-phoenix-trip.vercel.app/og.png", // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: "https://ai-phoenix-trip.vercel.app/og-alt.png", // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: "My custom alt",
      },
    ],
    videos: [
      {
        url: "https://ai-phoenix-trip.vercel.app/video.mp4", // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: "https://nextjs.org/audio.mp3", // Must be an absolute URL
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
