/**
 * Konfigurasi pengalaman unboxing 3D Lapak Karya.
 * Semua dimensi, material, dan parameter animasi dikumpulkan di sini
 * agar mudah disetel tanpa menyentuh komponen.
 *
 * ── CARA MENGGANTI LOGO ──────────────────────────────────────────
 * Ganti LOGO_SRC ke SVG/PNG transparan lain di folder public/.
 * Logo digambar ke canvas APA ADANYA (warna asli aset dipertahankan).
 * Ukuran ideal: persegi ≥ 512px.
 *
 * ── CARA MENGGANTI GAMBAR SHOWCASE ───────────────────────────────
 * Ganti file public/images/packaging-showcase.webp dengan foto kemasan
 * final (rasio ~1:1 atau 4:5, lebar ≥ 1200px). File yang ada sekarang
 * hanyalah PLACEHOLDER (salinan foto produk). Jika file dihapus,
 * komponen otomatis memakai SHOWCASE_FALLBACK.
 */

export type UnboxingPhase = "idle" | "opening" | "celebrating" | "revealing" | "completed";

export const LOGO_SRC = "/assets/logo_mark.svg";
export const SHOWCASE_SRC = "/images/packaging-showcase.webp";
export const SHOWCASE_FALLBACK = "/assets/exosome.jpg";

/** dimensi box (unit dunia three) */
export const BOX = {
  w: 2.4,
  d: 1.8,
  h: 1.4,
  wall: 0.09,
  baseT: 0.1,
  lidH: 0.16,
  /** lid lebih besar sedikit dari badan (rigid box overlap) */
  overlap: 0.07,
  /** sudut buka lid (derajat) — berputar di engsel tepi belakang.
   *  -104° menjaga ujung lid (±3.3 unit) tetap di dalam frame kamera. */
  openAngle: -104,
} as const;

/**
 * Framing kamera per perangkat. `open` = pose saat box terbuka: kamera
 * mundur + naik dan titik pandang (lookY) diangkat agar lid yang
 * terangkat penuh tetap proporsional di dalam canvas.
 */
export const CAMERA = {
  desktop: {
    fov: 34,
    base: [3.4, 2.6, 5.2] as [number, number, number],
    open: [3.3, 3.7, 5.3] as [number, number, number],
    baseLookY: 0.8,
    openLookY: 1.55,
  },
  mobile: {
    fov: 34,
    base: [4.2, 3.2, 6.4] as [number, number, number],
    open: [4.0, 4.0, 6.3] as [number, number, number],
    baseLookY: 0.8,
    openLookY: 1.6,
  },
} as const;

/** material — box putih premium (ink brand) + interior cream */
export const MATERIALS = {
  exterior: { color: "#ffffff", roughness: 0.72, metalness: 0.02 },
  interior: { color: "#f4eee4", roughness: 0.9, metalness: 0 },
  shadow: "#1b1d3a",
} as const;

/** warna confetti: emas, cream, dan warna brand */
export const CONFETTI_COLORS = [
  "#c9a24b",
  "#e8c97a",
  "#f3d95c",
  "#f4eee4",
  "#ffffff",
  "#5a58a8",
  "#e2362b",
] as const;

export function detectMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768
  );
}

export function unboxingTier() {
  const mobile = detectMobile();
  return {
    mobile,
    dprMax: mobile ? 1.5 : 2,
    antialias: !mobile,
    shadowRes: mobile ? 256 : 512,
    confettiCount: mobile ? 50 : 140,
  };
}

/** durasi (detik) tiap segmen timeline GSAP */
export const TIMING = {
  opening: 1.1,
  celebrating: 1.6,
  revealing: 1.2,
  /** jeda antara lid terbuka dan confetti meledak */
  confettiDelay: 0.25,
  /** kamera tiba di framing open bersamaan dengan lid penuh
   *  (mencegah ujung lid sesaat melewati tepi frame) */
  cameraZoom: 1.4,
} as const;

export function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}
