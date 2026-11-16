export type PartnerTone = "red" | "orange" | "yellow" | "green" | "sky" | "indigo";

export interface Partner {
  id: string;
  tone: PartnerTone;
  /** Inisial yang tampil di panel kartu bila belum ada foto kegiatan. */
  monogram: string;
  /** Foto kegiatan bersama mitra (opsional). */
  image?: string;
}

/** Urutan = urutan tampil di carousel. Teks tiap mitra ada di i18n (mitra.partners). */
export const PARTNERS: Partner[] = [
  { id: "rkb", tone: "red", monogram: "RKB", image: "/img/mitra-rumah-kreatif.jpg" },
  { id: "dinkop", tone: "orange", monogram: "DK" },
  { id: "plut", tone: "yellow", monogram: "PLUT" },
  { id: "sibakul", tone: "green", monogram: "SB" },
  { id: "ibisma", tone: "sky", monogram: "IBISMA" },
  { id: "kemenkop", tone: "indigo", monogram: "KUKM" },
  { id: "kemendag", tone: "red", monogram: "KEMENDAG" },
  { id: "ppei", tone: "orange", monogram: "PPEI" },
  { id: "bi", tone: "yellow", monogram: "BI" },
  { id: "iccn", tone: "green", monogram: "ICCN" },
  { id: "tda", tone: "sky", monogram: "TDA" },
];
