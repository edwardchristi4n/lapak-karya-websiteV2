import { SITE } from "../../data/site";
import { useI18n } from "../../i18n";
import { waLink } from "../../lib/wa";
import { Reveal } from "../Reveal";
import { ArrowRightIcon, DocumentIcon, WhatsAppIcon } from "../icons";

/** Edukasi hardbox vs softbox + akses katalog produk (e-book flipbook). */
export function Perbandingan() {
  const { t } = useI18n();
  const p = t.perbandingan;

  return (
    <section id="perbandingan" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-lk-indigo" />
            {p.eyebrow}
            <span className="h-px w-8 bg-lk-indigo" />
          </p>
          <h2 className="section-title mt-4">{p.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-ink-soft sm:text-lg">
            {p.subtitle}
          </p>
        </Reveal>

        <Reveal className="mt-14 grid gap-5 md:grid-cols-2">
          {/* Hardbox — disorot sebagai spesialisasi */}
          <div className="relative overflow-hidden rounded-4xl bg-ink p-7 text-white shadow-lift sm:p-8">
            <div className="rainbow-bar absolute inset-x-0 top-0 h-1.5" />
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="font-display text-3xl font-extrabold">
                {p.hardbox.name}
              </h3>
              <span className="rounded-full bg-lk-yellow px-3 py-1 text-[11px] font-bold text-ink">
                {p.hardbox.badge}
              </span>
            </div>
            <p className="mt-2 text-white/70">{p.hardbox.summary}</p>
            <dl className="mt-6 divide-y divide-white/10">
              {p.rows.map((row) => (
                <div key={row.aspect} className="py-3.5">
                  <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-white/50">
                    {row.aspect}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed">{row.hardbox}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-4xl border border-ink/10 bg-cream p-7 sm:p-8">
            <h3 className="font-display text-3xl font-extrabold text-ink-soft">
              {p.softbox.name}
            </h3>
            <p className="mt-2 text-ink-soft">{p.softbox.summary}</p>
            <dl className="mt-6 divide-y divide-ink/10">
              {p.rows.map((row) => (
                <div key={row.aspect} className="py-3.5">
                  <dt className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-mute">
                    {row.aspect}
                  </dt>
                  <dd className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {row.softbox}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>

        <Reveal className="mt-6">
          <div
            id="katalog"
            className="flex flex-col items-start justify-between gap-6 rounded-4xl border-2 border-dashed border-ink/15 p-7 sm:p-8 md:flex-row md:items-center"
          >
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-lk-indigo/10 text-lk-indigo">
                <DocumentIcon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-xl font-bold">
                  {p.catalog.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft">
                  {p.catalog.desc}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {SITE.catalogUrl ? (
                <a
                  href={SITE.catalogUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost bg-white"
                >
                  {p.catalog.cta}
                  <ArrowRightIcon className="h-4 w-4" />
                </a>
              ) : (
                <span className="rounded-full bg-cream-deep px-4 py-2 text-xs font-semibold text-ink-soft">
                  {p.catalog.soon}
                </span>
              )}
              <a
                href={waLink(t.wa.katalog)}
                target="_blank"
                rel="noopener"
                className="btn-wa"
              >
                <WhatsAppIcon className="h-4 w-4" />
                {p.catalog.waCta}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
