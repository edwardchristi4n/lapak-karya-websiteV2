import { RichText, useI18n } from "../../i18n";
import { Reveal } from "../Reveal";
import { CheckCircleIcon, TrophyIcon } from "../icons";

const AWARD_TONES = [
  "bg-lk-yellow/25 text-[#9a7b0c]",
  "bg-lk-indigo/10 text-lk-indigo",
  "bg-lk-orange/15 text-lk-orange",
  "bg-lk-sky/15 text-lk-sky",
];

export function Prestasi() {
  const { t } = useI18n();

  return (
    <section id="prestasi" className="bg-cream-deep py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">
            <span className="h-px w-8 bg-lk-yellow" />
            {t.prestasi.eyebrow}
          </p>
          <h2 className="section-title mt-4">
            <RichText text={t.prestasi.title} boldClass="rainbow-text" />
          </h2>
          <p className="mt-5 text-ink-soft sm:text-lg">{t.prestasi.subtitle}</p>
        </Reveal>

        <Reveal className="mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.prestasi.awards.map((award, i) => (
              <li
                key={award.title}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-card"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-2xl ${AWARD_TONES[i % AWARD_TONES.length]}`}
                  >
                    <TrophyIcon className="h-6 w-6" />
                  </span>
                  <span className="rounded-full bg-cream px-3 py-1 font-display text-sm font-bold text-ink-soft">
                    {award.year}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-lg leading-snug font-bold">
                  {award.title}
                </h3>
                <p className="mt-1 text-sm text-ink-soft">{award.org}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-6">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 sm:p-8">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-mute">
              {t.prestasi.legalTitle}
            </h3>
            <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {t.prestasi.legal.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-lk-green" />
                  <div>
                    <p className="font-display font-bold">{item.label}</p>
                    <p className="text-sm text-ink-soft">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
