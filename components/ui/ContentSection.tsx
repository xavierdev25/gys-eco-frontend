import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export default function ContentSection({
  title,
  children,
  className = "",
}: ContentSectionProps) {
  return (
    <section className={className}>
      <h2 className="text-[#1B4332] text-2xl font-bold leading-tight tracking-tight px-4 pb-3 pt-5 mb-3">
        {title}
      </h2>
      {children}
    </section>
  );
}

interface ContentParagraphProps {
  children: ReactNode;
  className?: string;
}

export function ContentParagraph({
  children,
  className = "",
}: ContentParagraphProps) {
  return (
    <p
      className={`text-[#111815] text-base font-normal leading-relaxed pb-3 pt-1 px-4 ${className}`}
    >
      {children}
    </p>
  );
}

interface ContentListProps {
  items: ReactNode[];
  className?: string;
}

export function ContentList({ items, className = "" }: ContentListProps) {
  return (
    <ul
      className={`list-disc list-inside space-y-2 px-8 text-[#111815] leading-relaxed ${className}`}
    >
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
