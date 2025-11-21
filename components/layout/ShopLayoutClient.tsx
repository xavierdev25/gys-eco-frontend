"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import LoginSheet from "@/components/auth/LoginSheet";
import { useResponsive } from "@/hooks/useResponsive";
import { useUIStore } from "@/store/ui.store";

export default function ShopLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { isMobile } = useResponsive();
  const { isLoginSheetOpen, closeLoginSheet } = useUIStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Navbar onMenuClick={toggleSidebar} showMobileMenu={isMobile} />

      {/* Sidebar - solo visible en móvil como drawer */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Login Sheet */}
      <LoginSheet isOpen={isLoginSheetOpen} onClose={closeLoginSheet} />

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
    </>
  );
}
