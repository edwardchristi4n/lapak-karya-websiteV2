import { useEffect, useRef, useState } from "react";
import { NAV_ITEMS } from "../../data/nav";
import { useI18n, type Locale } from "../../i18n";
import { goHome } from "../../lib/nav";
import { ArrowRightIcon, CloseIcon, MenuIcon } from "../icons";

function LangToggle() {
  const { locale, setLocale, t } = useI18n();
  const options: Locale[] = ["id", "en"];
  return (
    <div
      role="group"
      aria-label={t.lang.toggle}
      className="flex rounded-full border border-ink/10 bg-white p-0.5"
    >
      {options.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLocale(l)}
          aria-pressed={locale === l}
          className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition ${
            locale === l
              ? "bg-ink text-white"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {t.lang[l]}
        </button>
      ))}
    </div>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navInnerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const setScrollPad = () => {
      const nav = navInnerRef.current;
      document.documentElement.style.scrollPaddingTop = nav
        ? `${nav.offsetHeight}px`
        : "";
    };
    setScrollPad();
    const onDocClick = (e: Event) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('a[href^="#"]')) setScrollPad();
    };
    window.addEventListener("load", setScrollPad);
    window.addEventListener("resize", setScrollPad);
    document.addEventListener("click", onDocClick);
    return () => {
      window.removeEventListener("load", setScrollPad);
      window.removeEventListener("resize", setScrollPad);
      document.removeEventListener("click", onDocClick);
    };
  }, []);

  return (
    <header
      id="navbar"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-cream/95 shadow-card md:bg-cream/85 md:backdrop-blur-md" : ""
      }`}
    >
      <nav
        ref={navInnerRef}
        className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 lg:px-8"
      >
        <a href="#beranda" onClick={goHome} className="flex items-center gap-3">
          <img
            src="/assets/logo_mark.svg"
            alt="Logo Lapak Karya"
            className="h-10 w-auto"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg font-extrabold tracking-wide">
              LAPAK KARYA
            </span>
            <span className="block text-[11px] font-medium text-ink-mute">
              {t.nav.tagline}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="nav-link">
                {t.nav.items[item.id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href="#kontak"
            className="btn-wa hidden py-2.5! sm:inline-flex"
          >
            {t.nav.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white lg:hidden"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <CloseIcon className="h-5 w-5" />
            ) : (
              <MenuIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="border-t border-ink/10 bg-cream px-5 pb-6 lg:hidden">
          <ul className="flex flex-col gap-1 pt-3 text-base font-medium">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-xl px-3 py-3 hover:bg-white"
                >
                  {t.nav.items[item.id]}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#kontak"
            onClick={() => setMenuOpen(false)}
            className="btn-wa mt-4 w-full"
          >
            {t.nav.cta}
            <ArrowRightIcon className="h-4 w-4" />
          </a>
        </div>
      )}
    </header>
  );
}
