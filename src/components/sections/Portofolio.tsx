import { useMemo, useState, type CSSProperties } from "react";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_SPANS,
  portfolioView,
  type PortfolioFilter,
} from "../../data/portfolio";
import { SITE } from "../../data/site";
import { useI18n } from "../../i18n";
import { useLightbox } from "../../hooks/useLightbox";
import { Lightbox, type LightboxItem } from "../Lightbox";
import { Reveal } from "../Reveal";
import { ExpandIcon, InstagramIcon } from "../icons";

/** warna latar sementara (sebelum foto termuat), bergilir per posisi tile */
const TILE_GRADIENTS = [
  "from-lk-indigo via-lk-sky to-lk-sky",
  "from-lk-red to-lk-orange",
  "from-lk-yellow to-lk-green",
  "from-lk-green to-lk-sky",
  "from-lk-orange to-lk-red",
  "from-lk-sky to-lk-indigo",
  "from-lk-green to-lk-yellow",
  "from-lk-indigo to-lk-red",
];

export function Portofolio() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const items = portfolioView(filter);
  const lightbox = useLightbox();

  const lightboxItems = useMemo<LightboxItem[]>(
    () =>
      items.map((item) => {
        const text = t.portofolio.items[item.id];
        return {
          id: item.id,
          src: item.image,
          alt: text?.alt ?? item.id,
          title: text?.label ?? item.id,
          badge: t.portofolio.filters[item.cat],
          badgeClass: "bg-ink/5 text-ink-soft",
        };
      }),
    [items, t],
  );

  return (
    <section id="portofolio" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-lk-sky" />
            {t.portofolio.eyebrow}
            <span className="h-px w-8 bg-lk-sky" />
          </p>
          <h2 className="section-title mx-auto mt-4 max-w-3xl">
            {t.portofolio.title}
          </h2>
        </Reveal>

        <Reveal className="mt-10">
          <div
            role="group"
            aria-label={t.portofolio.filterAria}
            className="flex flex-wrap justify-center gap-2"
          >
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                aria-pressed={filter === f.id}
                style={{ "--c": f.color } as CSSProperties}
                onClick={() => setFilter(f.id)}
                className={`filter-btn rounded-full px-5 py-2 text-sm font-semibold ${
                  filter === f.id ? "is-active" : ""
                }`}
              >
                {t.portofolio.filters[f.id]}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid auto-rows-[180px] grid-flow-dense grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-4">
          {items.map((item, i) => {
            const text = t.portofolio.items[item.id];
            return (
              <figure
                key={item.id}
                ref={lightbox.originRef(i)}
                className={`portfolio-item ph product-media zoom-tile bg-gradient-to-br ${TILE_GRADIENTS[i % TILE_GRADIENTS.length]} ${PORTFOLIO_SPANS[i] ?? ""}`}
              >
                <img
                  src={item.image}
                  alt={text?.alt ?? item.id}
                  className={`product-img absolute inset-0 h-full w-full object-cover ${item.focus ?? ""}`}
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/50 to-transparent" />
                <figcaption className="ph-label relative">
                  {text?.label ?? item.id}
                </figcaption>
                <span
                  aria-hidden="true"
                  className="product-hint absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-card backdrop-blur"
                >
                  <ExpandIcon className="h-4 w-4" />
                </span>
                <button
                  type="button"
                  onClick={() => lightbox.open(i)}
                  aria-label={`${t.lightbox.view}: ${text?.label ?? item.id}`}
                  className="absolute inset-0 z-10 cursor-zoom-in rounded-3xl focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
                />
              </figure>
            );
          })}
        </div>

        <Lightbox
          items={lightboxItems}
          index={lightbox.index}
          onIndexChange={lightbox.setIndex}
          getOrigin={lightbox.getOrigin}
        />

        <Reveal className="mt-10 text-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener"
            className="btn-ig"
          >
            <InstagramIcon className="h-4 w-4" />
            {t.portofolio.igCta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
