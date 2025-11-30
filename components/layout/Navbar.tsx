"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { BiodegradableIcon } from "../ui/Icon";
import { useState } from "react";
import Button from "../ui/Button";
import { useUIStore } from "@/store/ui.store";
import { useAuthStore } from "@/store/auth.store";
import { useCartStore } from "@/store/cart.store";

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
  const { isAuthenticated, user, logout, checkAuth } = useAuthStore();
  const { itemCount, loadCart, toggleCart } = useCartStore();

  // Verificar autenticación y cargar carrito al montar
  useEffect(() => {
    checkAuth();
    loadCart();
  }, [checkAuth, loadCart]);

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

  const handleLogout = () => {
    logout();
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
                {/* Buscador */}
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

                {/* Botón de Carrito */}
                <button
                  onClick={toggleCart}
                  className="relative p-2 text-[#1a4231] hover:bg-[#1a4231]/5 rounded-lg transition-colors"
                  aria-label="Ver carrito"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#1B4332] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </button>

                {/* Auth Buttons */}
                {isAuthenticated ? (
                  <div className="hidden md:flex items-center gap-3">
                    <span className="text-sm text-[#1a4231]/70">
                      Hola, {user?.name || user?.email?.split("@")[0] || "Usuario"}
                    </span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleLogout}
                    >
                      Salir
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="md"
                    className="hidden md:flex"
                    onClick={() => openLoginSheet()}
                  >
                    Acceder
                  </Button>
                )}
              </div>
            </header>
          </div>
        </div>
      </div>
    </div>
  );
}
