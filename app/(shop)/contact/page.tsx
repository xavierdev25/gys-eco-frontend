import Image from "next/image";
import { SectionHeader } from "@/components/ui/Section";
import Button from "@/components/ui/Button";
import ContactFormComponent from "@/components/forms/ContactFormComponent";
import ContactInfoCard from "@/components/forms/ContactInfoCard";

export default function ContactPage() {
  const contactInfo = [
    {
      icon: "/icons/mail.svg",
      title: "Correo Electrónico",
      content: "ventas@gysimportplast.com",
      alt: "Mail icon",
    },
    {
      icon: "/icons/call.svg",
      title: "Teléfono",
      content: "+51 987 654 321",
      alt: "Phone icon",
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-4 text-center mb-12 md:mb-16 py-6">
        <SectionHeader
          title="Hablemos de tu proyecto"
          description="Completa el formulario para solicitar una cotización o escríbenos directamente a través de nuestros canales de contacto. Estaremos encantados de ayudarte a encontrar la solución biodegradable perfecta para tu empresa."
          align="center"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-16">
        <div className="lg:col-span-2 flex flex-col gap-8">
          <h3 className="text-2xl font-bold tracking-tight text-[#1a4231]">
            Información de Contacto
          </h3>

          <div className="flex flex-col gap-4">
            {contactInfo.map((info, index) => (
              <ContactInfoCard
                key={index}
                icon={info.icon}
                title={info.title}
                content={info.content}
                alt={info.alt}
              />
            ))}
          </div>

          <div className="border-t border-[#eaf0ee] pt-8 flex flex-col gap-4">
            <p className="text-[#5f8676] text-sm">
              ¿Prefieres una respuesta más rápida?
            </p>
            <Button variant="outline" fullWidth>
              <div className="flex gap-2">
                <Image
                  src="/icons/sms.svg"
                  alt="WhatsApp icon"
                  width={24}
                  height={24}
                />
                <span>Contactar por WhatsApp</span>
              </div>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <ContactFormComponent />
        </div>
      </div>
    </div>
  );
}
