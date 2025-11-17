import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "flex cursor-pointer items-center justify-center overflow-hidden rounded-lg font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-row";

  const variantStyles = {
    primary: "bg-[#1a4231] text-white hover:bg-[#1a4231]/90",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
    outline: "bg-[#1a4231]/10 text-[#1a4231] hover:bg-[#1a4231]/20",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  const sizeStyles = {
    sm: "h-10 px-4 text-sm tracking-[0.015em]",
    md: "h-10 px-6 text-sm tracking-[0.015em]",
    lg: "h-12 px-8 text-base",
  };

  const widthStyle = fullWidth ? "w-full" : "min-w-[84px] max-w-[480px]";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Cargando...
        </span>
      ) : (
        <span className="truncate">{children}</span>
      )}
    </button>
  );
}
