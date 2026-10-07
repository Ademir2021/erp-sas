"use client";

import { useState } from "react";
import Link from "next/link";

export default function BannerForm() {
  const banners: string[] = process.env.NEXT_PUBLIC_BANNERS?.split(",") ?? [];
  const items: string[] =
    process.env.NEXT_PUBLIC_BANNER_ID_ITEMS?.split(",") ?? [];
  const total = Math.min(banners.length, items.length);
  const [currentIndex, setCurrentIndex] = useState(0);
  const handlePrevious = () => {
    setCurrentIndex((current) => (current === 0 ? total - 1 : current - 1));
  };
  const handleNext = () => {
    setCurrentIndex((current) => (current === total - 1 ? 0 : current + 1));
  };
  // Evita problemas caso não existam banners
  if (total === 0) {
    return null;
  }
  const currentBanner = banners[currentIndex];
  const currentItem = items[currentIndex];
  return (
    <section className="relative w-full overflow-hidden rounded-none">
      <img
        src={`/imgs/banners/${currentBanner}`}
        alt={`Banner ${currentIndex} não disponível`}
        className="h-68 w-full object-cover"
      />

      {/* Conteúdo sobre o banner */}
      <div className="absolute inset-0 flex items-center">
        <div className="px-6 mt-1 text-gray-900 md:px-12 lg:px-20">
          <h1 className="text-2xl font-bold md:text-4xl lg:text-5xl">
            Tecnologia para vc ou sua empresa
          </h1>

          <p className="mt-1 max-w-xl text-gray-900 text-sm md:text-lg">
            Os melhores produtos vc so encontra aqui.
          </p>

          <Link
            href={`/checkoutstore/${currentItem}`}
            className="mt-26 inline-block rounded-lg bg-white px-6 py-3
                       font-semibold text-gray-800 transition
                       hover:bg-gray-100"
          >
            Comprar agora
          </Link>
        </div>
      </div>

      {/* Botão anterior */}
      <button
        type="button"
        onClick={handlePrevious}
        aria-label="Banner anterior"
        className="absolute cursor-pointer left-4 top-1/2 -translate-y-1/2
                   rounded-full bg-black/40 px-4 py-3 text-2xl
                   text-white transition hover:bg-black/60"
      >
        ‹
      </button>

      {/* Botão próximo */}
      <button
        type="button"
        onClick={handleNext}
        aria-label="Próximo banner"
        className="absolute cursor-pointer right-4 top-1/2 -translate-y-1/2
                   rounded-full bg-black/40 px-4 py-3 text-2xl
                   text-white transition hover:bg-black/60"
      >
        ›
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {Array.from({ length: total }).map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Ir para o banner ${index + 1}`}
            className={`h-2.5 w-2.5 cursor-pointer rounded-full transition ${
              index === currentIndex
                ? "bg-white"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
