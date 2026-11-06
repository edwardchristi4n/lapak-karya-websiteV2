import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import idDict, { type Dict } from "./id";
import enDict from "./en";

export type Locale = "id" | "en";

const DICTS: Record<Locale, Dict> = { id: idDict, en: enDict };
const STORAGE_KEY = "lk-locale";

function detectInitialLocale(): Locale {
  if (typeof window === "undefined") return "id";
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "id" || stored === "en") return stored;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "id").toLowerCase();
  if (nav.startsWith("en")) return "en";
  return "id";
}

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Dict;
}

const Ctx = createContext<I18nCtx>({
  locale: "id",
  setLocale: () => {},
  t: idDict,
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectInitialLocale);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const t = DICTS[locale];
    document.documentElement.lang = locale;
    // halaman non-beranda (mis. /mitra.html) mengelola meta-nya sendiri;
    // meta home tidak boleh menimpa milik halaman tersebut.
    const page = window.location.pathname.split("/").pop();
    if (page && page !== "index.html" && page !== "") {
      return;
    }
    document.title = t.meta.title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t.meta.description);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", t.meta.ogLocale);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", t.meta.title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", t.meta.description);
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute("content", t.meta.title);
    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute("content", t.meta.description);
  }, [locale]);

  return (
    <Ctx.Provider value={{ locale, setLocale, t: DICTS[locale] }}>
      {children}
    </Ctx.Provider>
  );
}

export function useI18n() {
  return useContext(Ctx);
}

/** Render string kamus dengan penekanan **bold** (class bisa disesuaikan). */
export function RichText({
  text,
  boldClass = "text-ink",
}: {
  text: string;
  boldClass?: string;
}) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((p, i) =>
        p.startsWith("**") && p.endsWith("**") ? (
          <strong key={i} className={boldClass}>
            {p.slice(2, -2)}
          </strong>
        ) : (
          p
        ),
      )}
    </>
  );
}

/** Ganti {placeholder} dalam template kamus. */
export function fill(template: string, values: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (m, key) =>
    key in values ? String(values[key]) : m,
  );
}

if (import.meta.env.DEV) {
  // Guard dev: pastikan id & en punya struktur & panjang array identik.
  const shape = (a: unknown, b: unknown, path: string): string[] => {
    const errs: string[] = [];
    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) errs.push(`${path}: length ${a.length} vs ${b.length}`);
      for (let i = 0; i < Math.min(a.length, b.length); i++) {
        errs.push(...shape(a[i], b[i], `${path}[${i}]`));
      }
    } else if (typeof a === "object" && a && typeof b === "object" && b) {
      const ra = a as Record<string, unknown>;
      const rb = b as Record<string, unknown>;
      for (const key of new Set([...Object.keys(a), ...Object.keys(b)])) {
        if (!(key in a)) errs.push(`${path}.${key}: missing in id`);
        else if (!(key in b)) errs.push(`${path}.${key}: missing in en`);
        else errs.push(...shape(ra[key], rb[key], `${path}.${key}`));
      }
    }
    return errs;
  };
  const problems = shape(idDict, enDict, "dict");
  if (problems.length > 0) {
    console.warn("[i18n] parity issues:", problems);
  }
}
