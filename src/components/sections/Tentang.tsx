import { RichText, useI18n } from "../../i18n";
import { Reveal } from "../Reveal";

const VALUE_BARS = ["bg-lk-red", "bg-lk-green", "bg-lk-sky"];

export function Tentang() {
  const { t } = useI18n();

  return (
    <section id="tentang" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-5">
          <div className="grid grid-cols-2 gap-4">
            <div className="ph col-span-2 aspect-[16/10] bg-gradient-to-br from-lk-green to-lk-sky">
              <img
                src="/img/tentang-workshop.jpg"
                alt={t.tentang.workshopAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="ph aspect-square bg-gradient-to-br from-lk-red to-lk-orange">
              <img
                src="/img/tentang-founder.webp"
                alt={t.tentang.founderAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl bg-ink p-5 shadow-card">
              <img
                src="/img/tentang-tugu.jpg"
                alt={t.tentang.tuguAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
              <span className="relative grid h-11 w-11 place-items-center self-start rounded-2xl bg-white/90 p-2 shadow-card backdrop-blur">
                <img src="/assets/logo_mark.svg" alt="" className="h-full w-auto" />
              </span>
              <p className="relative font-display text-lg leading-snug font-bold text-white">
                {t.tentang.tuguCaption}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:pl-8">
          <p className="eyebrow">
            <span className="h-px w-8 bg-lk-red" />
            {t.tentang.eyebrow}
          </p>
          <h2 className="section-title mt-4">{t.tentang.title}</h2>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-soft sm:text-lg">
            <p>
              <RichText text={t.tentang.p1} />
            </p>
            <p>
              <RichText text={t.tentang.p2} />
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {t.tentang.values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink/10 bg-white p-5"
              >
                <div className={`h-1.5 w-10 rounded-full ${VALUE_BARS[i] ?? VALUE_BARS[0]}`} />
                <p className="mt-4 font-display text-lg font-bold">{v.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{v.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
