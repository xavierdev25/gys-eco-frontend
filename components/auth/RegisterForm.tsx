"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import AuthDivider from "./AuthDivider";

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    console.log("Register attempt:", {
      firstName,
      lastName,
      email,
      password,
    });
    // Aquí irá la lógica de registro
  };

  const handleGoogleRegister = () => {
    console.log("Google register attempt");
    // Aquí irá la lógica de registro con Google
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <AuthInput
        label="Nombres"
        icon="/icons/users.svg"
        type="text"
        placeholder="Juan"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <AuthInput
        label="Apellidos"
        icon="/icons/users.svg"
        type="text"
        placeholder="Pérez"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />

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
      />

      <AuthButton type="submit" className="mt-4">
        Crear Cuenta
      </AuthButton>

      <AuthDivider />

      <AuthButton type="button" variant="google" onClick={handleGoogleRegister}>
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
        >
          Inicia sesión aquí
        </button>
      </p>
    </form>
  );
}
