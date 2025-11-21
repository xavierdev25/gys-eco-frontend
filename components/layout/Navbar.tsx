"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiodegradableIcon } from "../ui/Icon";
import { useState } from "react";
import Button from "../ui/Button";
import { useUIStore } from "@/store/ui.store";

interface NavbarProps {
  onMenuClick?: () => void;
  showMobileMenu?: boolean;
}

export default function Navbar({
  onMenuClick,
  showMobileMenu = true,
}: NavbarProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");
  const { openLoginSheet } = useUIStore();

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/products", label: "Catálogo" },
    { href: "/about", label: "Nosotros" },
    { href: "/contact", label: "Contacto" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <div className="relative flex w-full flex-col bg-[#f6f8f7] overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-2">
          <div className="flex flex-col w-full max-w-6xl flex-1">
            <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#1a4231]/20 px-4 md:px-10 py-3 text-[#1a4231]">
              <div className="flex items-center gap-4 md:gap-8">
                {/* Botón de menú hamburguesa para móvil */}
                {showMobileMenu && (
                  <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 hover:bg-[#1a4231]/10 rounded-lg transition-colors"
                    aria-label="Abrir menú"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="3" y1="12" x2="21" y2="12"></line>
                      <line x1="3" y1="6" x2="21" y2="6"></line>
                      <line x1="3" y1="18" x2="21" y2="18"></line>
                    </svg>
                  </button>
                )}
                <Link
                  href="/"
                  className="flex items-center gap-3 text-[#1a4231] hover:opacity-80 transition-opacity"
                >
                  <BiodegradableIcon />
                  <h2 className="text-lg font-black leading-tight tracking-[-0.015em]">
                    GYS Importplast EIRL
                  </h2>
                </Link>
                <nav className="hidden md:flex items-center gap-9">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`text-sm leading-normal transition-colors hover:text-[#1a4231] ${
                        isActive(link.href)
                          ? "font-bold text-[#1a4231]"
                          : "text-[#1a4231]/70"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-1 justify-end gap-2 md:gap-4 items-center">
                <label className="hidden sm:flex flex-col min-w-40 h-10 max-w-64">
                  <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#1a4231]/10">
                    <div className="text-[#1a4231]/70 flex items-center justify-center pl-3">
                      <svg
                        width="20"
                        height="20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 11.5a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0m-2.107 5.42 3.08 3.08" />
                      </svg>
                    </div>
                    <input
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#1a4231] focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-[#1a4231]/70 pl-2 text-sm font-normal leading-normal"
                      placeholder="Buscar producto..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </label>
                <Button
                  size="md"
                  className="hidden md:flex"
                  onClick={openLoginSheet}
                >
                  Acceder
                </Button>
              </div>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}
