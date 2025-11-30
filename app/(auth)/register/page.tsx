"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUIStore } from "@/store/ui.store";

export default function RegisterPage() {
  const router = useRouter();
  const { openLoginSheet } = useUIStore();

  useEffect(() => {
    // Abrir el LoginSheet en modo registro y redirigir a la home
    openLoginSheet("register");
    router.replace("/");
  }, [openLoginSheet, router]);

  return (
    <div className="flex flex-col w-full grow bg-[#FFFFFF] p-8 sm:p-10 lg:p-12 items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B4332]"></div>
        <p className="text-[#68865f] text-base">Redirigiendo...</p>
      </div>
    </div>
  );
}
