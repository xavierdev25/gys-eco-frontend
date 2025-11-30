import { ButtonHTMLAttributes } from "react";

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "google";
  children: React.ReactNode;
}

export default function AuthButton({
  variant = "primary",
  children,
  className = "",
  ...props
}: AuthButtonProps) {
  const baseStyles =
    "flex items-center justify-center w-full font-medium h-12 px-6 rounded-lg text-base leading-normal transition-colors duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variantStyles = {
    primary:
      "bg-[#1B4332] text-white font-bold hover:bg-[#1B4332]/90 focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4332]",
    google:
      "bg-transparent text-[#121811] border border-[#d8e1d5] hover:bg-[#f6f8f6]",
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
