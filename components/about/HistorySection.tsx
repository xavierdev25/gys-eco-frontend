import TimelineItem from "./TimelineItem";

const timelineEvents = [
  {
    icon: "/icons/buildings.svg",
    iconAlt: "Building icon",
    title: "Fundación de GYS Importplast",
    year: "2018",
  },
  {
    icon: "/icons/check.svg",
    iconAlt: "Check icon",
    title: "Primera Certificación Obtenida",
    year: "2020",
  },
  {
    icon: "/icons/build.svg",
    iconAlt: "Build icon",
    title: "Expansión de Línea de Productos",
    year: "2022",
  },
];

export default function HistorySection() {
  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="px-4 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-[#1B4332] text-3xl font-bold leading-tight tracking-[-0.015em]">
              Nuestra Historia
            </h2>
            <p className="text-[#0d1b13]/80 text-base font-normal leading-relaxed">
              Desde nuestra fundación, hemos crecido con un propósito claro:
              marcar la diferencia. Cada hito en nuestro camino refleja nuestro
              compromiso con la sostenibilidad y la excelencia.
            </p>
          </div>
          <div className="lg:col-span-2">
            <div className="grid grid-cols-[40px_1fr] gap-x-4">
              {timelineEvents.map((event, index) => (
                <TimelineItem
                  key={index}
                  icon={event.icon}
                  iconAlt={event.iconAlt}
                  title={event.title}
                  year={event.year}
                  isLast={index === timelineEvents.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
