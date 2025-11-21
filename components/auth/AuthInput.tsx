import { InputHTMLAttributes, forwardRef } from "react";
import Image from "next/image";

interface AuthInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: string;
  error?: string;
  onTogglePassword?: () => void;
  showPassword?: boolean;
}

const AuthInput = forwardRef<HTMLInputElement, AuthInputProps>(
  (
    {
      label,
      icon,
      error,
      onTogglePassword,
      showPassword,
      type,
      className = "",
      ...props
    },
    ref
  ) => {
    const isPassword = type === "password" || (type === "text" && onTogglePassword);

    return (
      <label className="flex flex-col w-full">
        <p className="text-[#121811] text-sm font-medium leading-normal pb-2">
          {label}
        </p>
        <div className="relative items-center flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#121811] focus-within:ring-2 focus-within:ring-[#1B4332]/50 border border-[#d8e1d5] bg-[#f6f8f6] focus-within:border-[#1B4332] h-12 placeholder:text-[#68865f] pl-4 pr-2 py-3 text-base font-normal leading-normal gap-4">
          {icon && (
            <Image
              src={icon}
              alt={`${label} icon`}
              width={20}
              height={20}
              className="w-5 h-5"
            />
          )}
          <input
            ref={ref}
            type={isPassword && !showPassword ? "password" : "text"}
            className={`form-input border-none outline-0 bg-transparent w-full ${className}`}
            {...props}
          />
          {isPassword && onTogglePassword && (
            <button
              aria-label={
                showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
              }
              className="text-[#68865f] hover:text-[#1B4332] transition-colors"
              type="button"
              onClick={onTogglePassword}
            >
              <Image
                src={showPassword ? "/icons/eye.svg" : "/icons/eye_off.svg"}
                alt="Eye icon"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </button>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </label>
    );
  }
);

AuthInput.displayName = "AuthInput";

export default AuthInput;
