import Image from "next/image";

interface ContactItem {
  icon: string;
  alt: string;
  text: string;
}

interface ContactBoxProps {
  title: string;
  description: string;
  contacts: ContactItem[];
  className?: string;
}

export default function ContactBox({
  title,
  description,
  contacts,
  className = "",
}: ContactBoxProps) {
  return (
    <div
      className={`mt-8 mb-12 p-6 bg-[#1B4332]/10 rounded-xl border border-[#1B4332]/20 ${className}`}
    >
      <h3 className="text-xl font-bold text-[#1B4332] font-heading mb-2">
        {title}
      </h3>
      <p className="text-[#525252] mb-4">{description}</p>
      <div className="space-y-2">
        {contacts.map((contact, index) => (
          <p key={index} className="flex items-center gap-3 text-[#111815]">
            <Image
              src={contact.icon}
              alt={contact.alt}
              width={24}
              height={24}
            />
            <span>{contact.text}</span>
          </p>
        ))}
      </div>
    </div>
  );
}
