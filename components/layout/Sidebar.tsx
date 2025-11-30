"use client";

import { BiodegradableIcon } from "../ui/Icon";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({
  isOpen = true,
  onClose,
  isMobile = false,
}: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Inicio", icon: "/icons/home.svg" },
    { href: "/products", label: "Catálogo", icon: "/icons/category.svg" },
    { href: "/about", label: "Nosotros", icon: "/icons/users.svg" },
    { href: "/contact", label: "Contacto", icon: "/icons/mail.svg" },
  ];

  const footerLinks = [
    {
      href: "/terms",
      label: "Términos y Condiciones",
      icon: "/icons/document.svg",
    },
    {
      href: "/policy",
      label: "Política de Privacidad",
      icon: "/icons/shield.svg",
    },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (isMobile && onClose) {
      onClose();
    }
  };

  if (!isMobile || !isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col h-screen w-64 bg-white
          p-4 border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 px-3 py-2">
              <BiodegradableIcon />
              <h2 className="text-lg font-black leading-tight tracking-[-0.015em]">
                GYS Importplast EIRL
              </h2>
            </div>
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className={`
                    flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${
                      isActive(item.href)
                        ? "bg-[#1a4231]/10 text-[#1a4231]"
                        : "text-gray-700  hover:bg-[#1a4231]/5 hover:text-[#1a4231] "
                    }
                  `}
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <p className="text-sm font-medium leading-normal">
                    {item.label}
                  </p>
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-4">
            <div className="border-t border-gray-200"></div>
            <nav className="flex flex-col gap-1">
              {footerLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleLinkClick}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700  hover:bg-[#1a4231]/5 hover:text-[#1a4231] transition-colors"
                >
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  <p className="text-sm font-medium leading-normal">
                    {item.label}
                  </p>
                </Link>
              ))}
            </nav>
            <Link
              href="/login"
              onClick={handleLinkClick}
              className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-[#1a4231] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#1a4231]/90  transition-colors"
            >
              <span className="truncate">Login / Registro</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
