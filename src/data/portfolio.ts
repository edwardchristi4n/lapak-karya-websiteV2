export const PORTFOLIO_FILTERS = [
  { id: "all", color: "#5a58a8" },
  { id: "hardbox", color: "#e2362b" },
  { id: "magnet", color: "#f2873a" },
  { id: "bag", color: "#79b82b" },
  { id: "seni", color: "#2ea7df" },
] as const;

export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number]["id"];
export type PortfolioCategory = Exclude<PortfolioFilter, "all">;

export interface PortfolioItem {
  id: string;
  image: string;
  cat: PortfolioCategory;
  /** titik fokus crop foto (class object-position Tailwind), default tengah */
  focus?: string;
}

/** Jumlah foto per tampilan; setiap filter (termasuk "Semua") selalu sebanyak ini. */
export const PORTFOLIO_PER_VIEW = 8;

/**
 * Ukuran tile berdasarkan POSISI (bukan foto) agar grid 4 kolom × 3 baris
 * selalu penuh di setiap filter: 1 tile besar, 1 tile lebar, sisanya kecil.
 */
export const PORTFOLIO_SPANS = [
  "col-span-2 row-span-2",
  "",
  "",
  "",
  "",
  "col-span-2",
  "",
  "",
];

const img = (id: string) => `/img/portofolio/${id}.webp`;

/**
 * Karya asli Lapak Karya (Google Maps & Instagram @lapakkarya), 8 per kategori.
 * Urutan dalam tiap kategori = urutan tampil (posisi 1 = tile besar,
 * posisi 6 = tile lebar). Label ada di i18n (portofolio.items).
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  // Hardbox
  { id: "hb-ucca", image: img("hb-ucca"), cat: "hardbox" },
  { id: "hb-hunge", image: img("hb-hunge"), cat: "hardbox" },
  { id: "hb-parfum", image: img("hb-parfum"), cat: "hardbox" },
  { id: "hb-navy", image: img("hb-navy"), cat: "hardbox" },
  { id: "hb-marmer", image: img("hb-marmer"), cat: "hardbox" },
  { id: "hb-bata", image: img("hb-bata"), cat: "hardbox" },
  { id: "hb-laci", image: img("hb-laci"), cat: "hardbox" },
  { id: "hb-hotprint", image: img("hb-hotprint"), cat: "hardbox" },
  // Box Magnet
  { id: "mg-eid-popup", image: img("mg-eid-popup"), cat: "magnet" },
  { id: "mg-natal-snack", image: img("mg-natal-snack"), cat: "magnet" },
  { id: "mg-eid", image: img("mg-eid"), cat: "magnet" },
  { id: "mg-handle", image: img("mg-handle"), cat: "magnet" },
  { id: "mg-natal", image: img("mg-natal"), cat: "magnet" },
  { id: "mg-christmas", image: img("mg-christmas"), cat: "magnet" },
  { id: "mg-wonderful", image: img("mg-wonderful"), cat: "magnet" },
  { id: "mg-jasmine", image: img("mg-jasmine"), cat: "magnet" },
  // Paper Bag & Tas
  { id: "bg-karyawastra", image: img("bg-karyawastra"), cat: "bag" },
  { id: "bg-jinjing", image: img("bg-jinjing"), cat: "bag" },
  { id: "bg-boxbag", image: img("bg-boxbag"), cat: "bag" },
  { id: "bg-gable", image: img("bg-gable"), cat: "bag" },
  { id: "bg-sinaras", image: img("bg-sinaras"), cat: "bag" },
  { id: "bg-pillow", image: img("bg-pillow"), cat: "bag" },
  { id: "bg-kraft", image: img("bg-kraft"), cat: "bag" },
  { id: "bg-ribbon", image: img("bg-ribbon"), cat: "bag", focus: "object-[center_80%]" },
  // Souvenir & Seni
  { id: "sn-jam", image: img("sn-jam"), cat: "seni" },
  { id: "sn-dakon", image: img("sn-dakon"), cat: "seni" },
  { id: "sn-kaos", image: img("sn-kaos"), cat: "seni" },
  { id: "sn-manikmaya", image: img("sn-manikmaya"), cat: "seni" },
  { id: "sn-uglybijoux", image: img("sn-uglybijoux"), cat: "seni" },
  { id: "sn-floral", image: img("sn-floral"), cat: "seni" },
  { id: "sn-bouquet", image: img("sn-bouquet"), cat: "seni" },
  { id: "sn-lexi", image: img("sn-lexi"), cat: "seni" },
];

/** Pilihan untuk filter "Semua": 2 karya terbaik dari tiap kategori. */
export const PORTFOLIO_FEATURED = [
  "mg-eid-popup",
  "hb-ucca",
  "bg-jinjing",
  "sn-dakon",
  "mg-natal-snack",
  "hb-bata",
  "sn-jam",
  "bg-boxbag",
];

const BY_ID = new Map(PORTFOLIO_ITEMS.map((item) => [item.id, item]));

/** Foto yang tampil untuk sebuah filter (selalu PORTFOLIO_PER_VIEW foto). */
export function portfolioView(filter: PortfolioFilter): PortfolioItem[] {
  const list =
    filter === "all"
      ? PORTFOLIO_FEATURED.map((id) => BY_ID.get(id)).filter(
          (item): item is PortfolioItem => item !== undefined,
        )
      : PORTFOLIO_ITEMS.filter((item) => item.cat === filter);
  return list.slice(0, PORTFOLIO_PER_VIEW);
}
