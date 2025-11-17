import { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
  containerQuery?: boolean;
}

export default function Section({
  children,
  className = "",
  containerQuery = true,
}: SectionProps) {
  return (
    <section className={`${containerQuery ? "@container" : ""} ${className}`}>
      {children}
    </section>
  );
}

interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  description,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const alignStyles = {
    left: "text-left",
    center: "text-center items-center mx-auto",
  };

  return (
    <div
      className={`flex flex-col gap-2 ${
        align === "left" ? "min-w-72" : "max-w-3xl"
      } ${alignStyles[align]} ${className}`}
    >
      <h2
        className={`font-bold leading-none tracking-[-0.033em] text-[#1a4231] ${
          align === "center" ? "text-4xl md:text-5xl" : "text-3xl md:text-4xl"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`leading-normal text-[#5f8676] ${
            align === "center"
              ? "text-base md:text-lg font-normal"
              : "text-base font-normal text-[#1a4231]/80"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
