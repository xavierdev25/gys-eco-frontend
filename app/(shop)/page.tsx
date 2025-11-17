import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import Button from "../../components/ui/Button";
import { FeatureCard } from "../../components/ui/Card";
import Section, { SectionHeader } from "../../components/ui/Section";
import {
  BiodegradableIcon,
  CertificationIcon,
  QualityIcon,
} from "../../components/ui/Icon";

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

const HeroSection = () => (
  <Section>
    <div className="flex flex-col gap-6 px-4 py-10 md:flex-row">
      <div className="flex flex-col gap-6 md:flex-1">
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-5xl font-bold leading-none tracking-[-0.033em] text-slate-900">
            Innovación y sostenibilidad en cada empaque
          </h1>
          <p className="text-lg font-normal leading-normal text-slate-700">
            Ayudamos a los negocios a ser más sostenibles a través de nuestros
            productos certificados, ofreciendo soluciones de empaque que cuidan
            el planeta.
          </p>
        </div>
        <Link href="/products">
          <Button size="lg" className="w-full">
            Ver catálogo
          </Button>
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
  </Section>
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
    <Section className="flex flex-col gap-10 px-4 py-10">
      <SectionHeader
        title="Nuestro Compromiso"
        description="Creemos en un futuro donde el progreso y el respeto por el medio ambiente van de la mano. Todos nuestros productos cumplen con los más altos estándares de calidad y certificación europea."
      />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} />
        ))}
      </div>
    </Section>
  );
};

const CTASection = () => (
  <Section>
    <div className="flex flex-col items-center justify-center gap-6 px-4 py-10 text-center">
      <SectionHeader
        title="¿Listo para dar el paso hacia la sostenibilidad?"
        description="Contacta con nuestro equipo de expertos para obtener una cotización personalizada y descubrir cómo nuestros productos pueden beneficiar a tu empresa."
        align="center"
      />
      <Link href="/contact">
        <Button size="lg" className="px-6">
          Cotizar ahora
        </Button>
      </Link>
    </div>
  </Section>
);

export default function Home() {
  return (
    <main className="relative flex min-h-screen w-full flex-col bg-[#f6f8f7]">
      <div className="flex flex-1 justify-center ">
        <div className="flex w-full  flex-1 flex-col space-y-18 px-4  ">
          <HeroSection />
          <FeaturesSection />
          <CTASection />
        </div>
      </div>
    </main>
  );
}
