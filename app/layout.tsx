import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const DistriboFont = localFont({
  src: [
    {
      path: "../lib/fonts/Distribo-Light.woff2",
      weight: "300",
    },
    {
      path: "../lib/fonts/Distribo-Normal.woff2",
      weight: "400",
    },
    {
      path: "../lib/fonts/Distribo-Medium.woff2",
      weight: "500",
    },
    {
      path: "../lib/fonts/Distribo-Bold.woff2",
      weight: "700",
    },
  ],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Distribo",
  description: "Official Application of Distribo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={DistriboFont.className}>
          <Toaster position="top-center" />
          {children}
      </body>
    </html>
  );
}
