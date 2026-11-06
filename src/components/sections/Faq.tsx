import { useState } from "react";
import { RichText, useI18n } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { Reveal } from "../Reveal";
import { WhatsAppIcon } from "../icons";

function FaqItem({
  q,
  a,
  open,
  onToggle,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const panelId = `faq-panel-${q.replace(/\W+/g, "-").toLowerCase()}`;

  return (
    <div
      ref={ref}
      className={`reveal faq-item group rounded-3xl border border-ink/10 bg-cream p-6 ${
        open ? "is-open" : ""
      } ${visible ? "is-visible" : ""}`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-4 text-left font-display text-lg font-bold"
      >
        {q}
        <span className="faq-icon grid h-8 w-8 shrink-0 place-items-center rounded-full text-white">
          +
        </span>
      </button>
      <div className="faq-answer" id={panelId}>
        <div>
          <p className="pt-3 leading-relaxed text-ink-soft">
            <RichText text={a} />
          </p>
        </div>
      </div>
    </div>
  );
}

export function Faq() {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12 lg:px-8">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">
            <span className="h-px w-8 bg-lk-red" />
            {t.faq.eyebrow}
          </p>
          <h2 className="section-title mt-4">{t.faq.title}</h2>
          <p className="mt-4 text-ink-soft">{t.faq.subtitle}</p>
          <a href="#kontak" className="btn-wa mt-6">
            <WhatsAppIcon className="h-4 w-4" />
            {t.faq.cta}
          </a>
        </Reveal>

        <div className="space-y-3 lg:col-span-8">
          {t.faq.items.map((faq, i) => (
            <FaqItem
              key={faq.q}
              q={faq.q}
              a={faq.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
