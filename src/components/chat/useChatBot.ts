import { useCallback, useEffect, useRef, useState } from "react";
import { CHAT_CONFIG } from "../../data/chatbot";
import { useI18n } from "../../i18n";

export interface ChatMessage {
  id: number;
  role: "me" | "bot";
  text: string;
  showWa?: boolean;
  waQuestion?: string;
}

interface GeminiTurn {
  role: "user" | "model";
  parts: { text: string }[];
}

interface Stats {
  day: string;
  ok: number;
  fail: number;
  local: number;
  off: number;
  tokens: number;
}

interface OfflineState {
  until: number;
  reason: string;
}

interface ChatError extends Error {
  status: number;
  daily: boolean;
  retrySec: number;
}

const store = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key: string, value: unknown) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      return;
    }
  },
};

const pacificDay = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "America/Los_Angeles" });

const emptyStats = (): Stats => ({
  day: pacificDay(),
  ok: 0,
  fail: 0,
  local: 0,
  off: 0,
  tokens: 0,
});

export function esc(t: string): string {
  return t.replace(/[&<>"]/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c] ?? c,
  );
}

export function md(t: string): string {
  const lines = esc(t.trim()).split("\n");
  let out = "";
  let inList = false;
  for (const raw of lines) {
    const l = raw
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, "$1<i>$2</i>");
    const m = l.match(/^\s*(?:[-*•]|\d+\.)\s+(.*)/);
    if (m) {
      if (!inList) {
        out += '<ul class="my-1 list-disc space-y-0.5 pl-4">';
        inList = true;
      }
      out += `<li>${m[1]}</li>`;
    } else {
      if (inList) {
        out += "</ul>";
        inList = false;
      }
      out += l ? `<p>${l}</p>` : "";
    }
  }
  return out + (inList ? "</ul>" : "");
}

async function parseError(res: Response): Promise<ChatError> {
  let info: {
    error?: {
      message?: string;
      details?: Array<{ retryDelay?: string; violations?: Array<{ quotaId?: string }> }>;
    };
  } = {};
  try {
    info = (await res.json()) as typeof info;
  } catch {
    const e = new Error(`${res.status}`) as ChatError;
    e.status = res.status;
    e.daily = false;
    e.retrySec = 0;
    return e;
  }
  const details = info.error?.details ?? [];
  const retry = details.find((d) => d.retryDelay)?.retryDelay;
  const quota = details
    .flatMap((d) => d.violations ?? [])
    .map((v) => v.quotaId ?? "")
    .filter(Boolean)
    .join(", ");
  const e = new Error(
    res.status === 429
      ? `429${quota ? " " + quota : ""}${retry ? " retry " + retry : ""}`
      : `${res.status} ${info.error?.message ?? ""}`,
  ) as ChatError;
  e.status = res.status;
  e.daily = /PerDay/i.test(quota);
  e.retrySec = parseFloat(retry ?? "0") || 0;
  return e;
}

interface LocalFaqEntry {
  keys: RegExp;
  answer: string;
}

function findLocal(text: string, fromButton: boolean, faq: LocalFaqEntry[]) {
  const q = text.toLowerCase();
  if (!fromButton && q.split(/\s+/).length > CHAT_CONFIG.LOCAL_MAX_WORDS)
    return null;
  return faq.find((f) => f.keys.test(q)) ?? null;
}

export function useChatBot() {
  const { locale, t } = useI18n();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 0, role: "bot", text: t.chat.welcome },
  ]);
  const [quick, setQuick] = useState<string[]>(t.chat.initialQuick);
  const [busy, setBusy] = useState(false);
  const [stats, setStats] = useState<Stats>(() => {
    const s = store.get<Stats>("lk_chat_stats", emptyStats());
    return s.day === pacificDay() ? s : emptyStats();
  });
  const [model, setModelState] = useState(() =>
    store.get<string>("lk_chat_model", CHAT_CONFIG.MODEL),
  );
  const [offline, setOfflineState] = useState<OfflineState>(() =>
    store.get<OfflineState>("lk_chat_offline", { until: 0, reason: "" }),
  );
  const [lastStatus, setLastStatus] = useState("-");
  const [, setTick] = useState(0);

  const busyRef = useRef(false);
  const idRef = useRef(1);
  const historyRef = useRef<GeminiTurn[]>([]);
  const modelRef = useRef(model);
  const offlineRef = useRef(offline);
  const cooldownRef = useRef<number | undefined>(undefined);
  const startedRef = useRef(false);

  useEffect(() => {
    modelRef.current = model;
  }, [model]);
  useEffect(() => {
    offlineRef.current = offline;
  }, [offline]);

  // ganti bahasa sebelum percakapan dimulai -> perbarui welcome & quick reply
  useEffect(() => {
    if (startedRef.current) return;
    setMessages([{ id: 0, role: "bot", text: t.chat.welcome }]);
    setQuick(t.chat.initialQuick);
  }, [locale, t]);

  useEffect(() => {
    const id = window.setInterval(() => setTick((t) => t + 1), 15000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    return () => window.clearTimeout(cooldownRef.current);
  }, []);

  const setStatsSafe = (updater: (prev: Stats) => Stats) => {
    setStats((prev) => {
      const next = updater(prev);
      store.set("lk_chat_stats", next);
      return next;
    });
  };

  const setOffline = useCallback((ms: number, reason = "") => {
    const next: OfflineState = {
      until: ms ? Date.now() + ms : 0,
      reason,
    };
    store.set("lk_chat_offline", next);
    offlineRef.current = next;
    setOfflineState(next);
  }, []);

  const isOffline = () =>
    !CHAT_CONFIG.AI_ENABLED || Date.now() < offlineRef.current.until;

  const aiUsed = () => stats.ok + stats.off;

  const patchMessage = (id: number, patch: Partial<ChatMessage>) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  };

  const askApi = async (onText: (soFar: string) => void) => {
    const url = import.meta.env.VITE_CHAT_API_URL || "/api/chat";
    const contents = historyRef.current.slice(
      -(CHAT_CONFIG.MAX_HISTORY_TURNS * 2 + 1),
    );
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: modelRef.current,
        contents,
        suggestions: CHAT_CONFIG.SUGGESTIONS,
        locale,
      }),
    });
    if (!res.ok || !res.body) throw await parseError(res);

    const reader = res.body.getReader();
    const dec = new TextDecoder();
    let buf = "";
    let full = "";
    let usage: { totalTokenCount?: number } | null = null;
    for (;;) {
      const { value, done } = await reader.read();
      if (done) break;
      buf += dec.decode(value, { stream: true });
      const lines = buf.split("\n");
      buf = lines.pop() ?? "";
      for (const line of lines) {
        if (!line.startsWith("data:")) continue;
        let chunk: {
          candidates?: Array<{
            content?: { parts?: Array<{ thought?: boolean; text?: string }> };
          }>;
          usageMetadata?: { totalTokenCount?: number };
        };
        try {
          chunk = JSON.parse(line.slice(5));
        } catch {
          continue;
        }
        const parts = chunk.candidates?.[0]?.content?.parts ?? [];
        const t = parts
          .filter((p) => !p.thought)
          .map((p) => p.text ?? "")
          .join("");
        if (t) onText((full += t));
        if (chunk.usageMetadata) usage = chunk.usageMetadata;
      }
    }
    return { full, usage };
  };

  const send = useCallback(
    async (raw: string, fromButton = false) => {
      const text = raw.trim().slice(0, CHAT_CONFIG.MAX_INPUT_CHARS);
      if (!text || busyRef.current) return;
      busyRef.current = true;
      startedRef.current = true;
      setBusy(true);
      setQuick([]);

      const meId = idRef.current++;
      const botId = idRef.current++;
      setMessages((prev) => [
        ...prev,
        { id: meId, role: "me", text },
        { id: botId, role: "bot", text: "" },
      ]);

      const finish = (patch: Partial<ChatMessage>, quickItems?: string[]) => {
        patchMessage(botId, patch);
        if (quickItems) setQuick(quickItems);
      };

      const local = findLocal(text, fromButton, t.chat.localFaq);
      if (local) {
        await new Promise((r) => setTimeout(r, 450));
        finish(
          { text: local.answer, showWa: true, waQuestion: text },
          t.chat.defaultQuick,
        );
        setStatsSafe((prev) => ({ ...prev, local: prev.local + 1 }));
        setLastStatus("lokal · 0 tok");
        busyRef.current = false;
        setBusy(false);
        return;
      }

      if (isOffline()) {
        await new Promise((r) => setTimeout(r, 400));
        finish(
          { text: t.chat.offline, showWa: true, waQuestion: text },
          t.chat.defaultQuick,
        );
        setLastStatus(CHAT_CONFIG.AI_ENABLED ? "offline" : "AI dimatikan");
        busyRef.current = false;
        setBusy(false);
        return;
      }

      if (aiUsed() >= CHAT_CONFIG.AI_LIMIT_PER_VISITOR) {
        finish({ text: t.chat.visitorLimit, showWa: true, waQuestion: text });
        setLastStatus("limit pengunjung");
        busyRef.current = false;
        setBusy(false);
        return;
      }

      historyRef.current.push({ role: "user", parts: [{ text }] });
      const callStart = Date.now();
      try {
        const { full, usage } = await askApi((soFar) => {
          const visible = soFar.split("[[")[0];
          if (visible.trim()) patchMessage(botId, { text: visible });
        });
        const tok = usage?.totalTokenCount ?? 0;
        setStatsSafe((prev) => ({ ...prev, tokens: prev.tokens + tok }));
        const ms = Math.round(performance.now() - callStart);

        if (/\[\[LUAR\]\]/.test(full)) {
          historyRef.current.pop();
          finish(
            { text: t.chat.offTopic, showWa: true, waQuestion: "" },
            t.chat.defaultQuick,
          );
          setStatsSafe((prev) => ({ ...prev, off: prev.off + 1 }));
          setLastStatus(`luar konteks · ${tok} tok`);
        } else {
          const clean = full.replace(/\[\[[\s\S]*?\]\]/g, "").trim();
          const sug = full.match(/\[\[SARAN:([\s\S]*?)\]\]/);
          historyRef.current.push({ role: "model", parts: [{ text: clean }] });
          finish(
            {
              text: clean || t.chat.fallback,
              showWa: true,
              waQuestion: text,
            },
            sug
              ? sug[1]
                  .split("|")
                  .map((s) => s.trim())
                  .filter(Boolean)
                  .slice(0, 3)
              : [],
          );
          setStatsSafe((prev) => ({ ...prev, ok: prev.ok + 1 }));
          setLastStatus(`${tok} tok · ${(ms / 1000).toFixed(1)}s`);
        }
      } catch (err) {
        historyRef.current.pop();
        setStatsSafe((prev) => ({ ...prev, fail: prev.fail + 1 }));
        const e = err as ChatError;
        const status = e.status ?? 0;
        setLastStatus(
          e.message?.startsWith("429") ? e.message : `error ${status}`,
        );
        if (status === 429 && e.daily) {
          setOffline(CHAT_CONFIG.OFFLINE_DAILY_MIN * 60000, "kuota harian");
        } else if (status === 429) {
          setOffline(Math.max(60, e.retrySec + 5) * 1000, "batas per menit");
        } else if (status !== 0) {
          setOffline(
            CHAT_CONFIG.OFFLINE_ERROR_MIN * 60000,
            `error ${status || "jaringan"}`,
          );
        }
        finish(
          { text: t.chat.offline, showWa: true, waQuestion: text },
          t.chat.defaultQuick,
        );
      } finally {
        const wait = Math.max(
          0,
          CHAT_CONFIG.COOLDOWN_MS - (Date.now() - callStart),
        );
        cooldownRef.current = window.setTimeout(() => {
          busyRef.current = false;
          setBusy(false);
        }, wait);
      }
    },
    [setOffline, stats, t],
  );

  const setModel = (m: string) => {
    store.set("lk_chat_model", m);
    modelRef.current = m;
    setModelState(m);
  };

  const resetStats = () => {
    const fresh = emptyStats();
    store.set("lk_chat_stats", fresh);
    setStats(fresh);
    setOffline(0);
    setLastStatus("-");
  };

  return {
    messages,
    quick,
    busy,
    send,
    stats,
    aiLeft: Math.max(0, CHAT_CONFIG.AI_LIMIT_PER_VISITOR - aiUsed()),
    model,
    setModel,
    offlineNow: isOffline(),
    lastStatus,
    resetStats,
  };
}
