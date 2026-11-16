import { useCallback, useEffect, useRef, useState } from "react";
import { RichText, useI18n } from "../../i18n";
import { PARTNERS, type Partner } from "../../data/partners";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { Reveal } from "../Reveal";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

const AUTOPLAY_MS = 4000;

function PartnerCard({ partner }: { partner: Partner }) {
  const { t } = useI18n();
  const text = t.mitra.partners[partner.id];
  if (!text) return null;
  return (
    <article className="partner-card group relative flex w-[82%] shrink-0 snap-start flex-col overflow-hidden rounded-4xl border border-ink/10 bg-white transition hover:-translate-y-1 hover:shadow-lift sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]">
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

/** Ukuran geser carousel: jarak antar kartu & jumlah "halaman" yang bisa dituju. */
function trackMetrics(track: HTMLElement) {
  const cards = track.querySelectorAll<HTMLElement>(".partner-card");
  const step =
    cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft || 1 : 1;
  const maxScroll = track.scrollWidth - track.clientWidth;
  return {
    step,
    pages: Math.max(1, Math.round(maxScroll / step) + 1),
    current: Math.round(track.scrollLeft / step),
  };
}

/** Carousel mitra: geser otomatis, berhenti saat di-hover/disentuh/fokus. */
function PartnerCarousel() {
  const { t } = useI18n();
  const reduceMotion = usePrefersReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const [pages, setPages] = useState(1);
  const [current, setCurrent] = useState(0);

  /** Geser ke halaman i (berputar: setelah terakhir kembali ke awal). */
  const go = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const { step, pages: n } = trackMetrics(track);
    track.scrollTo({ left: (((i % n) + n) % n) * step, behavior: "smooth" });
  }, []);

  /** Geser relatif dari posisi sekarang (+1 maju, -1 mundur). */
  const shift = useCallback(
    (delta: number) => {
      const track = trackRef.current;
      if (track) go(trackMetrics(track).current + delta);
    },
    [go],
  );

  // sinkronkan titik indikator dengan posisi scroll & ukuran layar
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const sync = () => {
      const m = trackMetrics(track);
      setPages(m.pages);
      setCurrent(m.current);
    };
    let timeout: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(timeout);
      timeout = setTimeout(sync, 120);
    };
    sync();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      clearTimeout(timeout);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", sync);
    };
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = setInterval(() => {
      if (!pausedRef.current) shift(1);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [reduceMotion, shift]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onFocus={pause}
      onBlur={resume}
    >
      <div
        ref={trackRef}
        className="-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [scrollbar-width:none] lg:mx-0 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {PARTNERS.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t.mitra.goTo} ${i + 1}`}
              aria-current={i === current ? "true" : undefined}
              onClick={() => go(i)}
              className={`h-2.5 rounded-full transition-all ${
                i === current ? "w-8 bg-ink" : "w-2.5 bg-ink/20 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => shift(-1)}
            aria-label={t.mitra.prev}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white transition hover:border-ink"
          >
            <ArrowLeftIcon className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => shift(1)}
            aria-label={t.mitra.next}
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-white transition hover:bg-lk-indigo"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
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

        <Reveal className="mt-14">
          <PartnerCarousel />
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
