import { fill, useI18n } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { Reveal } from "../Reveal";
import { WhatsAppIcon } from "../icons";

const STEP_STYLES = [
  { circle: "bg-lk-red", connector: "from-lk-red to-lk-orange" },
  { circle: "bg-lk-orange", connector: "from-lk-orange to-[#d9b92b]" },
  { circle: "bg-[#d9b92b]", connector: "from-[#d9b92b] to-lk-green" },
  { circle: "bg-lk-green", connector: "from-lk-green to-lk-sky" },
  { circle: "bg-lk-sky", connector: "" },
];

function StepItem({ index }: { index: number }) {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLLIElement>();
  const step = t.proses.steps[index];
  const style = STEP_STYLES[index] ?? STEP_STYLES[0];
  if (!step) return null;
  return (
    <li
      ref={ref}
      className={`reveal relative flex items-start gap-4 md:block ${
        visible ? "is-visible" : ""
      }`}
    >
      {style.connector && (
        <span
          className={`step-connector absolute top-14 -bottom-6 left-[22px] w-1 rounded-full bg-gradient-to-b ${style.connector} opacity-40 md:hidden`}
          aria-hidden="true"
        />
      )}
      <span
        className={`relative z-10 mt-2 grid h-12 w-12 shrink-0 place-items-center rounded-full border-4 border-cream font-display text-lg font-bold text-white shadow-card md:mt-0 md:h-14 md:w-14 md:shadow-none ${style.circle}`}
      >
        {index + 1}
      </span>
      <div className="flex-1 rounded-2xl border border-ink/10 bg-white p-4 shadow-card md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none">
        <p className="text-[11px] font-semibold tracking-[0.16em] uppercase text-ink-mute md:hidden">
          {fill(t.proses.stepLabel, { n: index + 1 })}
        </p>
        <h3 className="mt-1 font-display text-lg font-bold md:mt-5">
          {step.title}
        </h3>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{step.desc}</p>
      </div>
    </li>
  );
}

export function Proses() {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLOListElement>();

  return (
    <section id="proses" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span className="h-px w-8 bg-lk-indigo" />
              {t.proses.eyebrow}
            </p>
            <h2 className="section-title mt-4">{t.proses.title}</h2>
          </div>
          <a href="#kontak" className="btn-wa self-start md:self-auto">
            <WhatsAppIcon className="h-4 w-4" />
            {t.proses.cta}
          </a>
        </Reveal>

        <ol
          ref={ref}
          className={`steps-anim reveal relative mt-10 grid gap-4 md:mt-14 md:grid-cols-5 md:gap-6 ${
            visible ? "is-visible" : ""
          }`}
        >
          <div
            className="steps-line rainbow-bar absolute top-7 right-0 left-0 hidden h-1 rounded-full opacity-60 md:block"
            aria-hidden="true"
          />
          {t.proses.steps.map((_, i) => (
            <StepItem key={i} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
