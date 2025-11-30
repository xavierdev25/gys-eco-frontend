import Link from "next/link";

export default function CTASection() {
  return (
    <div className="py-16 sm:py-24 px-4">
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <h2 className="text-[#1B4332] text-3xl font-bold leading-tight tracking-[-0.015em]">
          Únete a nuestro compromiso
        </h2>
        <p className="text-[#0d1b13]/80 text-base font-normal leading-relaxed">
          Descubre cómo nuestras soluciones biodegradables pueden ayudar a tu
          empresa a ser más sostenible. Juntos, podemos construir un futuro
          mejor.
        </p>
        <Link href="/products">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#1B4332] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-90 transition-opacity">
            <span className="truncate">Explora Nuestros Productos</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
