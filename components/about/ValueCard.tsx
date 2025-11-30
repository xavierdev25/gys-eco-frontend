import Image from "next/image";

interface ValueCardProps {
  icon: string;
  iconAlt: string;
  title: string;
  description: string;
}

export default function ValueCard({
  icon,
  iconAlt,
  title,
  description,
}: ValueCardProps) {
  return (
    <div className="flex flex-col items-center text-center gap-3 rounded-xl border border-[#13ec71]/20 bg-white p-6">
      <Image src={icon} alt={iconAlt} width={40} height={40} />
      <h3 className="text-[#0d1b13] text-lg font-bold">{title}</h3>
      <p className="text-[#4c9a6e] text-sm">{description}</p>
    </div>
  );
}
