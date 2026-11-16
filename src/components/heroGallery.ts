import type { Dict } from "../i18n/id";
import type { LightboxItem } from "./Lightbox";

/** Foto produk di Hero (showcase + dua kartu melayang), urutan = index lightbox. */
export function heroGalleryItems(t: Dict, mainSrc: string): LightboxItem[] {
  const g = t.hero.gallery;
  return [
    {
      id: "hero-main",
      src: mainSrc,
      alt: g.mainAlt,
      title: t.unboxing.showcaseTitle,
      description: g.mainLabel,
      badge: t.unboxing.showcaseTag,
    },
    {
      id: "hero-magnet",
      src: "/assets/samva_kriya.jpg",
      alt: g.magnetAlt,
      title: `${g.magnetLabel} · ${g.magnetSub}`,
      description: g.magnetDetail,
    },
    {
      id: "hero-bag",
      src: "/assets/karya_wastra.jpg",
      alt: g.bagAlt,
      title: `${g.bagLabel} · ${g.bagSub}`,
    },
  ];
}
