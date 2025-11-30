"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";
import { useAuthStore } from "@/store/auth.store";
import { useUIStore } from "@/store/ui.store";

interface RegisterFormProps {
  onSwitchToLogin: () => void;
}

export default function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { register, login, isLoading, error, clearError } = useAuthStore();
  const { closeLoginSheet } = useUIStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();
    setLocalError(null);
    setSuccessMessage(null);

    if (password !== confirmPassword) {
      setLocalError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setLocalError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      // Registrar usuario
      const name = `${firstName} ${lastName}`.trim();
      await register({ email, password, name: name || undefined });
      
      setSuccessMessage("¡Cuenta creada exitosamente! Iniciando sesión...");
      
      // Auto-login después del registro
      try {
        await login({ email, password });
        closeLoginSheet();
      } catch {
        // Si el auto-login falla, redirigir a login
        onSwitchToLogin();
      }
    } catch {
      // El error se maneja en el store
      console.log("Error de registro capturado");
    }
  };

  const handleGoogleRegister = () => {
    console.log("Google register attempt");
    // TODO: Implementar OAuth con Google
  };

  const displayError = localError || error;

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      {displayError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {displayError}
        </div>
      )}
      
      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {successMessage}
        </div>
      )}

      <AuthInput
        label="Nombres"
        icon="/icons/users.svg"
        type="text"
        placeholder="Juan"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
        disabled={isLoading}
      />

      <AuthInput
        label="Apellidos"
        icon="/icons/users.svg"
        type="text"
        placeholder="Pérez"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
        disabled={isLoading}
      />

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

      <AuthInput
        label="Confirmar Contraseña"
        icon="/icons/lock.svg"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        showPassword={showConfirmPassword}
        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
        required
        disabled={isLoading}
      />

      <AuthButton type="submit" className="mt-4" disabled={isLoading}>
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
            Creando cuenta...
          </span>
        ) : (
          "Crear Cuenta"
        )}
      </AuthButton>

      <AuthDivider />

      <AuthButton 
        type="button" 
        variant="google" 
        onClick={handleGoogleRegister}
        disabled={isLoading}
      >
        <Image
          alt="Google logo"
          className="w-5 h-5 mr-3"
          src="https://lh3.googleusercontent.com/COxitqgJr1sJnIDe8-jiKhxDx1FrYbtRHKJ9z_hELisAlapwE9LUPh6fcXIfb5vwpbMl4xl9H9TRFPc5NOO8Sb3VSgIBrfRYvW6cUA"
          width={20}
          height={20}
        />
        Registrarse con Google
      </AuthButton>

      <p className="text-[#68865f] text-sm font-normal leading-normal pt-6 text-center">
        ¿Ya tienes una cuenta?{" "}
        <button
          type="button"
          className="font-bold text-[#1B4332] hover:underline"
          onClick={onSwitchToLogin}
          disabled={isLoading}
        >
          Inicia sesión aquí
        </button>
      </p>
    </form>
  );
}
