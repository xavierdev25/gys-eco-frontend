import MissionVisionCard from "./MissionVisionCard";

export default function MissionVisionSection() {
  return (
    <div className="py-16 sm:py-24 px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="flex flex-col gap-10 @container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-[#1B4332] tracking-light text-3xl font-bold leading-tight sm:text-4xl">
              Nuestra Misión y Visión
            </h2>
            <p className="text-[#0d1b13]/80 text-base font-normal leading-relaxed">
              Impulsamos un cambio positivo a través de plásticos biodegradables
              certificados, comprometidos con la calidad, la innovación y la
              protección de nuestro planeta para las futuras generaciones.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <MissionVisionCard
              icon="/icons/rocket.svg"
              iconAlt="Rocket icon"
              title="Misión"
              description="Ofrecer al mercado soluciones en plásticos biodegradables de la más alta calidad, contribuyendo activamente a la reducción del impacto ambiental."
            />
            <MissionVisionCard
              icon="/icons/eye.svg"
              iconAlt="Eye icon"
              title="Visión"
              description="Ser la empresa líder en el suministro de materiales sostenibles en la región, reconocida por nuestra innovación y compromiso con el medio ambiente."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
