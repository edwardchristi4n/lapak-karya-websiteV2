import { useI18n } from "../../i18n";
import { Reveal } from "../Reveal";
import { useReveal } from "../../hooks/useReveal";

const AUDIENCE_COLORS = ["text-lk-red", "text-lk-orange", "text-lk-green", "text-lk-sky"];

function AudienceCard({ index }: { index: number }) {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLDivElement>();
  const audience = t.untukSiapa.audiences[index];
  if (!audience) return null;
  return (
    <div
      ref={ref}
      className={`reveal flex gap-4 rounded-3xl bg-white p-6 shadow-card ${
        visible ? "is-visible" : ""
      }`}
    >
      <span
        className={`font-display text-4xl font-extrabold ${AUDIENCE_COLORS[index] ?? AUDIENCE_COLORS[0]}`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <h3 className="font-display text-lg font-bold">{audience.title}</h3>
        <p className="mt-1 text-sm text-ink-soft">{audience.desc}</p>
      </div>
    </div>
  );
}

export function UntukSiapa() {
  const { t } = useI18n();

  return (
    <section className="bg-cream-deep py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">
            <span className="h-px w-8 bg-lk-orange" />
            {t.untukSiapa.eyebrow}
          </p>
          <h2 className="section-title mt-4">{t.untukSiapa.title}</h2>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
          {t.untukSiapa.audiences.map((_, i) => (
            <AudienceCard key={i} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
