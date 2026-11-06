import { useEffect, useRef, useState, type FormEvent } from "react";
import { CHAT_CONFIG } from "../../data/chatbot";
import { fill, useI18n } from "../../i18n";
import { waLink } from "../../lib/wa";
import { md, useChatBot, type ChatMessage } from "./useChatBot";
import { ArrowRightIcon, ChatIcon, CloseIcon, WhatsAppIcon } from "../icons";

function TypingDots() {
  return (
    <span className="inline-flex gap-1 py-1">
      {[0, 150, 300].map((d) => (
        <span
          key={d}
          className="h-1.5 w-1.5 animate-bounce rounded-full bg-ink/40"
          style={{ animationDelay: `${d}ms` }}
        />
      ))}
    </span>
  );
}

function WaCta({ question }: { question?: string }) {
  const { t } = useI18n();
  const message = question
    ? fill(t.chat.waQuestion, { q: question })
    : t.wa.default;
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener"
      className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#25A244] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1E8A39]"
    >
      <WhatsAppIcon className="h-3.5 w-3.5" />
      {t.chat.waCta}
    </a>
  );
}

function BotBubble({ message }: { message: ChatMessage }) {
  return (
    <div className="max-w-[85%] space-y-1.5 rounded-2xl rounded-tl-sm bg-cream p-3">
      {message.text ? (
        <>
          <div dangerouslySetInnerHTML={{ __html: md(message.text) }} />
          {message.showWa && <WaCta question={message.waQuestion} />}
        </>
      ) : (
        <TypingDots />
      )}
    </div>
  );
}

export function ChatWidget() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const {
    messages,
    quick,
    busy,
    send,
    stats,
    aiLeft,
    model,
    setModel,
    offlineNow,
    lastStatus,
    resetStats,
  } = useChatBot();

  const inputRef = useRef<HTMLInputElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, quick]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const value = input;
    setInput("");
    void send(value);
  };

  const modelOptions = [...new Set([model, ...CHAT_CONFIG.MODEL_OPTIONS])];

  return (
    <div className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="w-[calc(100vw-2.5rem)] max-w-sm overflow-hidden rounded-3xl bg-white shadow-lift ring-1 ring-ink/10">
          <div className="flex items-center gap-3 bg-ink p-4 text-white">
            <img
              src="/assets/logo_mark.svg"
              alt=""
              className="h-9 w-9 rounded-full bg-white p-1"
            />
            <div className="flex-1">
              <p className="text-sm font-bold">{t.chat.title}</p>
              <p className="text-[11px] text-white/60">{t.chat.subtitle}</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-full hover:bg-white/10"
              aria-label={t.chat.closeChat}
            >
              <CloseIcon className="h-4 w-4" />
            </button>
          </div>

          {CHAT_CONFIG.SHOW_TEST_PANEL && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-ink/10 bg-lk-yellow/20 px-4 py-2 text-[11px] text-ink-soft">
              <span>
                AI: <b className="text-ink">{stats.ok}</b> ok ·{" "}
                <b className="text-ink">{stats.off}</b> luar konteks ·{" "}
                <b className="text-ink">{stats.fail}</b> gagal
              </span>
              <span>
                Lokal: <b className="text-ink">{stats.local}</b>
              </span>
              <span>
                Sisa jatah pengunjung: <b className="text-ink">{aiLeft}</b>
              </span>
              <span>
                Token: <b className="text-ink">{stats.tokens.toLocaleString("id-ID")}</b>
              </span>
              <span>
                Terakhir: <b className="text-ink">{lastStatus}</b>
              </span>
              <select
                value={model}
                onChange={(e) => setModel(e.target.value)}
                aria-label="Pilih model"
                className="rounded border border-ink/15 bg-white px-1 py-0.5"
              >
                {modelOptions.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={resetStats}
                className="underline"
              >
                reset
              </button>
            </div>
          )}

          {offlineNow && (
            <div
              role="status"
              className="flex items-start gap-2 border-b border-ink/10 bg-[#FFF4E5] px-4 py-3 text-xs text-ink"
            >
              <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-[#F2873A]" />
              <div className="space-y-1.5">
                <p>{t.chat.offline}</p>
                <WaCta />
              </div>
            </div>
          )}

          <div
            ref={bodyRef}
            className="max-h-80 space-y-3 overflow-y-auto p-4 text-sm"
          >
            {messages.map((m) =>
              m.role === "me" ? (
                <div
                  key={m.id}
                  className="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-ink p-3 whitespace-pre-wrap text-white"
                >
                  {m.text}
                </div>
              ) : (
                <BotBubble key={m.id} message={m} />
              ),
            )}
            {quick.length > 0 && !busy && (
              <div className="flex flex-wrap gap-2">
                {quick.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => void send(q, true)}
                    className="rounded-full border border-ink/15 bg-white px-3 py-1.5 text-xs font-semibold hover:border-ink"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={onSubmit} className="flex gap-2 border-t border-ink/10 p-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={busy ? t.chat.placeholderBusy : t.chat.placeholder}
              maxLength={CHAT_CONFIG.MAX_INPUT_CHARS}
              disabled={busy}
              className="flex-1 rounded-full bg-cream px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-lk-sky"
            />
            <button
              type="submit"
              disabled={busy}
              aria-label={t.chat.send}
              className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white disabled:opacity-50"
            >
              <ArrowRightIcon className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group relative grid h-14 w-14 place-items-center rounded-full bg-ink text-white shadow-lift transition hover:scale-105"
        aria-label={open ? t.chat.closeChat : t.chat.openChat}
        aria-expanded={open}
      >
        <span className="rainbow-bar absolute -inset-0.5 -z-10 rounded-full opacity-80 blur-[2px]" />
        {open ? <CloseIcon className="h-6 w-6" /> : <ChatIcon className="h-6 w-6" />}
      </button>
    </div>
  );
}
