/**
 * Kamus bahasa Indonesia — sumber kebenaran bentuk (type).
 * Konvensi penulisan: penekanan inline pakai **teks** (dirender RichText),
 * placeholder pakai {nama}.
 */
const dict = {
  meta: {
    title: "Lapak Karya - Custom Packaging Premium Jogja",
    description:
      "Lapak Karya, pusat packaging custom premium di Yogyakarta. Hardbox, box magnet, paper bag, dan kemasan seni. Bisa pesan sedikit, detail rapi, kirim ke seluruh Indonesia.",
    ogLocale: "id_ID",
  },
  lang: {
    toggle: "Ganti bahasa",
    id: "ID",
    en: "EN",
  },
  nav: {
    tagline: "Custom Packaging Premium",
    cta: "Konsultasi Gratis",
    openMenu: "Buka menu",
    closeMenu: "Tutup menu",
    items: {
      tentang: "Tentang",
      mitra: "Mitra",
      layanan: "Layanan",
      portofolio: "Portofolio",
      proses: "Cara Pesan",
      faq: "FAQ",
    } as Record<string, string>,
  },
  hero: {
    badge: "Pusat Packaging Custom · Yogyakarta",
    titleLines: ["Kemasan custom", "yang **bercerita**", "untuk brand-mu."],
    intro:
      "Lapak Karya membuat hardbox, box magnet, paper bag, dan kemasan seni secara **custom & handmade** - rapi sampai ke detail terkecil. Pesan sedikit pun bisa, dikirim ke seluruh Indonesia.",
    ctaWa: "Konsultasi via WhatsApp",
    ctaPortofolio: "Lihat Portofolio",
    stats: {
      since: "Sejak",
      shipTo: "Kirim ke",
      worldwide: "Seluruh",
      worldwideFlag: "Indonesia",
      process: "Pengerjaan",
      customSuffix: " custom",
    },
    gallery: {
      mainAlt: "Hardbox premium buatan Lapak Karya",
      mainLabel: "Widya Herbal - Hardbox premium",
      magnetAlt: "Box magnet",
      magnetLabel: "Box Magnet",
      magnetSub: "Samva Kriya",
      magnetDetail: "Finishing doff + emboss",
      bagAlt: "Paper bag custom",
      bagLabel: "Paper Bag Custom",
      bagSub: "Karya Wastra",
      lowBadgeTop: "Low",
      lowBadgeText: "minimum",
      lowBadgeText2: "order",
    },
  },
  marquee: {
    ariaLabel: "Jenis produk",
    items: [
      "Hardbox Premium",
      "Box Magnet",
      "Paper Bag",
      "Box Seserahan",
      "Kemasan Souvenir",
      "Packaging Karya Seni",
    ],
  },
  tentang: {
    eyebrow: "Tentang Lapak Karya",
    title: "Berawal dari bangku kuliah, tumbuh jadi rumah kemasan custom.",
    p1: "Lapak Karya adalah usaha **custom packaging premium (hardbox)** di Yogyakarta. Berawal dari pesanan pertama Rumah Kreatif BUMN (RKB) Jogja, usaha ini resmi berdiri pada **2020** dengan bekal latar belakang **desain** dan **kerajinan**.",
    p2: "Berbeda dari softbox cetak massal, kami fokus pada **hardbox custom yang rapi, kokoh, dan detail** - untuk brand yang tidak butuh ribuan pcs, tapi ingin tampil beda.",
    workshopAlt: "Workshop dan proses produksi Lapak Karya",
    founderAlt: "Founder Lapak Karya",
    tuguAlt: "Tugu Yogyakarta",
    tuguCaption: "Dibuat di rumah produksi kami sendiri di Jogja.",
    values: [
      {
        title: "Spesialis non-kuliner",
        desc: "Fashion, kosmetik, aksesori, souvenir, hingga karya seni.",
      },
      {
        title: "Karya Karang Taruna",
        desc: "Tumbuh bersama komunitas warga Suryodiningratan.",
      },
      {
        title: "Pemberdayaan Inklusif",
        desc: "Melibatkan kelompok rentan dalam proses produksi.",
      },
    ],
  },
  mitra: {
    eyebrow: "Mitra & Klien Kami",
    title: "Dipercaya oleh brand, UMKM, dan **institusi**.",
    subtitle:
      "Dari UMKM lokal Jogja hingga pelanggan di luar pulau - mereka yang kembali memesan karena kerapian dan detail karya kami.",
    all: "Lihat Semua Mitra",
    ctaHeadline: "Pelanggan langganan kami rutin repeat order setiap musim produksi.",
    ctaSub: "Konsistensi kualitas membuat brand kembali lagi - dari Jogja sampai Kalimantan.",
    joinTitle: "Brand-mu berikutnya di sini?",
    joinCta: "Jadi mitra kami",
    partners: {
      rkb: {
        tag: "Pembinaan UMKM",
        name: "Rumah Kreatif BUMN Jogja",
        description:
          "Kemasan tas untuk UMKM binaan - kolaborasi yang mengawali perjalanan Lapak Karya.",
        logoAlt: "Logo Rumah Kreatif BUMN Jogja",
      },
      mitra2: {
        tag: "Kategori bisnis",
        name: "Nama Mitra 2",
        description:
          "Deskripsi singkat kerja sama, misalnya jenis kemasan yang dibuat untuk mitra ini.",
        logoAlt: "Logo Nama Mitra 2",
      },
      mitra3: {
        tag: "Kategori bisnis",
        name: "Nama Mitra 3",
        description:
          "Deskripsi singkat kerja sama, misalnya jenis kemasan yang dibuat untuk mitra ini.",
        logoAlt: "Logo Nama Mitra 3",
      },
      mitra4: {
        tag: "Kategori bisnis",
        name: "Nama Mitra 4",
        description:
          "Deskripsi singkat kerja sama, misalnya jenis kemasan yang dibuat untuk mitra ini.",
        logoAlt: "Logo Nama Mitra 4",
      },
      mitra5: {
        tag: "Kategori bisnis",
        name: "Nama Mitra 5",
        description:
          "Deskripsi singkat kerja sama, misalnya jenis kemasan yang dibuat untuk mitra ini.",
        logoAlt: "Logo Nama Mitra 5",
      },
    } as Record<string, { tag: string; name: string; description: string; logoAlt: string }>,
  },
  layanan: {
    eyebrow: "Layanan & Produk",
    title: "Satu tempat untuk semua kemasan custom-mu.",
    subtitle:
      "Ukuran, bahan, warna, dan finishing bisa disesuaikan sepenuhnya dengan kebutuhan produk dan identitas brand.",
    services: {
      hardbox: {
        title: "Hardbox Premium",
        description:
          "Kotak kaku berlapis kertas art/fancy. Tutup lepas, laci, atau buku - cocok untuk produk eksklusif.",
        badge: "Terlaris",
      },
      magnet: {
        title: "Box Magnet",
        description:
          "Penutup magnet yang elegan, memberi pengalaman unboxing premium untuk hampers dan gift.",
      },
      paperbag: {
        title: "Paper Bag & Tas",
        description:
          "Tas kertas custom dengan logo brand, tali pilihan, dan ukuran sesuai produk.",
      },
      seserahan: {
        title: "Box Seserahan & Hampers",
        description:
          "Kemasan untuk momen spesial - pernikahan, lamaran, hari raya, dan corporate gift.",
      },
      souvenir: {
        title: "Kemasan Souvenir & Seni",
        description:
          "Kemasan untuk kerajinan, karya seni, aksesori, dan merchandise dengan sentuhan artistik.",
      },
      prototipe: {
        title: "Prototipe & Tugas Kuliah",
        description:
          "Butuh 1-10 pcs untuk tugas desain atau uji pasar? Kami bantu wujudkan dengan rapi.",
        badge: "Mahasiswa",
      },
    } as Record<string, { title: string; description: string; badge?: string }>,
  },
  keunggulan: {
    eyebrow: "Kenapa Lapak Karya",
    title1: "Dikerjakan dengan tangan.",
    title2: "**dirancang untuk brand-mu.**",
    subtitle:
      "Kami bukan pabrik massal. Kami workshop kecil yang teliti - dibuat untuk pelanggan yang peduli detail.",
    features: [
      {
        title: "Pesan sedikit, tetap dilayani",
        desc: "Tidak perlu order ribuan. Cocok untuk brand baru, uji pasar, atau edisi terbatas.",
      },
      {
        title: "Custom sedetail apapun",
        desc: 'Permintaan "neko-neko" justru keahlian kami - bentuk, sekat, bahan, hingga finishing.',
      },
      {
        title: "Didampingi desainer",
        desc: "Founder berlatar belakang desain & kerajinan, siap bantu dari konsep sampai mockup.",
      },
      {
        title: "Handmade, rapi & presisi",
        desc: "Setiap box dirakit dan dicek manual sebelum dikirim ke tanganmu.",
      },
      {
        title: "Kirim ke seluruh Indonesia",
        desc: "Pelanggan kami tersebar dari Jawa sampai Kalimantan, dikirim aman via kargo.",
      },
      {
        title: "Setiap order berdampak",
        desc: "Produksi melibatkan kelompok rentan & komunitas Karang Taruna setempat.",
      },
    ],
  },
  portofolio: {
    eyebrow: "Portofolio",
    title: "Karya yang sudah kami kemas.",
    filterAria: "Filter portofolio",
    igCta: "Lihat lebih banyak di @lapakkarya",
    filters: {
      all: "Semua",
      hardbox: "Hardbox",
      magnet: "Box Magnet",
      bag: "Paper Bag",
      seni: "Souvenir & Seni",
    } as Record<string, string>,
    items: {
      parfum: { label: "Hardbox - Brand parfum lokal", alt: "Hardbox - Brand parfum lokal" },
      hampers: { label: "Box magnet hampers", alt: "Box magnet hampers" },
      butik: { label: "Paper bag butik", alt: "Paper bag butik" },
      kerajinan: { label: "Kemasan kerajinan", alt: "Kemasan kerajinan" },
      laci: { label: "Hardbox laci", alt: "Hardbox laci" },
      seserahan: { label: "Box magnet seserahan", alt: "Box magnet seserahan" },
      umkm: { label: "Tas UMKM Rumah Kreatif", alt: "Tas UMKM Rumah Kreatif" },
      lukisan: { label: "Kemasan lukisan mini", alt: "Kemasan lukisan mini" },
    } as Record<string, { label: string; alt: string }>,
  },
  untukSiapa: {
    eyebrow: "Cocok untuk",
    title: "Siapa pun yang ingin produknya tampil beda.",
    audiences: [
      {
        title: "Brand & UMKM",
        desc: "Yang ingin repeat order kemasan konsisten tiap periode produksi.",
      },
      {
        title: "Pebisnis baru",
        desc: "Butuh kemasan pertama yang meyakinkan tanpa modal besar.",
      },
      {
        title: "Mahasiswa & pelajar",
        desc: "Tugas desain kemasan, prototipe produk, atau pameran karya.",
      },
      {
        title: "Event & hadiah",
        desc: "Seserahan, souvenir pernikahan, hampers, dan corporate gift.",
      },
    ],
  },
  proses: {
    eyebrow: "Cara Pesan",
    title: "Lima langkah dari ide ke kemasan jadi.",
    cta: "Mulai Konsultasi",
    stepLabel: "Langkah {n}",
    steps: [
      {
        title: "Konsultasi",
        desc: "Ceritakan produk, jumlah, dan konsep kemasan impianmu.",
      },
      {
        title: "Desain & Penawaran",
        desc: "Kami kirimkan rekomendasi bahan, mockup, dan estimasi harga.",
      },
      {
        title: "DP & Konfirmasi",
        desc: "Setelah desain disetujui, pembayaran DP untuk memulai produksi.",
      },
      {
        title: "Produksi",
        desc: "Dikerjakan handmade di workshop kami, dengan update progres.",
      },
      {
        title: "QC & Kirim",
        desc: "Dicek satu per satu, dikemas aman, lalu dikirim atau diambil.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ",
    title: "Pertanyaan yang sering ditanyakan.",
    subtitle: "Belum terjawab? Tanyakan langsung ke tim kami.",
    cta: "Hubungi Kami",
    items: [
      {
        q: "Berapa minimal order di Lapak Karya?",
        a: "Kami melayani pesanan dalam jumlah kecil. Minimum order menyesuaikan jenis kemasan dan tingkat kerumitannya - konsultasikan kebutuhanmu dan kami beri rekomendasi terbaik.",
      },
      {
        q: "Berapa lama waktu pengerjaannya?",
        a: "Estimasi dihitung setelah desain final disetujui, tergantung jumlah dan detail kemasan. Jadwal produksi akan kami sampaikan saat penawaran.",
      },
      {
        q: "Apakah menerima kemasan makanan?",
        a: "Kami spesialis kemasan **non-kuliner** - fashion, kosmetik, aksesori, souvenir, karya seni, hampers, dan sejenisnya.",
      },
      {
        q: "Bagaimana sistem pembayarannya?",
        a: "Karena semua pesanan dibuat custom, produksi dimulai setelah pembayaran DP. Pelunasan dilakukan sebelum barang dikirim atau diambil.",
      },
      {
        q: "Bisa kirim ke luar Jogja?",
        a: "Bisa. Kami rutin mengirim ke berbagai kota di seluruh Indonesia menggunakan jasa ekspedisi dan kargo.",
      },
      {
        q: "Saya belum punya desain, bisa dibantu?",
        a: "Tentu. Tim kami berlatar belakang desain dan siap membantu dari konsep, pemilihan bahan, hingga mockup kemasan.",
      },
    ],
  },
  kontak: {
    eyebrow: "Kontak",
    title1: "Punya ide kemasan?",
    title2: "**Yuk wujudkan.**",
    subtitle:
      "Konsultasi gratis. Ceritakan produkmu, kami bantu carikan kemasan yang paling pas.",
    workshopLabel: "Workshop",
    waLabel: "WhatsApp",
    igLabel: "Instagram",
    ctaWa: "Chat WhatsApp",
    ctaMaps: "Buka di Google Maps",
    mapTitle: "Lokasi Lapak Karya",
  },
  footer: {
    tagline: "Custom Packaging Premium",
    description:
      "Karya custom packaging premium dari Yogyakarta. Spesialis non-kuliner, dibuat handmade dengan semangat pemberdayaan.",
    navHeading: "Navigasi",
    serviceHeading: "Layanan",
    contactHeading: "Kontak",
    serviceLinks: [
      "Hardbox Premium",
      "Box Magnet",
      "Paper Bag & Tas",
      "Seserahan & Hampers",
      "Souvenir & Seni",
    ],
    rights: "© {year} Lapak Karya. Semua hak dilindungi.",
    credit: "Dibuat oleh Lapak Karya & Mahasiswa Informatika UAJY",
    backToTop: "Kembali ke atas",
  },
  wa: {
    default: "Halo Lapak Karya, saya dari website dan ingin konsultasi kemasan custom.",
    kontak: "Halo Lapak Karya, saya dari website dan ingin konsultasi kemasan custom.",
  },
  chat: {
    title: "Asisten Lapak Karya",
    subtitle: "Biasanya membalas dalam hitungan menit",
    openChat: "Buka chat",
    closeChat: "Tutup chat",
    send: "Kirim",
    placeholder: "Tulis pertanyaan…",
    placeholderBusy: "Tunggu sebentar…",
    waCta: "Konsultasi via WhatsApp →",
    waQuestion: "Halo Lapak Karya, saya dari website. Saya ingin tanya: {q}",
    welcome: "Halo! 👋 Ada yang bisa kami bantu soal kemasan custom?",
    offline:
      "Mohon maaf, Kak, asisten otomatis kami sedang tidak beroperasi sementara 🙏 Kakak bisa langsung chat admin kami via WhatsApp untuk info lebih jelas.",
    offTopic:
      "Maaf, Kak, pertanyaan itu di luar konteks layanan Lapak Karya 🙏 Aku hanya bisa membantu seputar kemasan custom Lapak Karya.",
    visitorLimit:
      "Kakak sudah banyak bertanya hari ini 😊 Supaya lebih cepat dan detail, lanjutkan langsung dengan tim kami via WhatsApp ya.",
    fallback:
      "Maaf, aku belum bisa menjawab itu. Tim kami siap bantu langsung via WhatsApp ya 🙏",
    initialQuick: ["Minimal order?", "Jenis kemasan", "Cara pesan"],
    defaultQuick: ["Jenis kemasan", "Cara pesan", "Kirim luar kota?"],
    localFaq: [
      {
        keys: /minim|min\.? order|moq|sedikit/,
        answer:
          "Kami melayani pesanan dalam jumlah kecil, Kak 😊 Minimum order menyesuaikan jenis kemasan dan tingkat kerumitannya, jadi paling tepat dikonsultasikan dulu.",
      },
      {
        keys: /jenis|produk|macam|layanan|bikin apa|buat apa/,
        answer:
          "Kami membuat:\n- Hardbox premium (tutup lepas, laci, model buku)\n- Box magnet\n- Paper bag & tas\n- Box seserahan & hampers\n- Kemasan souvenir & karya seni\nSemua custom ukuran, bahan, warna, dan finishing-nya.",
      },
      {
        keys: /cara (pesan|order)|alur|proses|gimana pesan|bagaimana pesan/,
        answer:
          "Alurnya:\n1. Konsultasi gratis\n2. Desain & penawaran (mockup + estimasi harga)\n3. DP & konfirmasi\n4. Produksi handmade\n5. QC & kirim",
      },
      {
        keys: /luar (kota|jogja|pulau)|kirim|ongkir|ekspedisi|kargo/,
        answer:
          "Bisa, Kak. Kami rutin kirim ke seluruh Indonesia lewat ekspedisi dan kargo, pelanggan kami ada dari Jawa sampai Kalimantan.",
      },
      {
        keys: /bayar|pembayaran|dp\b|lunas/,
        answer:
          "Karena semua pesanan custom, produksi dimulai setelah DP. Pelunasan dilakukan sebelum barang dikirim atau diambil.",
      },
      {
        keys: /makanan|kuliner|food|kue/,
        answer:
          "Mohon maaf, Kak, kami spesialis kemasan non-kuliner: fashion, kosmetik, aksesori, souvenir, karya seni, dan hampers.",
      },
      {
        keys: /alamat|lokasi|dimana|di mana|workshop/,
        answer:
          "Workshop kami di Jl. Minggiran No.14, RT 51/RW 14, Suryodiningratan, Mantrijeron, Yogyakarta 55141.",
      },
      {
        keys: /harga|biaya|berapa(an)? (per|satu)|price|budget/,
        answer:
          "Harga tergantung ukuran, bahan, finishing, dan jumlah, Kak. Ceritakan kebutuhanmu lewat WhatsApp, nanti kami kirim estimasi dan mockup-nya.",
      },
      {
        keys: /lama|berapa hari|durasi|deadline|kapan jadi/,
        answer:
          "Lama pengerjaan dihitung setelah desain final disetujui, tergantung jumlah dan detail kemasan. Jadwal produksi kami sampaikan saat penawaran.",
      },
      {
        keys: /desain|mockup|belum punya/,
        answer:
          "Tentu bisa dibantu, Kak. Tim kami berlatar belakang desain dan siap bantu dari konsep, pemilihan bahan, sampai mockup.",
      },
      {
        keys: /^(halo|hai|hi|hello|pagi|siang|sore|malam|assalamualaikum|permisi|p)\b/,
        answer:
          "Halo, Kak! 👋 Ada yang bisa kami bantu soal kemasan custom? Misalnya jenis kemasan, cara pesan, atau pengiriman.",
      },
    ],
  },
  mitraPage: {
    title: "Seluruh Mitra Lapak Karya",
    back: "Kembali ke Beranda",
  },
  unboxing: {
    showcaseAlt: "Showcase kemasan premium Lapak Karya",
    showcaseTag: "Showcase Kemasan",
    showcaseTitle: "Hardbox premium, handmade di Yogyakarta",
  },
};

export type Dict = typeof dict;
export default dict;
