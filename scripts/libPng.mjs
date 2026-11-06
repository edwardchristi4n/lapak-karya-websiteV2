import { inflateSync } from "node:zlib";

/** Dekoder PNG minimal (non-interlaced, 8-bit, RGB/RGBA/gray) untuk
 *  verifikasi piksel screenshot smoke test — tanpa dependensi eksternal. */
export function decodePng(buf) {
  if (buf.readUInt32BE(0) !== 0x89504e47) throw new Error("bukan PNG");
  let pos = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idat = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos);
    const type = buf.toString("ascii", pos + 4, pos + 8);
    const data = buf.subarray(pos + 8, pos + 8 + len);
    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
      if (bitDepth !== 8) throw new Error(`bit depth ${bitDepth} tidak didukung`);
      if (data[12] !== 0) throw new Error("interlaced tidak didukung");
    } else if (type === "IDAT") {
      idat.push(data);
    } else if (type === "IEND") break;
    pos += 12 + len;
  }
  const channels = { 0: 1, 2: 3, 4: 2, 6: 4 }[colorType];
  if (!channels) throw new Error(`color type ${colorType} tidak didukung`);
  const raw = inflateSync(Buffer.concat(idat));
  const stride = width * channels;
  const out = Buffer.alloc(width * height * 4);
  let prev = Buffer.alloc(stride);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    const line = raw.subarray(y * (stride + 1) + 1, (y + 1) * (stride + 1));
    const cur = Buffer.alloc(stride);
    for (let i = 0; i < stride; i++) {
      const a = i >= channels ? cur[i - channels] : 0;
      const b = prev[i];
      const c = i >= channels ? prev[i - channels] : 0;
      let v = line[i];
      if (filter === 1) v = (v + a) & 0xff;
      else if (filter === 2) v = (v + b) & 0xff;
      else if (filter === 3) v = (v + ((a + b) >> 1)) & 0xff;
      else if (filter === 4) {
        const p = a + b - c;
        const pa = Math.abs(p - a);
        const pb = Math.abs(p - b);
        const pc = Math.abs(p - c);
        v = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
      }
      cur[i] = v;
    }
    for (let x = 0; x < width; x++) {
      const o = (y * width + x) * 4;
      const s = x * channels;
      if (channels === 4) {
        out[o] = cur[s]; out[o + 1] = cur[s + 1]; out[o + 2] = cur[s + 2]; out[o + 3] = cur[s + 3];
      } else if (channels === 3) {
        out[o] = cur[s]; out[o + 1] = cur[s + 1]; out[o + 2] = cur[s + 2]; out[o + 3] = 255;
      } else {
        out[o] = out[o + 1] = out[o + 2] = cur[s]; out[o + 3] = channels === 2 ? cur[s + 1] : 255;
      }
    }
    prev = cur;
  }
  return { width, height, data: out };
}

/** jumlah piksel yang berbeda signifikan antar dua screenshot */
export function countDiffPixels(a, b) {
  const da = decodePng(a).data;
  const db = decodePng(b).data;
  let diff = 0;
  for (let i = 0; i < da.length; i += 4) {
    if (
      Math.abs(da[i] - db[i]) > 24 ||
      Math.abs(da[i + 1] - db[i + 1]) > 24 ||
      Math.abs(da[i + 2] - db[i + 2]) > 24
    ) diff++;
  }
  return diff;
}

/** jumlah piksel bernada emas/merah/ungu khas confetti (tak ada di box putih) */
export function countConfettiPixels(png) {
  const { data } = decodePng(png);
  let count = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const gold = r > 150 && g > 110 && b < 130 && r > b + 60 && g > b + 40;
    const red = r > 150 && g < 90 && b < 90;
    const purple = r > 60 && r < 130 && g < 100 && b > 120 && b > r + 20;
    if (gold || red || purple) count++;
  }
  return count;
}
