import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GYS Eco - Innovación y sostenibilidad en cada empaque",
  description:
    "Ayudamos a los negocios a ser más sostenibles a través de nuestros productos certificados, ofreciendo soluciones de empaque que cuidan el planeta.",
  keywords: [
    "empaques ecológicos",
    "biodegradable",
    "sostenibilidad",
    "certificación europea",
  ],
};

// Componentes internos optimizados
const HeroSection = () => (
  <section className="@container">
    <div className="flex flex-col gap-6 px-4 py-10 md:flex-row">
      <div className="flex flex-col gap-6 md:flex-1">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-5xl font-semibold leading-none tracking-[-0.033em] text-slate-900">
            Innovación y sostenibilidad en cada empaque
          </h1>
          <h2 className="text-lg font-light leading-normal text-slate-700">
            Ayudamos a los negocios a ser más sostenibles a través de nuestros
            productos certificados, ofreciendo soluciones de empaque que cuidan
            el planeta.
          </h2>
        </div>
        <Link
          href="/products"
          className="flex h-12 min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg bg-[#1a4231] text-lg leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#1a4231]/90"
        >
          <span className="truncate">Ver catálogo</span>
        </Link>
      </div>
      <div className="relative aspect-video w-full overflow-hidden rounded-xl md:flex-1">
        <Image
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdZxjlvSJASTfGYVTW7U69f_4o-1jnwIPpYfb-AoKNwzcsu2xdT9yQjcj8NU6VmCHTlXd1sha7z5ti5CBsR4fw6rCguZX6oXaApUXcSSbHKf8eAzUcNyfYuwXbGMlqWqsYENNIQFLC5pQyLLFQV3NX-Wysy7quWHTrLiqp6xPCRjhZlvpDG2OJ1TK5LMjX65b0TXwFXoHS6KHGQaG-EygIHx-vUSlr64MdSy3LG20D0gwDmK1GDsZd3fiH9ypSCZlcDwy2P-Dpl7w"
          alt="Eco-friendly biodegradable packaging products arranged neatly on a wooden surface"
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>
);

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#1a4231]/20 bg-transparent p-4">
    <div className="text-[#1a4231]">{icon}</div>
    <div className="flex flex-col gap-1">
      <h3 className="text-base font-semibold leading-tight text-slate-900">
        {title}
      </h3>
      <p className="text-sm font-light leading-normal text-slate-600">
        {description}
      </p>
    </div>
  </div>
);

const BiodegradableIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M5.973 18.028c7.625 4.576 13.726-1.525 12.963-12.964C7.498 4.302 1.398 10.403 5.973 18.028m0 0L4 20m1.973-1.972L10.1 13.9" />
  </svg>
);

const CertificationIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.713 3.64c.581-.495.872-.743 1.176-.888a2.58 2.58 0 0 1 2.222 0c.304.145.595.393 1.176.888.599.51 1.207.768 2.007.831.761.061 1.142.092 1.46.204.734.26 1.312.837 1.571 1.572.112.317.143.698.204 1.46.063.8.32 1.407.83 2.006.496.581.744.872.889 1.176.336.703.336 1.52 0 2.222-.145.304-.393.595-.888 1.176a3.3 3.3 0 0 0-.831 2.007c-.061.761-.092 1.142-.204 1.46a2.58 2.58 0 0 1-1.572 1.571c-.317.112-.698.143-1.46.204-.8.063-1.407.32-2.006.83-.581.496-.872.744-1.176.889a2.58 2.58 0 0 1-2.222 0c-.304-.145-.595-.393-1.176-.888a3.3 3.3 0 0 0-2.007-.831c-.761-.061-1.142-.092-1.46-.204a2.58 2.58 0 0 1-1.571-1.572c-.112-.317-.143-.698-.204-1.46a3.3 3.3 0 0 0-.83-2.006c-.496-.581-.744-.872-.89-1.176a2.58 2.58 0 0 1 .001-2.222c.145-.304.393-.595.888-1.176.52-.611.769-1.223.831-2.007.061-.761.092-1.142.204-1.46a2.58 2.58 0 0 1 1.572-1.571c.317-.112.698-.143 1.46-.204a3.3 3.3 0 0 0 2.006-.83" />
    <path d="m8.667 12.633 1.505 1.721a1 1 0 0 0 1.564-.073L15.333 9.3" />
  </svg>
);

const QualityIcon = () => (
  <svg
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    strokeLinecap="round"
    strokeLinejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 9A6 6 0 1 1 6 9a6 6 0 0 1 12 0" />
    <path d="m8 13.472-1 6.44c0 .81 1.782 1.336 2.447.974l2.106-1.147a.93.93 0 0 1 .894 0l2.106 1.147c.665.362 2.447-.165 2.447-.975l-1-6.439" />
  </svg>
);

const FeaturesSection = () => {
  const features = [
    {
      icon: <BiodegradableIcon />,
      title: "100% Biodegradable",
      description:
        "Nuestros empaques se descomponen de forma natural, reduciendo el impacto ambiental.",
    },
    {
      icon: <CertificationIcon />,
      title: "Certificación Europea",
      description:
        "Cumplimos con las normativas más estrictas para asegurar un producto confiable y seguro.",
    },
    {
      icon: <QualityIcon />,
      title: "Calidad Garantizada",
      description:
        "Ofrecemos soluciones duraderas y de alta calidad para satisfacer las necesidades de tu negocio.",
    },
  ];

  return (
    <section className="@container flex flex-col gap-10 px-4 py-10">
      <div className="flex flex-col gap-4">
        <h2 className="max-w-[720px] text-[32px] font-semibold leading-none tracking-tight text-slate-900">
          Nuestro Compromiso
        </h2>
        <p className="max-w-[720px] text-base font-normal leading-normal text-slate-700">
          Creemos en un futuro donde el progreso y el respeto por el medio
          ambiente van de la mano. Todos nuestros productos cumplen con los más
          altos estándares de calidad y certificación europea.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </section>
  );
};

const CTASection = () => (
  <section className="@container">
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-10 text-center @[480px]:gap-8 @[480px]:px-10 @[480px]:py-20">
      <div className="flex flex-col items-center gap-2">
        <h2 className="max-w-[600px] text-4xl font-semibold leading-tight tracking-[-0.033em] text-slate-900">
          ¿Listo para dar el paso hacia la sostenibilidad?
        </h2>
        <p className="max-w-[720px] text-base font-normal leading-normal text-slate-700">
          Contacta con nuestro equipo de expertos para obtener una cotización
          personalizada y descubrir cómo nuestros productos pueden beneficiar a
          tu empresa.
        </p>
      </div>
      <Link
        href="/contact"
        className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg bg-[#1a4231] px-6 py-2.5 text-lg font-semibold leading-normal tracking-[0.015em] text-white transition-colors hover:bg-[#1a4231]/90"
      >
        <span className="truncate">Cotizar ahora</span>
      </Link>
    </div>
  </section>
);

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#f6f8f7]">
      <div className="flex flex-1 justify-center px-4 py-5 sm:px-10 md:px-20 lg:px-40">
        <div className="flex w-full max-w-[960px] flex-1 flex-col">
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </div>
      </div>
    </main>
  );
}
