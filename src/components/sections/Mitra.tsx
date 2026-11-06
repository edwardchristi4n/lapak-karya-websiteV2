import { RichText, useI18n } from "../../i18n";
import type { Partner } from "../../data/partners";
import { Reveal } from "../Reveal";
import { ArrowRightIcon } from "../icons";
import {
  TiltedGridHero,
  type TiltedGridImage,
} from "../ui/tilted-grid-hero";

/** Galeri berjalan memakai foto Rumah UMKM (Rumah Kreatif BUMN). */
const MITRA_WORKS: TiltedGridImage[] = [
  { src: "/img/mitra-rumah-kreatif.jpg", alt: "Kemasan Rumah Kreatif BUMN" },
];

export function PartnerCard({
  partner,
  variant = "carousel",
}: {
  partner: Partner;
  /** carousel = lebar snap track; grid = lebar penuh (halaman mitra) */
  variant?: "carousel" | "grid";
}) {
  const { t } = useI18n();
  const text = t.mitra.partners[partner.id];
  if (!text) return null;
  const width =
    variant === "carousel"
      ? "w-[82%] shrink-0 snap-start sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
      : "w-full";
  return (
    <article
      className={`partner-card group relative flex flex-col overflow-hidden rounded-4xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lift ${width}`}
    >
      <div className={`h-1.5 w-full ${partner.accent}`} />
      <div className="relative m-3 aspect-[16/9] overflow-hidden rounded-3xl bg-cream">
        <img
          src={partner.image}
          alt={text.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex flex-1 flex-col px-6 pt-2 pb-6">
        <span
          className={`self-start rounded-full px-3 py-1 text-[11px] font-semibold text-ink-soft ${partner.tagClass}`}
        >
          {text.tag}
        </span>
        <div className="mt-3 flex items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-xl border border-ink/10 bg-white p-1.5 shadow-card">
            <img
              src={partner.logo}
              alt={text.logoAlt}
              className="h-full w-full object-contain"
              loading="lazy"
            />
          </span>
          <h3 className="font-display text-xl leading-snug font-bold">
            {text.name}
          </h3>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {text.description}
        </p>
      </div>
    </article>
  );
}

export function Mitra() {
  const { t } = useI18n();

  return (
    <section id="mitra" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="rainbow-bar absolute inset-x-0 top-0 h-1 opacity-70" />
      <div className="pointer-events-none absolute top-1/3 -left-24 h-80 w-80 rounded-full bg-lk-yellow/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-lk-sky/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-lk-orange" />
            {t.mitra.eyebrow}
            <span className="h-px w-8 bg-lk-orange" />
          </p>
          <h2 className="section-title mx-auto mt-4 max-w-3xl">
            <RichText text={t.mitra.title} boldClass="rainbow-text" />
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-ink-soft sm:text-lg">
            {t.mitra.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-12">
          <TiltedGridHero
            images={MITRA_WORKS}
            speed={5}
            tileHeight={60}
            axis={50}
            className="h-[240px] sm:h-[300px]"
          />
        </Reveal>

        <Reveal className="mt-8 flex justify-center">
          <a href="/mitra.html" className="btn-ghost group">
            {t.mitra.all}
            <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </Reveal>

        <Reveal className="mt-6">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl bg-gradient-to-br from-lk-green to-[#5c9a1c] p-7 text-white md:col-span-2">
              <p className="font-display text-2xl leading-snug font-bold sm:text-3xl">
                {t.mitra.ctaHeadline}
              </p>
              <p className="mt-3 text-white/85">{t.mitra.ctaSub}</p>
            </div>
            <a
              href="#kontak"
              className="group flex flex-col justify-between rounded-3xl border-2 border-dashed border-ink/15 p-7 transition hover:border-ink"
            >
              <p className="font-display text-xl leading-snug font-bold">
                {t.mitra.joinTitle}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                {t.mitra.joinCta}
                <span className="transition group-hover:translate-x-1">→</span>
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
