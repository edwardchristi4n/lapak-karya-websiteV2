import { useI18n } from "../../i18n";

const SPARKLE_CLASSES = [
  "text-lk-yellow",
  "text-lk-green",
  "text-lk-sky",
  "text-lk-orange",
  "text-lk-red",
  "text-lk-indigo",
];

export function Marquee() {
  const { t } = useI18n();
  const doubled = [...t.marquee.items, ...t.marquee.items];
  return (
    <section
      className="border-y border-ink/10 bg-ink py-5 text-white"
      aria-label={t.marquee.ariaLabel}
    >
      <div className="flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10 font-display text-xl font-semibold whitespace-nowrap sm:text-2xl">
          {doubled.map((label, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{label}</span>
              <span className={SPARKLE_CLASSES[i % SPARKLE_CLASSES.length]}>✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
