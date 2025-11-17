import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "bordered" | "elevated";
  padding?: "sm" | "md" | "lg";
}

export default function Card({
  children,
  className = "",
  variant = "default",
  padding = "md",
}: CardProps) {
  const baseStyles = "rounded-xl bg-white";

  const variantStyles = {
    default: "bg-transparent",
    bordered: "border border-slate-200",
    elevated: "shadow-md",
  };

  const paddingStyles = {
    sm: "p-3",
    md: "p-4",
    lg: "p-6",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
}

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  className = "",
}: FeatureCardProps) {
  return (
    <Card
      variant="bordered"
      className={`flex flex-1 flex-col gap-3 border-[#1a4231]/20 ${className}`}
    >
      <div className="text-[#1a4231]">{icon}</div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold leading-tight text-slate-900">
          {title}
        </h3>
        <p className="text-sm font-normal leading-normal text-slate-600">
          {description}
        </p>
      </div>
    </Card>
  );
}
