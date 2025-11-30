import Image from "next/image";

interface ContactInfoCardProps {
  icon: string;
  title: string;
  content: string;
  alt?: string;
}

export default function ContactInfoCard({
  icon,
  title,
  content,
  alt = "Contact icon",
}: ContactInfoCardProps) {
  return (
    <div className="flex items-center gap-4 bg-[#f6f8f7] p-4 min-h-[72px] justify-between border border-[#eaf0ee] rounded-xl">
      <div className="flex items-center gap-4">
        <div className="text-[#111815] flex items-center justify-center rounded-lg bg-[#1a4231]/10 shrink-0 size-12">
          <Image src={icon} alt={alt} width={30} height={30} />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-base font-bold leading-normal line-clamp-1 text-[#1a4231]">
            {title}
          </p>
          <p className="text-[#5f8676] text-sm font-normal leading-normal line-clamp-2">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
}
