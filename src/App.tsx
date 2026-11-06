import { ChatWidget } from "./components/chat/ChatWidget";
import { Footer } from "./components/layout/Footer";
import { Navbar } from "./components/layout/Navbar";
import { Faq } from "./components/sections/Faq";
import { Hero } from "./components/sections/Hero";
import { Keunggulan } from "./components/sections/Keunggulan";
import { Kontak } from "./components/sections/Kontak";
import { Layanan } from "./components/sections/Layanan";
import { Marquee } from "./components/sections/Marquee";
import { Mitra } from "./components/sections/Mitra";
import { Portofolio } from "./components/sections/Portofolio";
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
        <Layanan />
        <Keunggulan />
        <Portofolio />
        <UntukSiapa />
        <Proses />
        <Faq />
        <Kontak />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
