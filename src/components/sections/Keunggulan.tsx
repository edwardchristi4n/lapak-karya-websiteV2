import type { ComponentType, SVGProps } from "react";
import { RichText, useI18n } from "../../i18n";
import { useReveal } from "../../hooks/useReveal";
import { Reveal } from "../Reveal";
import {
  CheckCircleIcon,
  HeartIcon,
  LinesIcon,
  PencilIcon,
  StarIcon,
  TruckIcon,
} from "../icons";

const FEATURE_STYLES: Array<{
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  iconWrap: string;
}> = [
  { icon: LinesIcon, iconWrap: "bg-lk-red/15 text-lk-red" },
  { icon: StarIcon, iconWrap: "bg-lk-orange/15 text-lk-orange" },
  { icon: PencilIcon, iconWrap: "bg-lk-yellow/15 text-lk-yellow" },
  { icon: CheckCircleIcon, iconWrap: "bg-lk-green/15 text-lk-green" },
  { icon: TruckIcon, iconWrap: "bg-lk-sky/15 text-lk-sky" },
  { icon: HeartIcon, iconWrap: "bg-lk-indigo/25 text-[#9b99e6]" },
];

export function Keunggulan() {
  const { t } = useI18n();
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      <div className="pointer-events-none absolute -top-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-lk-indigo/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -left-20 h-[28rem] w-[28rem] rounded-full bg-lk-sky/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="eyebrow text-white/60!">
            <span className="h-px w-8 bg-lk-yellow" />
            {t.keunggulan.eyebrow}
          </p>
          <h2 className="mt-4 font-display text-3xl leading-[1.05] font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t.keunggulan.title1}
            <br />
            <RichText
              text={t.keunggulan.title2}
              boldClass="rainbow-text"
            />
          </h2>
          <p className="mt-5 text-white/70">{t.keunggulan.subtitle}</p>
        </Reveal>

        <div
          ref={ref}
          className={`feature-grid reveal relative mt-14 grid isolate gap-px overflow-hidden rounded-4xl bg-[#34365A] ring-1 ring-[#34365A] sm:grid-cols-2 lg:grid-cols-3 ${
            visible ? "is-visible" : ""
          }`}
        >
          {t.keunggulan.features.map((f, i) => {
            const style = FEATURE_STYLES[i] ?? FEATURE_STYLES[0];
            const Icon = style.icon;
            return (
              <div key={f.title} className="bg-ink p-8">
                <div
                  className={`grid h-12 w-12 place-items-center rounded-2xl ${style.iconWrap}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 font-display text-xl font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">
                  {f.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
