interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className = "",
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col gap-8 ${className}`}>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <h1 className="text-[#1B4332] text-4xl sm:text-5xl font-bold leading-tight tracking-tight font-heading">
          {title}
        </h1>
      </div>
      {description && (
        <p className="text-[#525252] text-base font-normal leading-relaxed pb-3 pt-1 px-4">
          {description}
        </p>
      )}
    </div>
  );
}
