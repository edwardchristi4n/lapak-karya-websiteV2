import * as THREE from "three";
import { LOGO_SRC } from "./unboxingConfig";

/**
 * Logo Lapak Karya sebagai tekstur — WARNA ASLI dari aset (tanpa tint),
 * digambar apa adanya ke canvas transparan. Ganti LOGO_SRC di
 * unboxingConfig.ts untuk memakai aset lain (SVG/PNG transparan).
 */
export function loadBrandLogoTexture(): Promise<THREE.CanvasTexture> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const size = 512;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas 2d tidak tersedia"));
        return;
      }
      // gambar logo proporsional di tengah, warna asli dipertahankan
      const scale = Math.min(size, size) * 0.86;
      const ar = img.naturalWidth / Math.max(1, img.naturalHeight);
      let w = scale;
      let h = scale;
      if (ar > 1) h = scale / ar;
      else w = scale * ar;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);

      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      resolve(texture);
    };
    img.onerror = () => reject(new Error(`logo gagal dimuat: ${LOGO_SRC}`));
    img.src = LOGO_SRC;
  });
}

/** fallback polos jika logo tidak bisa dimuat — mudah diganti nanti */
export function plainLogoTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.clearRect(0, 0, 512, 512);
  ctx.fillStyle = "#1b1d3a";
  ctx.font = `800 96px "Bricolage Grotesque Variable", sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("LAPAK", 256, 180);
  ctx.fillText("KARYA", 256, 320);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
