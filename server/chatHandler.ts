const ALLOWED_MODELS = new Set([
  "gemini-3.5-flash-lite",
  "gemini-2.5-flash",
  "gemini-3-flash-preview",
]);
const DEFAULT_MODEL = "gemini-3.5-flash-lite";
const MAX_TURNS = 7;
const MAX_PART_CHARS = 500;
const MAX_TOTAL_CHARS = 6000;
const REQUESTS_PER_HOUR = 30;

interface GeminiTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

interface ChatRequestBody {
  model?: unknown;
  contents?: unknown;
  suggestions?: unknown;
  locale?: unknown;
}

type ChatLocale = "id" | "en";

const buckets = new Map<string, { count: number; reset: number }>();

function jsonError(message: string, status: number): Response {
  return new Response(JSON.stringify({ error: { message } }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function rateLimit(ip: string): boolean {
  const now = Date.now();
  if (buckets.size > 512) {
    for (const [key, bucket] of buckets) {
      if (bucket.reset < now) buckets.delete(key);
    }
  }
  const bucket = buckets.get(ip);
  if (!bucket || bucket.reset < now) {
    buckets.set(ip, { count: 1, reset: now + 3600_000 });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= REQUESTS_PER_HOUR;
}

function sanitizeContents(raw: unknown): GeminiTurn[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const turns: GeminiTurn[] = [];
  for (const turn of raw.slice(-MAX_TURNS)) {
    if (typeof turn !== "object" || turn === null) return null;
    const { role, parts } = turn as { role?: unknown; parts?: unknown };
    if (role !== "user" && role !== "model") return null;
    if (!Array.isArray(parts) || parts.length === 0) return null;
    const texts: string[] = [];
    for (const part of parts) {
      if (typeof part !== "object" || part === null) return null;
      const text = (part as { text?: unknown }).text;
      if (typeof text !== "string" || !text.trim()) return null;
      texts.push(text.slice(0, MAX_PART_CHARS));
    }
    turns.push({ role, parts: [{ text: texts.join("\n") }] });
  }
  const total = turns.reduce((n, t) => n + t.parts[0].text.length, 0);
  if (total > MAX_TOTAL_CHARS) return null;
  if (turns[turns.length - 1].role !== "user") return null;
  return turns;
}

const PROMPTS: Record<ChatLocale, (suggestions: boolean) => string> = {
  id: (suggestions) => `Kamu "Asisten Lapak Karya", asisten chat website Lapak Karya.

GAYA: Bahasa Indonesia santai-sopan, sapa "Kak". Jawab 2-3 kalimat. Daftar (- item) hanya bila perlu. Jika kurang jelas, ajukan 1 pertanyaan balik (produk, jumlah, ukuran, deadline).

INFO:
- Custom packaging premium (spesialis hardbox) di Yogyakarta, sejak 2020. Didirikan pasangan berlatar desain & kerajinan; berawal dari pesanan kemasan tas UMKM binaan Rumah Kreatif BUMN Jogja.
- Workshop kecil, handmade, dicek manual. Tumbuh bersama Karang Taruna Suryodiningratan; melibatkan kelompok rentan.
- Alamat: Jl. Minggiran No.14, RT 51/RW 14, Suryodiningratan, Mantrijeron, Yogyakarta 55141. Instagram @lapakkarya.
- Produk: Hardbox Premium (terlaris; tutup lepas/laci/buku), Box Magnet (hampers, gift), Paper Bag & Tas (logo, pilihan tali), Box Seserahan & Hampers (nikah, lamaran, hari raya, corporate gift), Kemasan Souvenir & Seni, Prototipe & tugas kuliah (1-10 pcs). Ukuran, bahan, warna, finishing (doff, emboss, dll) custom penuh.
- Hanya NON-KULINER (fashion, kosmetik, aksesori, souvenir, seni, hampers). Kemasan makanan tidak dilayani.
- Keunggulan: low minimum order; ahli custom detail/"neko-neko"; dibantu desainer sampai mockup; kirim ke seluruh Indonesia via ekspedisi/kargo.
- Cara pesan: konsultasi gratis -> desain & penawaran (mockup, estimasi harga) -> DP -> produksi handmade -> QC & kirim (lunas sebelum kirim/diambil).

ATURAN:
- Jangan sebut angka harga, minimum order, atau lama pengerjaan pasti; semua dihitung saat konsultasi.
- Jangan mengarang info di luar data di atas; bila tidak tahu, arahkan ke WhatsApp.
- Jika pertanyaan TIDAK berhubungan dengan Lapak Karya, kemasan, atau pemesanan, balas HANYA dengan: [[LUAR]]
${
  suggestions
    ? "- Akhiri jawaban dengan [[SARAN: pertanyaan 1 | pertanyaan 2]] (2 pertanyaan lanjutan singkat, maks 5 kata)."
    : ""
}`,
  en: (suggestions) => `You are the "Lapak Karya Assistant", the chat assistant for the Lapak Karya website.

STYLE: Friendly-polite English, 2-3 sentences. Use lists (- item) only when needed. If anything is unclear, ask one follow-up question (product, quantity, size, deadline).

INFO:
- Premium custom packaging (hardbox specialist) in Yogyakarta, since 2020. Founded by a couple with design & craft backgrounds; started from a bag packaging order for SMEs coached by Rumah Kreatif BUMN Jogja.
- Small workshop, handmade, checked manually. Growing together with the Suryodiningratan Karang Taruna; involves vulnerable groups.
- Address: Jl. Minggiran No.14, RT 51/RW 14, Suryodiningratan, Mantrijeron, Yogyakarta 55141, Indonesia. Instagram @lapakkarya.
- Products: Premium Hardbox (best seller; lift-off lid/drawer/book), Magnetic Box (hampers, gifts), Paper Bags & Totes (logo, strap options), Gift & Hampers Boxes (weddings, engagements, holidays, corporate gifts), Souvenir & Art Packaging, Prototypes & coursework (1-10 pcs). Size, material, color, finish (matte, emboss, etc.) fully custom.
- NON-CULINARY only (fashion, cosmetics, accessories, souvenirs, art, hampers). Food packaging is not served.
- Strengths: low minimum order; custom-detail experts; designer assistance through to mockup; ships across Indonesia via courier/cargo.
- How to order: free consultation -> design & quote (mockup, cost estimate) -> deposit -> handmade production -> QC & delivery (balance paid before shipping/pickup).

RULES:
- Never state prices, minimum order quantities, or exact production times; everything is calculated during consultation.
- Never invent information beyond the data above; if unsure, direct the customer to WhatsApp.
- If the question is NOT related to Lapak Karya, packaging, or ordering, reply ONLY with: [[LUAR]]
${
  suggestions
    ? "- End your answer with [[SARAN: question 1 | question 2]] (2 short follow-up questions, max 5 words each)."
    : ""
}`,
};

export async function handleChat(req: Request): Promise<Response> {
  if (req.method !== "POST") return jsonError("Method not allowed", 405);

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "local";
  if (!rateLimit(ip)) return jsonError("Too many requests", 429);

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return jsonError("Invalid JSON body", 400);
  }

  const contents = sanitizeContents(body.contents);
  if (!contents) return jsonError("Invalid contents", 400);

  const model =
    typeof body.model === "string" && ALLOWED_MODELS.has(body.model)
      ? body.model
      : DEFAULT_MODEL;

  const locale: ChatLocale = body.locale === "en" ? "en" : "id";

  const key = process.env.GEMINI_API_KEY;
  if (!key) return jsonError("Server API key not configured", 500);

  const generationConfig = {
    temperature: 0.5,
    maxOutputTokens: 300,
    ...(model.startsWith("gemini-2.5")
      ? { thinkingConfig: { thinkingBudget: 0 } }
      : {}),
  };

  const upstream = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?alt=sse`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": key,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: PROMPTS[locale](body.suggestions === true) }],
        },
        contents,
        generationConfig,
      }),
    },
  );

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");
    return new Response(
      text || JSON.stringify({ error: { message: `Upstream error ${upstream.status}` } }),
      { status: upstream.status, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!upstream.body) return jsonError("Empty upstream response", 502);

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}
