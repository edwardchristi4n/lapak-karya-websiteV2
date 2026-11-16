import { useMemo, useState, type CSSProperties, type RefObject } from "react";
import { useI18n } from "../../i18n";
import { useLightbox } from "../../hooks/useLightbox";
import { Lightbox } from "../Lightbox";
import { heroGalleryItems } from "../heroGallery";
import { ExpandIcon } from "../icons";
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
  const lightbox = useLightbox();
  const items = useMemo(() => heroGalleryItems(t, imgSrc), [t, imgSrc]);
  const openButton = (i: number, rounded: string) => (
    <button
      type="button"
      onClick={() => lightbox.open(i)}
      aria-label={`${t.lightbox.view}: ${items[i].title}`}
      className={`absolute inset-0 z-10 cursor-zoom-in ${rounded} focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lk-indigo`}
    />
  );

  return (
    <div
      ref={innerRef}
      data-unboxing="showcase"
      className="invisible absolute inset-0 z-20 flex items-center justify-center px-2 opacity-0 sm:px-6"
    >
      <div className="relative w-full max-w-md">
        <div
          ref={lightbox.originRef(0)}
          className="product-media zoom-tile relative overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink/10"
        >
          {revealed && (
            <img
              src={imgSrc}
              onError={() => {
                if (imgSrc !== SHOWCASE_FALLBACK) setImgSrc(SHOWCASE_FALLBACK);
              }}
              alt={t.unboxing.showcaseAlt}
              className="product-img aspect-square w-full object-cover"
              draggable={false}
            />
          )}
          <span
            aria-hidden="true"
            className="product-hint absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur"
          >
            <ExpandIcon className="h-4 w-4" />
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/60 to-transparent p-5 pt-12 text-left">
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/75 uppercase">
              {t.unboxing.showcaseTag}
            </p>
            <p className="mt-1 font-display text-lg leading-snug font-bold text-white">
              {t.unboxing.showcaseTitle}
            </p>
          </div>
          {openButton(0, "rounded-3xl")}
        </div>

        {/* kartu produk melayang — dipertahankan dari galeri hero lama */}
        <div
          className="zoom-tile absolute -top-6 -left-3 w-36 animate-floaty rounded-2xl bg-white p-2.5 shadow-lift sm:-left-10 sm:w-48"
          style={{ "--r": "-4deg" } as CSSProperties}
        >
          <div
            ref={lightbox.originRef(1)}
            className="ph product-media aspect-[4/3] rounded-xl bg-gradient-to-br from-lk-orange to-lk-red"
          >
            <img
              src="/assets/samva_kriya.jpg"
              alt={g.magnetAlt}
              className="product-img absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <span
              aria-hidden="true"
              className="product-hint absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink shadow-card"
            >
              <ExpandIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-xs font-semibold">{g.magnetSub}</p>
          <p className="text-[11px] text-ink-mute">{g.magnetDetail}</p>
          {openButton(1, "rounded-2xl")}
        </div>

        <div
          className="zoom-tile absolute -right-3 -bottom-6 w-36 animate-floaty rounded-2xl bg-white p-2.5 shadow-lift sm:-right-10 sm:w-48"
          style={
            {
              "--r": "3deg",
              animationDelay: "-3s",
            } as CSSProperties
          }
        >
          <div
            ref={lightbox.originRef(2)}
            className="ph product-media aspect-[4/3] rounded-xl bg-gradient-to-br from-lk-yellow to-lk-green"
          >
            <img
              src="/assets/karya_wastra.jpg"
              alt={g.bagAlt}
              className="product-img absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <span
              aria-hidden="true"
              className="product-hint absolute top-2 right-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-ink shadow-card"
            >
              <ExpandIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <p className="mt-2 text-xs font-semibold">{g.bagLabel}</p>
          <p className="text-[11px] text-ink-mute">{g.bagSub}</p>
          {openButton(2, "rounded-2xl")}
        </div>
      </div>

      <Lightbox
        items={items}
        index={lightbox.index}
        onIndexChange={lightbox.setIndex}
        getOrigin={lightbox.getOrigin}
      />
    </div>
  );
}
