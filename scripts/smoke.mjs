import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { countConfettiPixels, countDiffPixels } from "./libPng.mjs";

const distDir = join(fileURLToPath(new URL("..", import.meta.url)), "dist");
const outDir = join(
  fileURLToPath(new URL("..", import.meta.url)),
  ".smoke-shots",
);

const MIME = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};

const server = createServer((req, res) => {
  let path = req.url?.split("?")[0] ?? "/";
  if (path === "/") path = "/index.html";
  const file = join(distDir, path);
  if (!existsSync(file)) {
    res.statusCode = 404;
    res.end("not found");
    return;
  }
  res.setHeader("Content-Type", MIME[extname(file)] ?? "application/octet-stream");
  res.end(readFileSync(file));
});

await new Promise((resolve) => server.listen(4174, resolve));

// pakai browser yang terpasang di mesin ini: Chrome → Edge → Chromium bawaan Playwright
async function launchBrowser() {
  for (const channel of ["chrome", "msedge", undefined]) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      /* coba channel berikutnya */
    }
  }
  throw new Error("Tidak ada browser Chromium yang bisa dijalankan");
}
const browser = await launchBrowser();
const page = await browser.newPage({ viewport: { width: 1360, height: 900 } });

const consoleErrors = [];
page.on("console", (m) => {
  if (m.type() === "error") consoleErrors.push(m.text());
});
page.on("pageerror", (e) => consoleErrors.push(`PAGEERROR: ${e}`));

const results = [];
const check = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? ` — ${detail}` : ""}`);
};

try {
  // pin locale ID (headless browser en-US; default deteksi browser -> EN)
  await page.addInitScript(() => {
    try {
      localStorage.setItem("lk-locale", "id");
    } catch {}
  });
  await page.goto("http://localhost:4174/", { waitUntil: "load", timeout: 30000 });
  await page.waitForSelector("#navbar", { timeout: 15000 });
  check("navbar render", true);

  const sectionIdsEarly = await page.$$eval("section[id]", (els) => els.map((e) => e.id));
  check(
    "section awal (non-lazy) render",
    ["beranda", "tentang", "mitra", "layanan", "portofolio", "proses", "faq", "kontak"]
      .every((id) => sectionIdsEarly.includes(id)),
    sectionIdsEarly.join(","),
  );

  check("footer ada", (await page.locator("footer").count()) === 1);

  const imgBroken = await page.evaluate(() =>
    Array.from(document.images)
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.src),
  );
  check("semua image termuat", imgBroken.length === 0, imgBroken.join(" | "));

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(outDir, "01-hero.png") });

  // ── Pengalaman unboxing 3D di hero (OTOMATIS, tanpa klik) ────────
  await page.waitForSelector("#beranda canvas", { timeout: 25000 });
  const glOk = await page.evaluate(() => {
    const c = document.querySelector("#beranda canvas");
    if (!c) return false;
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  });
  check("konteks WebGL aktif", glOk);

  const heroCanvas = page.locator("#beranda canvas");
  await page.waitForTimeout(300);
  const shotIdle = await heroCanvas.screenshot();
  await page.screenshot({ path: join(outDir, "02-unboxing-idle.png") });

  // auto-start ~0.7s setelah scene siap → opening + confetti meledak.
  // Polling (bukan satu shot) agar tahan terhadap sceneReady yang lambat.
  let shotMid = null;
  let confettiPx = 0;
  for (let attempt = 0; attempt < 10; attempt++) {
    await page.waitForTimeout(300);
    shotMid = await heroCanvas.screenshot();
    confettiPx = countConfettiPixels(shotMid) - countConfettiPixels(shotIdle);
    if (confettiPx > 800) break;
  }
  const diffPx = countDiffPixels(shotIdle, shotMid);
  check(
    "unboxing berjalan otomatis (opening + confetti)",
    diffPx > 5000 && confettiPx > 800,
    `piksel berubah=${diffPx}, piksel confetti=+${confettiPx}`,
  );
  await page.screenshot({ path: join(outDir, "03-unboxing-confetti.png") });

  // tunggu seluruh timeline selesai → showcase + 2 kartu produk terlihat
  await page.waitForTimeout(3600);
  const showcase = page.locator('[data-unboxing="showcase"]');
  const showcaseImgs = await showcase.locator("img").count();
  check(
    "showcase + kartu produk terlihat setelah reveal",
    (await showcase.isVisible()) && showcaseImgs >= 3,
    `img di showcase: ${showcaseImgs}`,
  );
  await page.screenshot({ path: join(outDir, "04-unboxing-showcase.png") });

  // klik sembarang tidak mengulang animasi (showcase tetap)
  await page.mouse.click(680, 450);
  await page.waitForTimeout(600);
  check(
    "tidak bisa restart setelah completed",
    (await showcase.isVisible()),
  );

  // Carousel mitra di section Mitra (tetap di satu halaman)
  const mitra = page.locator("#mitra");
  await mitra.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const mitraCards = await mitra.locator(".partner-card").count();
  check(
    "carousel mitra memuat seluruh mitra",
    mitraCards >= 5,
    `kartu: ${mitraCards}`,
  );
  check(
    "tidak ada link ke halaman mitra terpisah",
    (await mitra.locator('a[href="/mitra.html"]').count()) === 0,
  );
  const mitraTrack = mitra.locator(".partner-card").first().locator("..");
  const scrollBefore = await mitraTrack.evaluate((el) => el.scrollLeft);
  await mitra.getByRole("button", { name: /berikutnya|next/i }).click();
  await page.waitForTimeout(900);
  const scrollAfter = await mitraTrack.evaluate((el) => el.scrollLeft);
  check(
    "tombol next carousel mitra menggeser kartu",
    scrollAfter > scrollBefore,
    `${scrollBefore} -> ${scrollAfter}`,
  );
  await mitra.screenshot({ path: join(outDir, "10-mitra-carousel.png") });

  const porto = page.locator("#portofolio");
  await porto.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const filterButtons = page.locator(".filter-btn");
  await filterButtons.nth(1).click();
  await page.waitForTimeout(600);
  const visiblePorto = await page.$$eval(".portfolio-item", (els) => els.length);
  check("filter portofolio jalan", visiblePorto === 2, `hardbox items: ${visiblePorto}`);
  await page.screenshot({ path: join(outDir, "04-portofolio-filter.png") });

  const faq = page.locator("#faq");
  await faq.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  const faqButtons = page.locator("#faq button[aria-expanded]");
  await faqButtons.nth(2).click();
  await page.waitForTimeout(600);
  const expanded = await faqButtons.nth(2).getAttribute("aria-expanded");
  check("FAQ toggle jalan", expanded === "true", `aria-expanded=${expanded}`);
  await page.screenshot({ path: join(outDir, "05-faq.png") });

  const kontak = page.locator("#kontak");
  await kontak.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await page.screenshot({ path: join(outDir, "06-kontak.png") });

  check("tanpa console error", consoleErrors.length === 0, consoleErrors.slice(0, 5).join(" || "));
} catch (err) {
  check("smoke run", false, String(err));
} finally {
  await browser.close();
  server.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
