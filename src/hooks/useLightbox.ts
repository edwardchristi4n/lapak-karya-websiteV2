import { useCallback, useRef, useState } from "react";

/**
 * State untuk <Lightbox>: index foto yang terbuka + elemen thumbnail asal
 * tiap foto (untuk animasi zoom dari/ke kartu).
 *
 * Satu index boleh punya beberapa elemen asal (mis. tata letak mobile &
 * desktop yang dirender bersamaan); yang dipakai adalah yang sedang terlihat.
 */
export function useLightbox() {
  const [index, setIndex] = useState<number | null>(null);
  const origins = useRef(new Map<number, Set<HTMLElement>>());

  /** Pasang di elemen area foto: `ref={originRef(i)}`. */
  const originRef = useCallback(
    (i: number) => (el: HTMLElement | null) => {
      if (!el) return;
      let set = origins.current.get(i);
      if (!set) {
        set = new Set();
        origins.current.set(i, set);
      }
      set.add(el);
      return () => {
        set.delete(el);
      };
    },
    [],
  );

  const getOrigin = useCallback((i: number) => {
    const set = origins.current.get(i);
    if (!set) return null;
    for (const el of set) if (el.getClientRects().length > 0) return el;
    return null;
  }, []);

  return { index, setIndex, open: setIndex, originRef, getOrigin };
}
