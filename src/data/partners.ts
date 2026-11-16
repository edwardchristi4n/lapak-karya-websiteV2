export type PartnerTone = "red" | "orange" | "yellow" | "green" | "sky" | "indigo";

export interface Partner {
  id: string;
  tone: PartnerTone;
  /** Inisial yang tampil di panel kartu bila belum ada foto kegiatan. */
  monogram: string;
  /** Foto kegiatan bersama mitra, atau kartu logo "Lapak Karya × mitra" (opsional). */
  image?: string;
}

/**
 * Urutan = urutan tampil di carousel: mitra dengan foto kegiatan bersama
 * Lapak Karya lebih dulu, lalu kartu logo "Lapak Karya × mitra".
 * Teks tiap mitra ada di i18n (mitra.partners).
 */
export const PARTNERS: Partner[] = [
  // foto kegiatan bersama
  { id: "bi", tone: "yellow", monogram: "BI", image: "/img/mitra-bi.webp" },
  { id: "kemenkop", tone: "indigo", monogram: "KUKM", image: "/img/mitra-kemenkop.webp" },
  { id: "kemendag", tone: "red", monogram: "KEMENDAG", image: "/img/mitra-kemendag.webp" },
  // kartu logo
  { id: "rkb", tone: "orange", monogram: "RKB", image: "/img/mitra-rkb.webp" },
  { id: "dinkop", tone: "green", monogram: "DK", image: "/img/mitra-dinkop.webp" },
  { id: "plut", tone: "sky", monogram: "PLUT", image: "/img/mitra-plut.webp" },
  { id: "sibakul", tone: "yellow", monogram: "SB", image: "/img/mitra-sibakul.webp" },
  { id: "ibisma", tone: "indigo", monogram: "IBISMA", image: "/img/mitra-ibisma.webp" },
  { id: "ppei", tone: "red", monogram: "PPEI", image: "/img/mitra-ppei.webp" },
  { id: "iccn", tone: "orange", monogram: "ICCN", image: "/img/mitra-iccn.webp" },
  { id: "tda", tone: "green", monogram: "TDA", image: "/img/mitra-tda.webp" },
];
