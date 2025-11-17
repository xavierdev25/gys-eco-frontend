import Image from "next/image";

interface MissionVisionCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function MissionVisionCard({
  icon,
  iconAlt,
  title,
  description,
}: MissionVisionCardProps) {
  return (
    <div className="flex flex-1 gap-4 rounded-xl border border-[#13ec71]/20 p-6 flex-col bg-white">
      <Image src={icon} alt={iconAlt} width={35} height={35} />
      <div className="flex flex-col gap-1">
        <h3 className="text-[#0d1b13] text-lg font-bold leading-tight">
          {title}
        </h3>
        <p className="text-[#4c9a6e] text-sm font-normal leading-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
