import { useEffect } from "react";
import { PARTNERS } from "../../data/partners";
import { SITE } from "../../data/site";
import { useI18n } from "../../i18n";
import { ArrowLeftIcon } from "../icons";
import { PartnerCard } from "../sections/Mitra";

/**
 * Halaman /mitra.html — menampilkan SELURUH mitra Lapak Karya dalam grid.
 * Berdiri sendiri (tanpa Navbar/Footer anchor halaman utama) dengan
 * header ringkas + tautan kembali ke beranda.
 */
export function MitraPage() {
  const { t, locale } = useI18n();

  useEffect(() => {
    document.title =
      locale === "id" ? "Mitra - Lapak Karya" : "Partners - Lapak Karya";
  }, [locale]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="rainbow-bar h-1.5 w-full" />
      <div className="pointer-events-none absolute top-10 -right-24 h-80 w-80 rounded-full bg-lk-sky/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 -left-24 h-80 w-80 rounded-full bg-lk-yellow/25 blur-3xl" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 lg:px-8">
        <a href="/" className="flex items-center gap-3">
          <img
            src="/assets/logo_mark.svg"
            alt="Lapak Karya"
            className="h-10 w-10"
          />
          <div>
            <p className="font-display text-base leading-tight font-extrabold">
              Lapak Karya
            </p>
            <p className="text-[11px] font-semibold text-ink-mute">
              {SITE.tagline}
            </p>
          </div>
        </a>
        <a
          href="/"
          className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-xs font-bold text-ink-soft transition hover:border-ink hover:text-ink"
        >
          <ArrowLeftIcon className="h-3.5 w-3.5 transition group-hover:-translate-x-0.5" />
          {t.mitraPage.back}
        </a>
      </header>

      <main className="relative mx-auto max-w-7xl px-5 pb-24 lg:px-8">
        <div className="mt-6 text-center">
          <p className="eyebrow justify-center">
            <span className="h-px w-8 bg-lk-orange" />
            {t.mitra.eyebrow}
            <span className="h-px w-8 bg-lk-orange" />
          </p>
          <h1 className="section-title mx-auto mt-4 max-w-3xl">
            {t.mitraPage.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-ink-soft sm:text-lg">
            {t.mitra.subtitle}
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PARTNERS.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} variant="grid" />
          ))}
        </div>
      </main>

      <footer className="relative border-t border-ink/10 bg-white/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-ink-mute sm:flex-row lg:px-8">
          <p>© {new Date().getFullYear()} Lapak Karya</p>
          <a href="/" className="font-semibold text-ink-soft transition hover:text-ink">
            {t.mitraPage.back}
          </a>
        </div>
      </footer>
    </div>
  );
}
