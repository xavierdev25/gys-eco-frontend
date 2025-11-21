"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

export default function LoginForm({ onSwitchToRegister }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
    // Aquí irá la lógica de autenticación
  };

  const handleGoogleLogin = () => {
    console.log("Google login attempt");
    // Aquí irá la lógica de login con Google
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <AuthInput
        label="Correo Electrónico"
        icon="/icons/mail.svg"
        type="email"
        placeholder="tu.correo@ejemplo.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
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
      />

      <div className="flex items-center justify-between mt-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            className="form-checkbox h-4 w-4 rounded border-[#d8e1d5] bg-[#f6f8f6] text-[#1B4332] focus:ring-[#1B4332]/50"
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <span className="text-sm text-[#121811]">Recordar contraseña</span>
        </label>
        <button
          type="button"
          className="text-sm font-medium text-[#1B4332] hover:underline"
        >
          ¿Olvidé mi contraseña?
        </button>
      </div>

      <AuthButton type="submit" className="mt-4">
        Iniciar Sesión
      </AuthButton>

      <AuthDivider />

      <AuthButton type="button" variant="google" onClick={handleGoogleLogin}>
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
        >
          Regístrate aquí
        </button>
      </p>
    </form>
  );
}
