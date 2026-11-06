import { SERVICES } from "../../data/services";
import { useI18n } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { Reveal } from "../Reveal";

function ServiceCard({ id }: { id: string }) {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLElement>();
  const service = SERVICES.find((s) => s.id === id);
  const text = t.layanan.services[id];
  if (!service || !text) return null;
  return (
    <article
      ref={ref}
      className={`group reveal rounded-4xl border border-ink/10 bg-white p-3 transition hover:-translate-y-1 hover:shadow-lift ${
        visible ? "is-visible" : ""
      }`}
    >
      <div
        className={`ph aspect-[4/3] bg-gradient-to-br ${service.gradient}`}
      >
        <img
          src={service.image}
          alt={text.title}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-bold">{text.title}</h3>
          {text.badge && service.badgeClass && (
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${service.badgeClass}`}
            >
              {text.badge}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {text.description}
        </p>
      </div>
    </article>
  );
}

export function Layanan() {
  const { t } = useI18n();

  return (
    <section id="layanan" className="relative bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-8 bg-lk-green" />
              {t.layanan.eyebrow}
            </p>
            <h2 className="section-title mt-4">{t.layanan.title}</h2>
          </div>
          <p className="max-w-sm text-ink-soft">{t.layanan.subtitle}</p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <ServiceCard key={service.id} id={service.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
