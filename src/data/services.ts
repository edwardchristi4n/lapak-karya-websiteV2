export interface Service {
  id: string;
  image: string;
  gradient: string;
  badgeClass?: string;
}

export const SERVICES: Service[] = [
  {
    id: "hardbox",
    image: "/img/layanan-hardbox.jpg",
    gradient: "from-lk-indigo to-lk-sky",
    badgeClass: "bg-lk-indigo/10 text-lk-indigo",
  },
  {
    id: "magnet",
    image: "/img/layanan-magnet.jpg",
    gradient: "from-lk-red to-lk-orange",
  },
  {
    id: "paperbag",
    image: "/img/layanan-paperbag.jpg",
    gradient: "from-lk-yellow to-lk-green",
  },
  {
    id: "seserahan",
    image: "/img/layanan-seserahan.jpg",
    gradient: "from-lk-orange to-lk-yellow",
  },
  {
    id: "souvenir",
    image: "/img/layanan-souvenir.jpg",
    gradient: "from-lk-sky to-lk-green",
  },
  {
    id: "prototipe",
    image: "/img/layanan-prototipe.jpg",
    gradient: "from-lk-indigo to-lk-red",
    badgeClass: "bg-lk-green/15 text-[#4d7d17]",
  },
];
