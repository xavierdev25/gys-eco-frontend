"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Sidebar from "../../components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import { useResponsive } from "@/hooks/useResponsive";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <html lang="es">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar onMenuClick={toggleSidebar} showMobileMenu={isMobile} />

        {/* Sidebar - solo visible en móvil como drawer */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          isMobile={isMobile}
        />

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
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
