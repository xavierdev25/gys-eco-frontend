import Image from "next/image";

interface TimelineItemProps {
  icon: string;
  iconAlt: string;
  title: string;
  year: string;
  isLast?: boolean;
}

export default function TimelineItem({
  icon,
  iconAlt,
  title,
  year,
  isLast = false,
}: TimelineItemProps) {
  return (
    <>
      <div
        className={`flex flex-col items-center gap-2 ${
          isLast ? "pb-3" : "pt-3"
        }`}
      >
        {!isLast && <div className="w-0.5 bg-[#13ec71]/20 h-2"></div>}
        <div className="flex items-center justify-center size-10 rounded-full bg-[#13ec71]/20 text-[#1B4332]">
          <Image src={icon} alt={iconAlt} width={24} height={24} />
        </div>
        {!isLast && <div className="w-0.5 bg-[#13ec71]/20 grow"></div>}
      </div>
      <div className={`flex flex-1 flex-col ${isLast ? "pt-3" : "pb-8 pt-3"}`}>
        <p className="text-[#0d1b13] text-base font-medium leading-normal">
          {title}
        </p>
        <p className="text-[#4c9a6e] text-base font-normal leading-normal">
          {year}
        </p>
      </div>
    </>
  );
}
