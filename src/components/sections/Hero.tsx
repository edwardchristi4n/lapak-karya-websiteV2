import { Suspense, lazy, type CSSProperties } from "react";
import { RichText, useI18n } from "../../i18n";
import { Reveal } from "../Reveal";
import { DocumentIcon, WhatsAppIcon } from "../icons";
import { UnboxingLoader } from "../unboxing/UnboxingLoader";

const UnboxingExperience = lazy(() =>
  import("../unboxing/UnboxingExperience").then((m) => ({
    default: m.UnboxingExperience,
  })),
);

export function Hero() {
  const { t } = useI18n();

  return (
    <section id="beranda" className="relative overflow-hidden">
      <div className="pointer-events-none absolute top-10 -left-32 h-96 w-96 rounded-full bg-lk-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-lk-green/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lk-orange/20 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pt-10 pb-20 lg:grid-cols-12 lg:px-8 lg:pt-16 lg:pb-28">
        <Reveal className="lg:col-span-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs font-semibold text-ink-soft shadow-card">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lk-green opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lk-green" />
            </span>
            {t.hero.badge}
          </span>

          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.02] font-extrabold tracking-tight sm:text-6xl lg:text-[4.25rem]">
            {t.hero.titleLines.map((line, i) => (
              <span key={i} className="block">
                <RichText text={line} boldClass="rainbow-text" />
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            <RichText text={t.hero.intro} />
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#kontak" className="btn-wa">
              <WhatsAppIcon className="h-4 w-4" />
              {t.hero.ctaWa}
            </a>
            <a href="#portofolio" className="btn-ghost">
              <DocumentIcon className="h-4 w-4" />
              {t.hero.ctaPortofolio}
            </a>
          </div>

          <dl className="mt-12 flex max-w-lg justify-between gap-6 border-t border-ink/10 pt-8">
            <div>
              <dt className="text-xs font-medium text-ink-mute">
                {t.hero.stats.since}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                2020
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-mute">
                {t.hero.stats.shipTo}
              </dt>
              <dd className="mt-1 flex items-center gap-1.5 font-display text-2xl font-bold sm:text-3xl">
                {t.hero.stats.worldwide}
                <span
                  className="text-xl leading-none sm:text-2xl"
                  role="img"
                  aria-label={t.hero.stats.worldwideFlag}
                >
                  🇮🇩
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-ink-mute">
                {t.hero.stats.process}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold sm:text-3xl">
                100%<span className="text-sm text-ink-mute">{t.hero.stats.customSuffix}</span>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="relative lg:col-span-6">
          <Suspense
            fallback={
              <div className="relative mx-auto aspect-square w-full max-w-[560px]">
                <UnboxingLoader />
              </div>
            }
          >
            <UnboxingExperience fallback={<FallbackGallery />} />
          </Suspense>
        </Reveal>
      </div>
    </section>
  );
}

/** Galerifoto lama — fallback saat WebGL tidak tersedia. */
function FallbackGallery() {
  const { t } = useI18n();
  const g = t.hero.gallery;
  return (
    <>
      <div className="sm:hidden">
        <div className="relative">
          <div className="ph aspect-[4/3] bg-gradient-to-br from-lk-sky via-lk-indigo to-lk-indigo shadow-lift">
            <img
              src="/assets/exosome.jpg"
              alt={g.mainAlt}
              className="absolute inset-0 h-full w-full object-cover"
              loading="eager"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
            <span className="ph-label relative">{g.mainLabel}</span>
          </div>
          <div className="absolute -top-5 -right-2 grid h-20 w-20 place-items-center rounded-full bg-lk-yellow text-center shadow-lift">
            <div>
              <p className="font-display text-lg leading-none font-extrabold">
                {g.lowBadgeTop}
              </p>
              <p className="text-[9px] leading-tight font-semibold">
                {g.lowBadgeText}
                <br />
                {g.lowBadgeText2}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-2.5 shadow-card">
            <div className="ph aspect-[4/3] rounded-xl bg-gradient-to-br from-lk-orange to-lk-red">
              <img
                src="/assets/samva_kriya.jpg"
                alt={g.magnetAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-2 text-xs font-semibold">{g.magnetLabel}</p>
            <p className="text-[11px] text-ink-mute">{g.magnetSub}</p>
          </div>
          <div className="rounded-2xl bg-white p-2.5 shadow-card">
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

      <div className="relative mx-auto hidden aspect-square max-w-[560px] sm:block">
        <div className="ph absolute inset-[8%] bg-gradient-to-br from-lk-sky via-lk-indigo to-lk-indigo shadow-lift">
          <img
            src="/assets/exosome.jpg"
            alt={g.mainAlt}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/50 to-transparent" />
          <span className="ph-label relative">{g.mainLabel}</span>
        </div>

        <div
          className="absolute -left-2 top-[14%] w-44 animate-floaty rounded-2xl bg-white p-3 shadow-lift sm:w-52"
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
          className="absolute -right-2 bottom-[12%] w-44 animate-floaty rounded-2xl bg-white p-3 shadow-lift sm:w-52"
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

        <div className="absolute top-[4%] right-[6%] grid h-24 w-24 place-items-center rounded-full bg-lk-yellow text-center shadow-lift">
          <div>
            <p className="font-display text-2xl leading-none font-extrabold">
              {g.lowBadgeTop}
            </p>
            <p className="text-[11px] leading-tight font-semibold">
              {g.lowBadgeText}
              <br />
              {g.lowBadgeText2}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
