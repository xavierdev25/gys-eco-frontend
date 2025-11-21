"use client";

import { useEffect, useRef, useState } from "react";

interface SheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

export default function Sheet({
  isOpen,
  onClose,
  children,
  side = "right",
  className = "",
}: SheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Small delay to trigger animation
      const timer = setTimeout(() => setMounted(true), 10);
      return () => clearTimeout(timer);
    }

    // Reset mounted state when closing
    const resetTimer = setTimeout(() => setMounted(false), 10);
    return () => clearTimeout(resetTimer);
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen && !mounted) return null;

  const slideDirection =
    side === "right" ? "translate-x-full" : "-translate-x-full";

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 ease-out ${
          isOpen && mounted ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        className={`fixed top-0 ${side}-0 h-full w-full sm:w-[400px] md:w-[500px] bg-white shadow-2xl z-50 transform transition-all duration-300 ease-out px-4 ${
          isOpen && mounted
            ? "translate-x-0 opacity-100 scale-100"
            : `${slideDirection} opacity-0 scale-95`
        } ${className}`}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </>
  );
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function SheetHeader({ children, className = "" }: SheetHeaderProps) {
  return (
    <div className={`px-6 py-4 border-b border-[#d8e1d5] ${className}`}>
      {children}
    </div>
  );
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function SheetTitle({ children, className = "" }: SheetTitleProps) {
  return (
    <h2 className={`text-2xl font-bold text-[#121811] ${className}`}>
      {children}
    </h2>
  );
}

interface SheetDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function SheetDescription({
  children,
  className = "",
}: SheetDescriptionProps) {
  return (
    <p className={`text-sm text-[#68865f] mt-1 ${className}`}>{children}</p>
  );
}

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SheetContent({ children, className = "" }: SheetContentProps) {
  return (
    <div
      className={`px-6 py-6 overflow-y-auto h-[calc(100%-80px)] ${className}`}
    >
      {children}
    </div>
  );
}

interface SheetCloseProps {
  onClose: () => void;
  className?: string;
}

export function SheetClose({ onClose, className = "" }: SheetCloseProps) {
  return (
    <button
      onClick={onClose}
      className={`absolute top-4 right-4 p-2 rounded-lg text-[#68865f] hover:bg-[#f6f8f6] transition-colors ${className}`}
      aria-label="Cerrar"
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
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
  );
}
