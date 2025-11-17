import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "default" | "success" | "warning" | "danger";
  className?: string;
  icon?: ReactNode;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
  icon,
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#1a4231]/80 text-white",
    success: "bg-green-600/80 text-white",
    warning: "bg-yellow-600/80 text-white",
    danger: "bg-red-600/80 text-white",
  };

  return (
    <div
      className={`flex items-center gap-1.5 h-7 px-3 rounded-full backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {icon && (
        <span className="text-base [&_img]:brightness-0 [&_img]:invert">
          {icon}
        </span>
      )}
      <p className="text-xs font-bold">{children}</p>
    </div>
  );
}
