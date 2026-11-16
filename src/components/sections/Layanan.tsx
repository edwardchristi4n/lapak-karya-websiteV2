import { useMemo } from "react";
import { SERVICES, type Service } from "../../data/services";
import { useI18n } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { useLightbox } from "../../hooks/useLightbox";
import { Reveal } from "../Reveal";
import { Lightbox, type LightboxItem } from "../Lightbox";
import { ExpandIcon } from "../icons";

interface ServiceText {
  title: string;
  description: string;
  badge?: string;
}

function ServiceCard({
  service,
  text,
  mediaRef,
  onOpen,
}: {
  service: Service;
  text: ServiceText;
  mediaRef: (el: HTMLElement | null) => void | (() => void);
  onOpen: () => void;
}) {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    // reveal di wrapper, hover di kartu: dua transisi tidak saling menimpa
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`}>
      <article className="product-card relative h-full rounded-4xl border border-ink/10 bg-white p-3">
        <div
          ref={mediaRef}
          className={`ph product-media aspect-[4/3] bg-gradient-to-br ${service.gradient}`}
        >
          <img
            src={service.image}
            alt={text.title}
            className="product-img absolute inset-0 h-full w-full object-cover"
            loading="lazy"
          />
          <span
            aria-hidden="true"
            className="product-hint absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-card backdrop-blur"
          >
            <ExpandIcon className="h-3.5 w-3.5" />
            <span className="product-hint-label">{t.lightbox.hint}</span>
          </span>
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
        {/* seluruh kartu bisa diklik untuk melihat foto produk */}
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${t.lightbox.view}: ${text.title}`}
          className="absolute inset-0 z-10 cursor-zoom-in rounded-4xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lk-indigo"
        />
      </article>
    </div>
  );
}

export function Layanan() {
  const { t } = useI18n();
  const lightbox = useLightbox();

  const entries = useMemo(
    () =>
      SERVICES.flatMap((service) => {
        const text = t.layanan.services[service.id];
        return text ? [{ service, text }] : [];
      }),
    [t],
  );

  const items = useMemo<LightboxItem[]>(
    () =>
      entries.map(({ service, text }) => ({
        id: service.id,
        src: service.image,
        alt: text.title,
        title: text.title,
        description: text.description,
        badge: service.badgeClass ? text.badge : undefined,
        badgeClass: service.badgeClass,
      })),
    [entries],
  );

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

        <Reveal className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-ink-soft">
            {t.layanan.industriesTitle}:
          </span>
          {t.layanan.industries.map((name) => (
            <span
              key={name}
              className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs font-semibold text-ink"
            >
              {name}
            </span>
          ))}
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {entries.map(({ service, text }, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              text={text}
              mediaRef={lightbox.originRef(i)}
              onOpen={() => lightbox.open(i)}
            />
          ))}
        </div>
      </div>

      <Lightbox
        items={items}
        index={lightbox.index}
        onIndexChange={lightbox.setIndex}
        getOrigin={lightbox.getOrigin}
      />
    </section>
  );
}
