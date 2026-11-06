import { useState, type CSSProperties } from "react";
import {
  PORTFOLIO_FILTERS,
  PORTFOLIO_ITEMS,
  type PortfolioFilter,
} from "../../data/portfolio";
import { useI18n } from "../../i18n";
import { Reveal } from "../Reveal";
import { InstagramIcon } from "../icons";
import { SITE } from "../../data/site";

export function Portofolio() {
  const { t } = useI18n();
  const [filter, setFilter] = useState<PortfolioFilter>("all");
  const items =
    filter === "all"
      ? PORTFOLIO_ITEMS
      : PORTFOLIO_ITEMS.filter((item) => item.cat === filter);

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
            role="tablist"
            aria-label={t.portofolio.filterAria}
            className="flex flex-wrap justify-center gap-2"
          >
            {PORTFOLIO_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
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
          {items.map((item) => {
            const text = t.portofolio.items[item.id];
            return (
              <figure
                key={item.id}
                className={`portfolio-item ph group bg-gradient-to-br ${item.gradient} ${item.span}`}
              >
                <img
                  src={item.image}
                  alt={text?.alt ?? item.id}
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/50 to-transparent" />
                <figcaption className="ph-label relative">
                  {text?.label ?? item.id}
                </figcaption>
              </figure>
            );
          })}
        </div>

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
