"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen w-full">
          {/* Contenido principal */}
          <div className="flex-1 w-full">
            <div className="relative flex min-h-screen w-full flex-col bg-[#f6f8f7] group/design-root overflow-x-hidden">
              <div className="layout-container flex h-full grow flex-col">
                <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
                  <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
