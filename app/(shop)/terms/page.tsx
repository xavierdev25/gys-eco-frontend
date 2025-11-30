import ContentSection, {
  ContentParagraph,
} from "@/components/ui/ContentSection";

const termsData = {
  header: {
    title: "Términos y Condiciones",
    subtitle: "Última actualización: 18 de Octubre, 2025",
  },
  sections: [
    {
      id: "introduccion",
      title: "1. Introducción",
      content:
        "Bienvenido a GYS Importplast EIRL. Al acceder y utilizar nuestra plataforma web, usted acepta estar sujeto a los siguientes términos y condiciones. Estos términos rigen su acceso y uso de todos los servicios ofrecidos, incluyendo la compra de nuestros plásticos biodegradables certificados. Por favor, lea este documento detenidamente. Si no está de acuerdo con alguna parte de los términos, no debe utilizar nuestra plataforma.",
    },
    {
      id: "uso-sitio",
      title: "2. Uso del Sitio Web",
      paragraphs: [
        "Usted se compromete a utilizar este sitio web únicamente con fines lícitos y de una manera que no infrinja los derechos de, ni restrinja o inhiba el uso y disfrute de este sitio por parte de terceros. Queda prohibido transmitir cualquier material que sea ilegal, ofensivo, difamatorio, obsceno o que viole cualquier ley.",
        "Nos reservamos el derecho de suspender o cancelar su acceso a nuestra plataforma si consideramos que ha violado cualquiera de estos términos.",
      ],
    },
    {
      id: "proceso-compra",
      title: "3. Proceso de Compra y Pago",
      content:
        "Todos los pedidos están sujetos a disponibilidad y a la aceptación de los mismos por nuestra parte. Los precios de los productos se muestran en el sitio web y pueden cambiar sin previo aviso. El pago se debe realizar en el momento de la compra a través de los métodos de pago disponibles en nuestra plataforma. Nos aseguramos de que todas las transacciones sean seguras.",
    },
    {
      id: "propiedad-intelectual",
      title: "4. Propiedad Intelectual",
      content:
        "Todo el contenido incluido en este sitio, como texto, gráficos, logotipos, imágenes y software, es propiedad de GYS Importplast EIRL o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual. No se permite la reproducción, duplicación, copia, venta o explotación de ninguna parte del servicio sin nuestro expreso consentimiento por escrito.",
    },
    {
      id: "ley-aplicable",
      title: "5. Ley Aplicable y Jurisdicción",
      content:
        "Estos términos y condiciones se regirán e interpretarán de acuerdo con las leyes de Perú. Cualquier disputa que surja en relación con estos términos estará sujeta a la jurisdicción exclusiva de los tribunales de Lima, Perú.",
    },
  ],
};

export default function TermsPage() {
  return (
    <main className="flex-1 w-full px-4 md:px-8 lg:px-16 py-8 md:py-12">
      <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap justify-between gap-4 mb-8">
            <div className="flex flex-col gap-2">
              <h1 className="text-[#1B4332] text-4xl md:text-5xl font-bold leading-tight tracking-tighter">
                {termsData.header.title}
              </h1>
              <p className="text-[#52B788] text-base font-normal leading-normal">
                {termsData.header.subtitle}
              </p>
            </div>
          </div>

          <article className="space-y-8">
            {termsData.sections.map((section) => (
              <ContentSection
                key={section.id}
                title={section.title}
                className="p-0"
              >
                {section.content && (
                  <ContentParagraph className="px-0">
                    {section.content}
                  </ContentParagraph>
                )}
                {section.paragraphs &&
                  section.paragraphs.map((paragraph, index) => (
                    <ContentParagraph
                      key={index}
                      className={`px-0 ${
                        index < section.paragraphs!.length - 1 ? "mb-4" : ""
                      }`}
                    >
                      {paragraph}
                    </ContentParagraph>
                  ))}
              </ContentSection>
            ))}
          </article>
        </div>
      </div>
    </main>
  );
}
