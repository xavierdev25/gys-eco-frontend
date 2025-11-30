import PageHeader from "@/components/ui/PageHeader";
import ContentSection, {
  ContentParagraph,
  ContentList,
} from "@/components/ui/ContentSection";
import ContactBox from "@/components/ui/ContactBox";

const privacyData = {
  header: {
    title: "Política de Privacidad",
    description:
      "Última actualización: 24 de Julio, 2025. En GYS Importplast EIRL, estamos comprometidos con la protección de su privacidad. Esta política detalla cómo recopilamos, utilizamos, protegemos y gestionamos su información personal.",
  },
  sections: [
    {
      title: "1. Información que Recopilamos",
      intro:
        "Recopilamos varios tipos de información en relación con los servicios que prestamos, incluyendo:",
      items: [
        <>
          <strong>Información de identificación personal:</strong> Nombre,
          dirección de correo electrónico, número de teléfono, dirección de
          envío.
        </>,
        <>
          <strong>Información de contacto:</strong> Datos para procesar pedidos,
          responder a consultas y ofrecer soporte al cliente.
        </>,
        <>
          <strong>Datos de navegación:</strong> Información recopilada a través
          de cookies y tecnologías similares para mejorar su experiencia en
          nuestro sitio web y analizar el tráfico.
        </>,
      ],
    },
    {
      title: "2. Cómo Utilizamos Su Información",
      intro:
        "Utilizamos la información que recopilamos para diversos fines, tales como:",
      items: [
        "Procesar y gestionar sus pedidos y pagos.",
        "Comunicarnos con usted sobre su cuenta o transacciones.",
        "Proporcionar servicio al cliente y soporte técnico.",
        "Enviar comunicaciones de marketing, con su consentimiento previo.",
        "Mejorar y personalizar nuestro sitio web y servicios.",
      ],
    },
    {
      title: "3. Cómo Protegemos Sus Datos",
      content:
        "Implementamos una variedad de medidas de seguridad para mantener la seguridad de su información personal. Sus datos personales están contenidos detrás de redes seguras y solo son accesibles por un número limitado de personas que tienen derechos especiales de acceso a dichos sistemas y están obligadas a mantener la confidencialidad de la información.",
    },
    {
      title: "4. Sus Derechos de Privacidad",
      content:
        "Usted tiene derecho a acceder, corregir, actualizar o solicitar la eliminación de su información personal. Si desea ejercer alguno de estos derechos, puede contactarnos a través de la información proporcionada a continuación.",
    },
    {
      title: "5. Cambios a Esta Política",
      content:
        "Nos reservamos el derecho de modificar esta política de privacidad en cualquier momento. Le notificaremos sobre cualquier cambio publicando la nueva política en esta página. Le recomendamos que revise esta política periódicamente para estar informado de cualquier cambio.",
    },
  ],
  contact: {
    title: "Contáctenos",
    description:
      "Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos:",
    items: [
      {
        icon: "/icons/mail.svg",
        alt: "Mail icon",
        text: "privacidad@gysimportplast.com",
      },
      {
        icon: "/icons/call.svg",
        alt: "Phone icon",
        text: "+51 987 654 321",
      },
      {
        icon: "/icons/location.svg",
        alt: "Location icon",
        text: "Av. Principal 123, Lima, Perú",
      },
    ],
  },
};

export default function PolicyPage() {
  return (
    <main className="flex flex-col gap-8 px-4">
      <PageHeader
        title={privacyData.header.title}
        description={privacyData.header.description}
      />

      {privacyData.sections.map((section, index) => (
        <ContentSection key={index} title={section.title}>
          {section.intro && (
            <ContentParagraph>{section.intro}</ContentParagraph>
          )}
          {section.items && <ContentList items={section.items} />}
          {section.content && (
            <ContentParagraph>{section.content}</ContentParagraph>
          )}
        </ContentSection>
      ))}

      <ContactBox
        title={privacyData.contact.title}
        description={privacyData.contact.description}
        contacts={privacyData.contact.items}
      />
    </main>
  );
}
