"use client";

import Sheet, {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/Sheet";
import { useUIStore } from "@/store/ui.store";
import AuthToggle from "./AuthToggle";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface LoginSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginSheet({ isOpen, onClose }: LoginSheetProps) {
  const { authMode, setAuthMode } = useUIStore();

  return (
    <Sheet isOpen={isOpen} onClose={onClose} side="left">
      <SheetClose onClose={onClose} />

      <SheetHeader>
        <div className="flex items-center gap-3 mb-4">
          <span className="material-symbols-outlined text-[#1B4332] text-3xl">
            eco
          </span>
          <h2 className="text-xl font-bold text-[#1B4332]">GYS Importplast</h2>
        </div>
        <SheetTitle>
          {authMode === "login" ? "Bienvenido de nuevo" : "Crear cuenta"}
        </SheetTitle>
        <SheetDescription>
          {authMode === "login"
            ? "Inicia sesión para continuar."
            : "Regístrate para comenzar a comprar."}
        </SheetDescription>
      </SheetHeader>

      <SheetContent>
        <AuthToggle activeMode={authMode} onModeChange={setAuthMode} />

        {authMode === "login" ? (
          <LoginForm onSwitchToRegister={() => setAuthMode("register")} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setAuthMode("login")} />
        )}
      </SheetContent>
    </Sheet>
  );
}
