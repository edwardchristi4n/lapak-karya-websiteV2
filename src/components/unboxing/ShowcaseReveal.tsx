import { useState, type CSSProperties, type RefObject } from "react";
import { useI18n } from "../../i18n";
import { SHOWCASE_FALLBACK, SHOWCASE_SRC } from "./unboxingConfig";

/**
 * Reveal showcase — komponen HTML/CSS (bukan tekstur 3D), dianimasikan
 * timeline GSAP induk. Komposisi akhir mempertahankan dua kartu produk
 * melayang (Samva Kriya & Karya Wastra) dari galeri hero lama.
 * Gambar utama: public/images/packaging-showcase.webp (file sekarang
 * placeholder; lihat dokumentasi di unboxingConfig.ts).
 */
export function ShowcaseReveal({
  innerRef,
  revealed,
}: {
  innerRef: RefObject<HTMLDivElement | null>;
  /** false = jangan muat gambar dulu (mencegah 404/noise sebelum waktunya) */
  revealed: boolean;
}) {
  const { t } = useI18n();
  const g = t.hero.gallery;
  const [imgSrc, setImgSrc] = useState(SHOWCASE_SRC);

  return (
    <div
      ref={innerRef}
      data-unboxing="showcase"
      className="invisible absolute inset-0 z-20 flex items-center justify-center px-2 opacity-0 sm:px-6"
    >
      <div className="relative w-full max-w-md">
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink/10">
          {revealed && (
            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== SHOWCASE_FALLBACK) setImgSrc(SHOWCASE_FALLBACK);
              }}
              alt={t.unboxing.showcaseAlt}
              className="aspect-square w-full object-cover"
              draggable={false}
            />
          )}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-5 pt-12 text-left">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/75 uppercase">
              {t.unboxing.showcaseTag}
            </p>
            <p className="mt-1 font-display text-lg leading-snug font-bold text-white">
              {t.unboxing.showcaseTitle}
            </p>
          </div>
        </div>

        {/* kartu produk melayang — dipertahankan dari galeri hero lama */}
        <div
          className="absolute -top-6 -left-3 w-36 animate-floaty rounded-2xl bg-white p-2.5 shadow-lift sm:-left-10 sm:w-48"
          style={{ "--r": "-4deg" } as CSSProperties}
        >
          <div className="ph aspect-[4/3] rounded-xl bg-gradient-to-br from-lk-orange to-lk-red">
            <img
              src="/assets/samva_kriya.jpg"
              alt={g.magnetAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-xs font-semibold">{g.magnetSub}</p>
          <p className="text-[11px] text-ink-mute">{g.magnetDetail}</p>
        </div>

        <div
          className="absolute -right-3 -bottom-6 w-36 animate-floaty rounded-2xl bg-white p-2.5 shadow-lift sm:-right-10 sm:w-48"
          style={
            {
              "--r": "3deg",
              animationDelay: "-3s",
            } as CSSProperties
          }
        >
          <div className="ph aspect-[4/3] rounded-xl bg-gradient-to-br from-lk-yellow to-lk-green">
            <img
              src="/assets/karya_wastra.jpg"
              alt={g.bagAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-2 text-xs font-semibold">{g.bagLabel}</p>
          <p className="text-[11px] text-ink-mute">{g.bagSub}</p>
        </div>
      </div>
    </div>
  );
}
