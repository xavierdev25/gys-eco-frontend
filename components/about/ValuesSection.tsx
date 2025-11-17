import ValueCard from "./ValueCard";

const values = [
  {
    icon: "/icons/flower.svg",
    iconAlt: "Flower icon",
    title: "Sostenibilidad",
    description:
      "Nuestro núcleo es el respeto por el planeta, promoviendo un ciclo de vida responsable.",
  },
  {
    icon: "/icons/medal.svg",
    iconAlt: "Medal icon",
    title: "Calidad",
    description:
      "Garantizamos productos que cumplen con los más altos estándares internacionales.",
  },
  {
    icon: "/icons/light.svg",
    iconAlt: "Light icon",
    title: "Innovación",
    description:
      "Buscamos constantemente nuevas y mejores formas de crear soluciones ecológicas.",
  },
  {
    icon: "/icons/hand.svg",
    iconAlt: "Hand icon",
    title: "Compromiso",
    description:
      "Construimos relaciones de confianza y colaboración con nuestros clientes y socios.",
  },
];

export default function ValuesSection() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-[#1B4332] text-3xl font-bold leading-tight tracking-[-0.015em]">
          Nuestros Valores
        </h2>
        <p className="text-[#0d1b13]/80 text-base font-normal leading-relaxed max-w-2xl">
          Son los pilares que guían cada una de nuestras decisiones y acciones,
          asegurando que avanzamos juntos hacia un futuro más sostenible.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {values.map((value, index) => (
          <ValueCard
            key={index}
            icon={value.icon}
            iconAlt={value.iconAlt}
            title={value.title}
            description={value.description}
          />
        ))}
      </div>
    </div>
  );
}
