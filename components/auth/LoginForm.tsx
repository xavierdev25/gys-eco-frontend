"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const { login, isLoading, error, clearError } = useAuthStore();
  const { closeLoginSheet } = useUIStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    
    try {
      await login({ email, password });
      // Login exitoso - cerrar el sheet
      closeLoginSheet();
    } catch {
      // El error ya se maneja en el store
      console.log("Error de login capturado");
    }
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempt");
    // TODO: Implementar OAuth con Google
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}
      
      <AuthInput
        label="Correo Electrónico"
        icon="/icons/mail.svg"
        type="email"
        placeholder="tu.correo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />

      <AuthInput
        label="Contraseña"
        icon="/icons/lock.svg"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showPassword={showPassword}
        onTogglePassword={() => setShowPassword(!showPassword)}
        required
        disabled={isLoading}
      />

      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            className="form-checkbox h-4 w-4 rounded border-[#d8e1d5] bg-[#f6f8f6] text-[#1B4332] focus:ring-[#1B4332]/50"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            disabled={isLoading}
          />
          <span className="text-sm text-[#121811]">Recordar contraseña</span>
        </label>
        <button
          type="button"
          className="text-sm font-medium text-[#1B4332] hover:underline"
          disabled={isLoading}
        >
          ¿Olvidé mi contraseña?
        </button>
      </div>

      <AuthButton type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            Iniciando sesión...
          </span>
        ) : (
          "Iniciar Sesión"
        )}
      </AuthButton>

      <AuthDivider />

      <AuthButton 
        type="button" 
        variant="google" 
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <Image
          alt="Google logo"
          className="w-5 h-5 mr-3"
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          width={20}
          height={20}
        />
        Iniciar sesión con Google
      </AuthButton>

      <p className="text-[#68865f] text-sm font-normal leading-normal pt-6 text-center">
        ¿No tienes una cuenta?{" "}
        <button
          type="button"
          className="font-bold text-[#1B4332] hover:underline"
          onClick={onSwitchToRegister}
          disabled={isLoading}
        >
          Regístrate aquí
        </button>
      </p>
    </form>
  );
}
