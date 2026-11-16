import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { createPortal } from "react-dom";
import { useI18n } from "../i18n";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import { waLink } from "../lib/wa";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, WhatsAppIcon } from "./icons";

export interface LightboxItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  description?: string;
  badge?: string;
  badgeClass?: string;
}

interface LightboxProps {
  items: LightboxItem[];
  /** Index foto yang sedang dibuka; null = tertutup. */
  index: number | null;
  onIndexChange: (index: number | null) => void;
  /**
   * Elemen thumbnail asal tiap item (area foto yang terlihat di kartu).
   * Dipakai untuk animasi foto "terbang" dari kartu ke tengah layar dan kembali.
   */
  getOrigin?: (index: number) => HTMLElement | null;
}

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
/** radius sudut foto di lightbox & thumbnail kartu (rounded-3xl) */
const RADIUS = 24;
const SWIPE_MIN = 50;

const pad = (n: number) => String(n).padStart(2, "0");

function radiusOf(el: HTMLElement) {
  return parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
}

function isInViewport(r: DOMRect) {
  return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
}

/**
 * Keyframe "shared element": foto penuh (rect `to`) dibuat tampak persis seperti
 * thumbnail di kartu. `cover` = kotak <img> thumbnail (object-cover, termasuk
 * zoom hover-nya), `clip` = area foto yang terlihat. Foto penuh diskala sampai
 * menutupi `cover`, lalu dipotong ke `clip` dengan clip-path.
 */
function zoomFrames(clip: DOMRect, cover: DOMRect, to: DOMRect, radius: number): Keyframe[] {
  const s = Math.max(cover.width / to.width, cover.height / to.height);
  const cx = cover.left + cover.width / 2;
  const cy = cover.top + cover.height / 2;
  const halfW = (to.width * s) / 2;
  const halfH = (to.height * s) / 2;
  const inset = (v: number) => Math.max(0, v / s);
  const top = inset(clip.top - (cy - halfH));
  const right = inset(cx + halfW - clip.right);
  const bottom = inset(cy + halfH - clip.bottom);
  const left = inset(clip.left - (cx - halfW));
  return [
    {
      transform: `translate(${cx - (to.left + to.width / 2)}px, ${cy - (to.top + to.height / 2)}px) scale(${s})`,
      clipPath: `inset(${top}px ${right}px ${bottom}px ${left}px round ${radius / s}px)`,
    },
    { transform: "none", clipPath: `inset(0px 0px 0px 0px round ${RADIUS}px)` },
  ];
}

/** Rect area foto + kotak <img> di dalamnya (bisa lebih besar saat di-zoom hover). */
function originRects(origin: HTMLElement) {
  const clip = origin.getBoundingClientRect();
  const cover = (origin.querySelector("img") ?? origin).getBoundingClientRect();
  return { clip, cover };
}

/** Pratinjau foto layar penuh: zoom dari kartu, geser antar foto, keyboard & swipe. */
export function Lightbox(props: LightboxProps) {
  if (props.index === null || props.items.length === 0) return null;
  return createPortal(
    <LightboxDialog {...props} index={props.index} />,
    document.body,
  );
}

function LightboxDialog({
  items,
  index,
  onIndexChange,
  getOrigin,
}: LightboxProps & { index: number }) {
  const { t } = useI18n();
  const reduced = usePrefersReducedMotion();
  const n = items.length;
  const item = items[Math.min(index, n - 1)];

  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const openedRef = useRef(false);
  const closingRef = useRef(false);
  const dirRef = useRef(0);
  const hiddenOriginRef = useRef<HTMLElement | null>(null);
  const frozenRef = useRef<HTMLElement | null>(null);
  const swipeRef = useRef<{ x: number; y: number; moved: boolean } | null>(null);

  const hideOrigin = (el: HTMLElement | null) => {
    showOrigin();
    if (!el) return;
    el.style.visibility = "hidden";
    hiddenOriginRef.current = el;
  };
  const showOrigin = () => {
    if (hiddenOriginRef.current) hiddenOriginRef.current.style.visibility = "";
    hiddenOriginRef.current = null;
  };

  const chrome = () =>
    Array.from(rootRef.current?.querySelectorAll<HTMLElement>(".lb-chrome") ?? []);

  /*
   * Saat dibuka: kunci scroll, bekukan kartu asal, munculkan latar & kontrol.
   * useLayoutEffect & dideklarasikan SEBELUM efek animasi foto, supaya
   * scrollbar sudah hilang (tata letak final) ketika posisi foto diukur.
   */
  useLayoutEffect(() => {
    const html = document.documentElement;
    const prevFocus = document.activeElement as HTMLElement | null;
    const scrollbar = window.innerWidth - html.clientWidth;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    html.style.overflow = "hidden";
    if (scrollbar > 0) html.style.paddingRight = `${scrollbar}px`;

    // Kartu yang sedang di-hover akan kehilangan hover begitu overlay muncul,
    // lalu turun & foto mengecil di balik latar. Tahan di posisi hover-nya.
    const holder = getOrigin?.(index)?.closest<HTMLElement>(".product-card, .zoom-tile");
    if (holder?.matches(":hover")) {
      holder.dataset.lbActive = "";
      frozenRef.current = holder;
    }

    closeBtnRef.current?.focus({ preventScroll: true });

    const anims: Animation[] = [];
    const fade = reduced ? 1 : 320;
    if (backdropRef.current) {
      anims.push(
        backdropRef.current.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: fade,
          easing: "ease",
        }),
      );
    }
    chrome().forEach((el) =>
      anims.push(
        el.animate(
          [
            { opacity: 0, transform: "translateY(12px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: reduced ? 1 : 480, delay: reduced ? 0 : 140, easing: EASE, fill: "backwards" },
        ),
      ),
    );

    return () => {
      anims.forEach((a) => a.cancel());
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
      showOrigin();
      if (frozenRef.current) delete frozenRef.current.dataset.lbActive;
      frozenRef.current = null;
      prevFocus?.focus?.({ preventScroll: true });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // animasi foto: zoom dari kartu saat dibuka, geser-pudar saat ganti foto
  useLayoutEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    let cancelled = false;
    let openingRun = false;
    const started: Animation[] = [];
    img.style.opacity = "0";

    const run = () => {
      if (cancelled || closingRef.current) return;
      img.style.opacity = "1";

      if (!openedRef.current) {
        openedRef.current = true;
        openingRun = true;
        const origin = getOrigin?.(index) ?? null;
        const rects = origin ? originRects(origin) : null;
        if (!reduced && origin && rects && isInViewport(rects.clip)) {
          hideOrigin(origin);
          const anim = img.animate(
            zoomFrames(rects.clip, rects.cover, img.getBoundingClientRect(), radiusOf(origin)),
            { duration: 620, easing: EASE },
          );
          anim.onfinish = showOrigin;
          started.push(anim);
          return;
        }
        started.push(img.animate(
          [
            { opacity: 0, transform: "scale(0.96)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: reduced ? 1 : 360, easing: EASE },
        ));
        return;
      }

      const dx = reduced ? 0 : dirRef.current * 56;
      started.push(
        img.animate(
          [
            { opacity: 0, transform: `translateX(${dx}px) scale(0.985)` },
            { opacity: 1, transform: "none" },
          ],
          { duration: reduced ? 1 : 460, easing: EASE },
        ),
      );
    };

    // tunggu foto siap tampil agar ukuran akhirnya sudah benar
    if (img.complete && img.naturalWidth > 0) run();
    else img.decode().then(run, run);

    // Batalkan animasi run ini saat efek dibersihkan. Di mode development React
    // (StrictMode) efek dijalankan dua kali; tanpa ini animasi "ganti foto" ikut
    // menumpuk di atas animasi zoom pembuka dan foto melompat sedikit di akhir.
    return () => {
      cancelled = true;
      started.forEach((a) => a.cancel());
      if (openingRun) {
        openedRef.current = false;
        showOrigin();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  // muat dulu foto tetangga agar geser terasa instan
  useEffect(() => {
    if (n < 2) return;
    for (const d of [-1, 1]) {
      const pre = new Image();
      pre.src = items[(index + d + n) % n].src;
    }
  }, [index, items, n]);

  const goTo = useCallback(
    (next: number) => {
      if (closingRef.current || next === index) return;
      dirRef.current = next > index ? 1 : -1;
      onIndexChange(next);
    },
    [index, onIndexChange],
  );

  const step = useCallback(
    (delta: number) => {
      if (closingRef.current || n < 2) return;
      dirRef.current = delta;
      onIndexChange((index + delta + n) % n);
    },
    [index, n, onIndexChange],
  );

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const img = imgRef.current;
    const done = () => onIndexChange(null);
    const duration = reduced ? 1 : 300;

    backdropRef.current?.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration,
      easing: "ease",
      fill: "forwards",
    });
    chrome().forEach((el) =>
      el.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: reduced ? 1 : 180,
        fill: "forwards",
      }),
    );
    if (!img) return done();
    img.getAnimations().forEach((a) => a.cancel());

    const origin = getOrigin?.(index) ?? null;
    const rects = origin ? originRects(origin) : null;
    if (!reduced && origin && rects && isInViewport(rects.clip)) {
      hideOrigin(origin);
      const frames = zoomFrames(
        rects.clip,
        rects.cover,
        img.getBoundingClientRect(),
        radiusOf(origin),
      ).reverse();
      const anim = img.animate(frames, { duration: 480, easing: EASE, fill: "forwards" });
      anim.onfinish = () => {
        showOrigin();
        done();
      };
      return;
    }
    img
      .animate(
        [
          { opacity: 1, transform: "none" },
          { opacity: 0, transform: "scale(0.96)" },
        ],
        { duration, easing: EASE, fill: "forwards" },
      )
      .finished.then(done, done);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getOrigin, index, onIndexChange, reduced]);

  // keyboard: Esc, panah kiri/kanan, Tab tetap di dalam dialog
  const onKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    } else if (e.key === "Tab") {
      const focusables = Array.from(
        rootRef.current?.querySelectorAll<HTMLElement>("button, a[href]") ?? [],
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  // swipe (sentuh atau seret mouse) di area foto
  const onPointerDown = (e: ReactPointerEvent) => {
    if (e.button !== 0) return;
    swipeRef.current = { x: e.clientX, y: e.clientY, moved: false };
  };
  const onPointerUp = (e: ReactPointerEvent) => {
    const s = swipeRef.current;
    if (!s) return;
    const dx = e.clientX - s.x;
    const dy = e.clientY - s.y;
    if (Math.abs(dx) > SWIPE_MIN && Math.abs(dx) > Math.abs(dy)) {
      s.moved = true;
      step(dx < 0 ? 1 : -1);
    }
  };
  const onStageClick = (e: ReactMouseEvent) => {
    const swiped = swipeRef.current?.moved;
    swipeRef.current = null;
    if (!swiped && e.target === e.currentTarget) close();
  };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label={t.lightbox.dialog}
      onKeyDown={onKeyDown}
      className="fixed inset-0 z-[100] text-ink"
    >
      <div
        ref={backdropRef}
        onClick={close}
        className="absolute inset-0 bg-ink/90 backdrop-blur-md"
      />

      <div className="pointer-events-none relative flex h-full flex-col gap-4 p-4 pt-[4.5rem] sm:p-6 sm:pt-20 lg:flex-row lg:items-center lg:justify-center lg:gap-10 lg:p-12">
        {/* area foto */}
        <div
          className="pointer-events-auto relative min-h-0 w-full flex-1 touch-pan-y select-none lg:w-auto lg:flex-none"
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onClick={onStageClick}
        >
          <img
            key={item.id}
            ref={imgRef}
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="absolute inset-0 m-auto max-h-full max-w-full rounded-3xl shadow-[0_40px_80px_-24px_rgb(0_0_0/0.6)] will-change-transform lg:static lg:max-h-[calc(100vh-6rem)] lg:max-w-[calc(100vw-30.5rem)]"
          />
          {n > 1 && (
            <>
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label={t.lightbox.prev}
                className="lb-chrome lb-nav left-2 lg:-left-[1.375rem]"
              >
                <ArrowLeftIcon className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label={t.lightbox.next}
                className="lb-chrome lb-nav right-2 lg:-right-[1.375rem]"
              >
                <ArrowRightIcon className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* info produk */}
        <aside className="lb-chrome pointer-events-auto max-h-[42vh] shrink-0 overflow-y-auto rounded-3xl bg-white p-5 shadow-lift sm:p-6 lg:max-h-[calc(100vh-6rem)] lg:w-[22rem]">
          <div className="flex items-center justify-between gap-3">
            <span className="font-display text-sm font-semibold tracking-wide text-ink-mute tabular-nums">
              {pad(index + 1)} / {pad(n)}
            </span>
            {item.badge && (
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${item.badgeClass ?? "bg-ink/5 text-ink"}`}
              >
                {item.badge}
              </span>
            )}
          </div>
          <h2 aria-live="polite" className="mt-2 font-display text-2xl leading-tight font-bold sm:text-[1.7rem]">
            {item.title}
          </h2>
          {item.description && (
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
          )}
          <a
            href={waLink(`${t.wa.produk} ${item.title}`)}
            target="_blank"
            rel="noopener"
            className="btn-wa mt-5 w-full"
          >
            <WhatsAppIcon className="h-4 w-4" />
            {t.lightbox.ask}
          </a>

          {n > 1 && (
            <div
              role="group"
              aria-label={t.lightbox.thumbs}
              className="mt-5 grid grid-cols-6 gap-2"
            >
              {items.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={it.title}
                  aria-current={i === index ? "true" : undefined}
                  className={`lb-thumb aspect-square overflow-hidden rounded-xl ${i === index ? "is-active" : ""}`}
                >
                  <img src={it.src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </aside>
      </div>

      <button
        ref={closeBtnRef}
        type="button"
        onClick={close}
        aria-label={t.lightbox.close}
        className="lb-chrome absolute top-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors duration-200 hover:bg-white/20 sm:top-5 sm:right-5"
      >
        <CloseIcon className="h-5 w-5" />
      </button>
    </div>
  );
}
