export interface PortfolioItem {
  id: string;
  image: string;
  cat: string;
  span: string;
  gradient: string;
}

export const PORTFOLIO_FILTERS = [
  { id: "all", color: "#5a58a8" },
  { id: "hardbox", color: "#e2362b" },
  { id: "magnet", color: "#f2873a" },
  { id: "bag", color: "#79b82b" },
  { id: "seni", color: "#2ea7df" },
] as const;

export type PortfolioFilter = (typeof PORTFOLIO_FILTERS)[number]["id"];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "parfum",
    image: "/img/porto-hardbox-parfum.jpg",
    cat: "hardbox",
    span: "col-span-2 row-span-2",
    gradient: "from-lk-indigo via-lk-sky to-lk-sky",
  },
  {
    id: "hampers",
    image: "/img/porto-magnet-hampers.jpg",
    cat: "magnet",
    span: "",
    gradient: "from-lk-red to-lk-orange",
  },
  {
    id: "butik",
    image: "/img/porto-paperbag-butik.jpg",
    cat: "bag",
    span: "",
    gradient: "from-lk-yellow to-lk-green",
  },
  {
    id: "kerajinan",
    image: "/img/porto-kerajinan.jpg",
    cat: "seni",
    span: "",
    gradient: "from-lk-green to-lk-sky",
  },
  {
    id: "laci",
    image: "/img/porto-hardbox-laci.jpg",
    cat: "hardbox",
    span: "",
    gradient: "from-lk-orange to-lk-red",
  },
  {
    id: "seserahan",
    image: "/img/porto-magnet-seserahan.jpg",
    cat: "magnet",
    span: "col-span-2",
    gradient: "from-lk-sky to-lk-indigo",
  },
  {
    id: "umkm",
    image: "/img/porto-tas-umkm.jpg",
    cat: "bag",
    span: "",
    gradient: "from-lk-green to-lk-yellow",
  },
  {
    id: "lukisan",
    image: "/img/porto-lukisan-mini.jpg",
    cat: "seni",
    span: "",
    gradient: "from-lk-indigo to-lk-red",
  },
];
