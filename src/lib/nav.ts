import type { MouseEvent } from "react";

export function goHome(e: MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", "#beranda");
}
