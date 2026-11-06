import { NAV_ITEMS } from "../../data/nav";
import { SITE } from "../../data/site";
import { fill, useI18n } from "../../i18n";
import { goHome } from "../../lib/nav";
import { waLink } from "../../lib/wa";
import {
  ArrowUpIcon,
  InstagramIcon,
  MapsLogoIcon,
  WhatsAppIcon,
} from "../icons";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="relative overflow-hidden border-t border-ink/10 bg-cream text-ink">
      <div className="rainbow-bar h-1.5 w-full" />
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-lk-indigo/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-lk-sky/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 lg:px-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <a href="#beranda" onClick={goHome} className="inline-flex items-center gap-3">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-white p-2 shadow-card ring-1 ring-ink/5">
                <img
                  src="/assets/logo_mark.svg"
                  alt="Logo Lapak Karya"
                  className="h-full w-auto"
                />
              </span>
              <span className="leading-tight">
                <span className="block font-display text-xl font-extrabold tracking-wide">
                  LAPAK KARYA
                </span>
                <span className="block text-xs font-medium text-ink-mute">
                  {t.footer.tagline}
                </span>
              </span>
            </a>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-soft">
              {t.footer.description}
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener"
                aria-label="Instagram"
                className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#833AB4] via-[#C13584] to-[#E1306C] text-white shadow-card transition hover:-translate-y-0.5"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener"
                aria-label="Google Maps"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#EA4335] text-white shadow-card transition hover:-translate-y-0.5"
              >
                <MapsLogoIcon className="h-5 w-5" />
              </a>
              <a
                href={waLink(t.wa.default)}
                target="_blank"
                rel="noopener"
                aria-label="WhatsApp"
                className="grid h-11 w-11 place-items-center rounded-full bg-[#25A244] text-white shadow-card transition hover:-translate-y-0.5"
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-mute">
                {t.footer.navHeading}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                {NAV_ITEMS.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="group inline-flex items-center transition hover:text-ink"
                    >
                      <span className="h-px w-0 bg-lk-orange transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {t.nav.items[item.id]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-mute">
                {t.footer.serviceHeading}
              </p>
              <ul className="mt-5 space-y-3 text-sm text-ink-soft">
                {t.footer.serviceLinks.map((label) => (
                  <li key={label}>
                    <a
                      href="#layanan"
                      className="group inline-flex items-center transition hover:text-ink"
                    >
                      <span className="h-px w-0 bg-lk-orange transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-ink-mute">
                {t.footer.contactHeading}
              </p>
              <ul className="mt-5 space-y-4 text-sm text-ink-soft">
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-lk-red">
                    <MapsLogoIcon className="h-5 w-5" />
                  </span>
                  <a
                    href={SITE.mapsUrl}
                    target="_blank"
                    rel="noopener"
                    className="leading-relaxed transition hover:text-ink"
                  >
                    {SITE.address}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-[#25A244]">
                    <WhatsAppIcon className="h-5 w-5" />
                  </span>
                  <a
                    href={waLink(t.wa.default)}
                    className="transition hover:text-ink"
                  >
                    +62 8xx-xxxx-xxxx
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="shrink-0 text-[#E1306C]">
                    <InstagramIcon className="h-5 w-5" />
                  </span>
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener"
                    className="transition hover:text-ink"
                  >
                    {SITE.instagramHandle}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="pointer-events-none mt-16 text-center font-display text-[13vw] leading-none font-extrabold tracking-tight whitespace-nowrap text-ink/[0.04] select-none lg:text-[11rem]"
        >
          LAPAK KARYA
        </p>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 py-6 text-xs text-ink-mute sm:flex-row sm:pr-20">
          <p>{fill(t.footer.rights, { year: new Date().getFullYear() })}</p>
          <p>{t.footer.credit}</p>
          <a
            href="#beranda"
            onClick={goHome}
            className="group inline-flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 font-semibold text-ink-soft transition hover:border-ink/40 hover:text-ink"
          >
            {t.footer.backToTop}
            <ArrowUpIcon className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
