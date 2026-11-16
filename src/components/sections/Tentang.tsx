import { RichText, useI18n } from "../../i18n";
import { Reveal } from "../Reveal";

const VALUE_BARS = ["bg-lk-red", "bg-lk-green", "bg-lk-sky"];

function VisiMisi({ className = "" }: { className?: string }) {
  const { t } = useI18n();
  return (
    <div className={`rounded-3xl bg-ink p-6 text-white sm:p-7 ${className}`}>
      <p className="text-xs font-semibold tracking-[0.18em] uppercase text-lk-yellow">
        {t.tentang.visiTitle}
      </p>
      <p className="mt-2 font-display text-lg leading-snug font-bold">
        {t.tentang.visi}
      </p>
      <p className="mt-5 text-xs font-semibold tracking-[0.18em] uppercase text-lk-yellow">
        {t.tentang.misiTitle}
      </p>
      <ol className="mt-2 space-y-1.5 text-sm leading-relaxed text-white/80">
        {t.tentang.misi.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="font-display font-bold text-white">{i + 1}.</span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Tentang() {
  const { t } = useI18n();

  return (
    <section id="tentang" className="py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        {/* desktop: kolom kiri setinggi kolom kanan; foto workshop memanjang mengisi sisa ruang */}
        <Reveal className="lg:col-span-5 lg:flex lg:flex-col">
          <div className="grid grid-cols-2 gap-4 lg:flex-1 lg:grid-rows-[minmax(14rem,1fr)_auto]">
            <div className="ph col-span-2 aspect-[16/10] bg-gradient-to-br from-lk-green to-lk-sky lg:aspect-auto">
              <img
                src="/img/tentang-rumah-produksi.webp"
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
            <div className="relative flex aspect-square flex-col justify-between overflow-hidden rounded-3xl bg-ink p-4 shadow-card sm:p-5">
              <img
                src="/img/tentang-tugu.jpg"
                alt={t.tentang.tuguAlt}
                className="absolute inset-0 h-full w-full object-cover"
                loading="lazy"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
              <span className="relative grid h-9 w-9 place-items-center self-start rounded-xl bg-white/90 p-1.5 shadow-card backdrop-blur sm:h-11 sm:w-11 sm:rounded-2xl sm:p-2">
                <img src="/assets/logo_mark.svg" alt="" className="h-full w-auto" />
              </span>
              <p className="relative font-display text-sm leading-snug font-bold text-white sm:text-lg">
                {t.tentang.tuguCaption}
              </p>
            </div>
          </div>
          {/* desktop: visi-misi di bawah foto agar kedua kolom seimbang */}
          <VisiMisi className="mt-6 hidden lg:block" />
        </Reveal>

        <Reveal className="lg:col-span-7 lg:flex lg:flex-col lg:pl-8">
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

          {/* mobile/tablet: visi-misi mengikuti teks */}
          <VisiMisi className="mt-8 lg:hidden" />

          {/* desktop: kartu nilai tersusun ke bawah & rata bawah dengan kolom kiri */}
          <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:mt-auto lg:grid-cols-1 lg:gap-3 lg:pt-8">
            {t.tentang.values.map((v, i) => (
              <div
                key={i}
                className="rounded-2xl border border-ink/10 bg-white p-5 lg:flex lg:items-start lg:gap-4"
              >
                <div
                  className={`h-1.5 w-10 rounded-full lg:mt-1 lg:h-10 lg:w-1.5 lg:shrink-0 ${VALUE_BARS[i] ?? VALUE_BARS[0]}`}
                />
                <div>
                  <p className="mt-4 font-display text-lg font-bold lg:mt-0">{v.title}</p>
                  <p className="mt-1 text-sm text-ink-soft">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
