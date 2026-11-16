import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Faq } from "./components/sections/Faq";
import { Hero } from "./components/sections/Hero";
import { Keunggulan } from "./components/sections/Keunggulan";
import { Kontak } from "./components/sections/Kontak";
import { Layanan } from "./components/sections/Layanan";
import { Marquee } from "./components/sections/Marquee";
import { Mitra } from "./components/sections/Mitra";
import { Perbandingan } from "./components/sections/Perbandingan";
import { Portofolio } from "./components/sections/Portofolio";
import { Prestasi } from "./components/sections/Prestasi";
import { Proses } from "./components/sections/Proses";
import { Tentang } from "./components/sections/Tentang";
import { UntukSiapa } from "./components/sections/UntukSiapa";

export default function App() {
  return (
    <>
      <div className="rainbow-bar h-1.5 w-full" />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Tentang />
        <Mitra />
        <Prestasi />
        <Layanan />
        <Perbandingan />
        <Keunggulan />
        <Portofolio />
        <UntukSiapa />
        <Proses />
        <Faq />
        <Kontak />
      </main>
      <Footer />
    </>
  );
}
