import { SITE } from "../../data/site";
import { RichText, useI18n } from "../../i18n";
import { waLink } from "../../lib/wa";
import { Reveal } from "../Reveal";
import {
  InstagramIcon,
  MapsLogoIcon,
  MapPinIcon,
  WhatsAppIcon,
} from "../icons";

export function Kontak() {
  const { t } = useI18n();

  return (
    <section id="kontak" className="py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-ink text-white">
          <div className="rainbow-bar absolute inset-x-0 top-0 h-2" />
          <div className="grid lg:grid-cols-2">
            <Reveal className="p-8 sm:p-12 lg:p-16">
              <p className="eyebrow text-white/60!">
                <span className="h-px w-8 bg-lk-yellow" />
                {t.kontak.eyebrow}
              </p>
              <h2 className="mt-4 font-display text-4xl leading-[1.05] font-bold tracking-tight sm:text-5xl">
                {t.kontak.title1}
                <br />
                <RichText text={t.kontak.title2} boldClass="rainbow-text" />
              </h2>
              <p className="mt-5 max-w-md text-white/70">{t.kontak.subtitle}</p>

              <ul className="mt-10 space-y-5">
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-lk-red">
                    <MapPinIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-white/50">
                      {t.kontak.workshopLabel}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      {SITE.address}
                    </p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-lk-green">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-white/50">
                      {t.kontak.waLabel}
                    </p>
                    <a
                      href={waLink(t.wa.kontak)}
                      target="_blank"
                      rel="noopener"
                      className="mt-1 block text-sm hover:text-lk-yellow"
                    >
                      +62 8xx-xxxx-xxxx
                    </a>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#E1306C]">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wider uppercase text-white/50">
                      {t.kontak.igLabel}
                    </p>
                    <a
                      href={SITE.instagram}
                      target="_blank"
                      rel="noopener"
                      className="mt-1 block text-sm hover:text-lk-yellow"
                    >
                      {SITE.instagramHandle}
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={waLink(t.wa.kontak)}
                  target="_blank"
                  rel="noopener"
                  className="btn-wa"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {t.kontak.ctaWa}
                </a>
                <a
                  href={SITE.mapsUrl}
                  target="_blank"
                  rel="noopener"
                  className="btn-maps"
                >
                  <MapsLogoIcon className="h-4 w-4" />
                  {t.kontak.ctaMaps}
                </a>
              </div>
            </Reveal>

            <div className="min-h-[360px] p-3 lg:p-4">
              <iframe
                title={t.kontak.mapTitle}
                className="h-full min-h-[360px] w-full rounded-[2rem] grayscale-[30%]"
                src={SITE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
