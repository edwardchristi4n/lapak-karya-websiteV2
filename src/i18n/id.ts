/**
 * Kamus bahasa Indonesia, sekaligus sumber kebenaran bentuk (type).
 * Konvensi penulisan: penekanan inline pakai **teks** (dirender RichText),
 * placeholder pakai {nama}.
 */
const dict = {
  meta: {
    title: "Lapak Karya | Custom Packaging Premium Jogja",
    description:
      "Lapak Karya, pusat packaging custom premium di Yogyakarta. Hardbox, box magnet, paper bag, dan kemasan seni. Tanpa minimal order, tersedia jasa desain, kirim ke seluruh Indonesia.",
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
      "Lapak Karya membuat hardbox, box magnet, paper bag, dan kemasan seni secara **custom & handmade**, rapi sampai ke detail terkecil. **Tanpa minimal order**, bisa dibantu desain, dikirim ke seluruh Indonesia.",
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
      mainLabel: "Widya Herbal · Hardbox premium",
      magnetAlt: "Box magnet",
      magnetLabel: "Box Magnet",
      magnetSub: "Samva Kriya",
      magnetDetail: "Finishing doff + emboss",
      bagAlt: "Paper bag custom",
      bagLabel: "Paper Bag Custom",
      bagSub: "Karya Wastra",
      lowBadgeTop: "Tanpa",
      lowBadgeText: "minimal",
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
    p1: "Lapak Karya adalah usaha **custom packaging premium (hardbox)** di Yogyakarta yang dirintis sejak **2020** oleh pasangan suami-istri berlatar belakang **desain** dan **kerajinan**. Berawal dari hobi membuat karya sekaligus kemasannya, pesanan pertama datang dari UMKM di Rumah Kreatif BUMN (RKB) Jogja.",
    p2: "Berbeda dari softbox cetak massal, kami fokus pada **hardbox custom yang rapi, kokoh, dan detail** untuk brand yang tidak butuh ribuan pcs, tapi ingin tampil beda.",
    workshopAlt: "Rumah produksi Lapak Karya di Jl. Minggiran, Yogyakarta",
    founderAlt: "Tim Lapak Karya",
    tuguAlt: "Tugu Yogyakarta",
    tuguCaption: "Dibuat di rumah produksi kami sendiri di Jogja.",
    visiTitle: "Visi",
    visi: "Menyediakan segala macam kebutuhan packaging/kemasan yang menjawab kebutuhan global.",
    misiTitle: "Misi",
    misi: [
      "Menciptakan packaging inovatif, kreatif, dan solutif untuk branding usaha.",
      "Menciptakan packaging yang berkelanjutan dan ramah lingkungan.",
      "Menciptakan packaging berkonsep kearifan lokal Nusantara.",
    ],
    values: [
      {
        title: "Industri hijau",
        desc: "Sisa bahan produksi diolah jadi produk daur ulang, dengan budaya kerja 5S yang rapi.",
      },
      {
        title: "Dekat dengan warga",
        desc: "Pemiliknya aktif di Karang Taruna setempat dan meraih Juara 1 Karang Taruna Preneur 2025.",
      },
      {
        title: "Pemberdayaan inklusif",
        desc: "Melibatkan yayasan, pemuda, santri/mahasiswa, masyarakat berkebutuhan khusus, dan pengrajin.",
      },
    ],
  },
  mitra: {
    eyebrow: "Mitra & Jejaring Kerja Sama",
    title: "Dipercaya oleh brand, UMKM, dan **institusi**.",
    subtitle:
      "Berawal dari rekomendasi mulut ke mulut, kini Lapak Karya masuk 3 besar pencarian packaging custom di Google. Dipercaya UMKM Jogja hingga pelanggan di luar pulau.",
    prev: "Mitra sebelumnya",
    next: "Mitra berikutnya",
    goTo: "Ke mitra",
    ctaHeadline: "Pelanggan langganan kami rutin repeat order setiap 3 bulan.",
    ctaSub: "Bahkan pelanggan di Kalimantan tetap memesan, meski ongkos kirimnya lebih mahal dari harga kemasannya.",
    joinTitle: "Brand-mu berikutnya di sini?",
    joinCta: "Jadi mitra kami",
    partners: {
      rkb: {
        tag: "Mitra pertama",
        name: "Rumah Kreatif BUMN Jogja",
        description:
          "Pesanan kemasan tas untuk UMKM binaan, kolaborasi yang mengawali perjalanan Lapak Karya.",
      },
      dinkop: {
        tag: "Pemerintah daerah",
        name: "Dinkop UKM Jogja",
        description:
          "Dinas Koperasi dan UKM, mitra pembinaan dan pengembangan usaha Lapak Karya.",
      },
      plut: {
        tag: "Pendampingan usaha",
        name: "PLUT Jogja",
        description:
          "Pusat Layanan Usaha Terpadu yang mendampingi UMKM Jogja agar naik kelas.",
      },
      sibakul: {
        tag: "Ekosistem UMKM",
        name: "Sibakul Jogja",
        description:
          "Ekosistem pembinaan UMKM di Daerah Istimewa Yogyakarta.",
      },
      ibisma: {
        tag: "Inkubator bisnis",
        name: "IBISMA",
        description:
          "Inkubator bisnis tempat Lapak Karya meraih Juara 3 Inbis IBISMA Dinkop DIY 2022.",
      },
      kemenkop: {
        tag: "Pemerintah pusat",
        name: "Kemenkop UKM",
        description:
          "Kementerian Koperasi dan UKM. Lapak Karya masuk 10 besar nasional program Entradef Development 2023.",
      },
      kemendag: {
        tag: "Pemerintah pusat",
        name: "Kementerian Perdagangan RI",
        description:
          "Kementerian yang mendorong produk UMKM Indonesia menjangkau pasar lebih luas.",
      },
      ppei: {
        tag: "Pelatihan ekspor",
        name: "PPEI",
        description:
          "Pusat Pelatihan Ekspor Indonesia yang membekali UMKM untuk menembus pasar ekspor.",
      },
      bi: {
        tag: "Pengembangan UMKM",
        name: "Bank Indonesia",
        description:
          "Bank sentral Indonesia yang aktif mendukung pengembangan UMKM lokal.",
      },
      iccn: {
        tag: "Komunitas kreatif",
        name: "ICCN",
        description:
          "Indonesia Creative Cities Network, jejaring kota dan kabupaten kreatif se-Indonesia.",
      },
      tda: {
        tag: "Komunitas pengusaha",
        name: "Komunitas TDA",
        description:
          "Komunitas Tangan Di Atas, jejaring pengusaha untuk belajar dan bertumbuh bersama.",
      },
    } as Record<string, { tag: string; name: string; description: string }>,
  },
  prestasi: {
    eyebrow: "Prestasi & Legalitas",
    title: "Usaha resmi dengan **rekam jejak prestasi**.",
    subtitle:
      "Konsisten berprestasi sejak 2022 dan sudah berbadan hukum lengkap, jadi kamu memesan dari usaha yang jelas dan terpercaya.",
    awards: [
      { title: "Juara 1 Karang Taruna Preneur", org: "Program Sosial", year: "2025" },
      { title: "Top Five JCSF", org: "Jogja Creative Startup Fest", year: "2025" },
      { title: "10 Besar Pekan Inovasial", org: "Karang Taruna DIY", year: "2024" },
      { title: "10 Besar Nasional Entradef Development", org: "Pendampingan Usaha Kemenkop", year: "2023" },
      { title: "Juara 3 Sentra Kewirausahaan Pemuda", org: "DIKPORA DIY", year: "2022" },
      { title: "Juara 3 Inbis IBISMA", org: "Dinkop DIY", year: "2022" },
    ],
    legalTitle: "Legalitas usaha",
    legal: [
      { label: "Akta PT", desc: "Berbadan hukum perseroan terbatas" },
      { label: "NIB", desc: "Nomor Induk Berusaha" },
      { label: "IUMK", desc: "Izin Usaha Mikro Kecil" },
      { label: "HKI Merek", desc: "Hak Kekayaan Intelektual Merek Lapak Karya terdaftar" },
    ],
  },
  perbandingan: {
    eyebrow: "Hardbox vs Softbox",
    title: "Hardbox atau softbox? Kenali bedanya.",
    subtitle:
      "Belum tahu bedanya? Ini gambaran singkat supaya kamu bisa memilih kemasan yang paling pas untuk produkmu.",
    hardbox: {
      name: "Hardbox",
      badge: "Spesialisasi Lapak Karya",
      summary: "Kotak kaku premium yang dirakit handmade.",
    },
    softbox: {
      name: "Softbox",
      summary: "Kotak lipat cetak massal yang umum di pasaran.",
    },
    rows: [
      {
        aspect: "Bahan",
        hardbox: "Karton board tebal, kaku dan keras, dilapisi kertas art/fancy",
        softbox: "Paper sheet (kertas tipis) yang lembut dan mudah dilipat",
      },
      {
        aspect: "Kekuatan",
        hardbox: "Kaku dan kokoh, melindungi produk",
        softbox: "Ringan dan lentur, lebih mudah penyok",
      },
      {
        aspect: "Kesan unboxing",
        hardbox: "Premium dan eksklusif, sering disimpan atau dipakai ulang",
        softbox: "Standar, umumnya dibuang setelah dibuka",
      },
      {
        aspect: "Kustomisasi",
        hardbox: "Bentuk, sekat, bahan, dan finishing bisa sangat detail",
        softbox: "Terbatas pada pola cetak dan potong standar",
      },
      {
        aspect: "Jumlah pesanan",
        hardbox: "Cocok untuk jumlah kecil hingga menengah",
        softbox: "Ekonomis jika memesan ribuan pcs",
      },
      {
        aspect: "Harga per pcs",
        hardbox: "Sebanding dengan kualitas, tetap bisa disesuaikan budget",
        softbox: "Murah jika diproduksi massal",
      },
    ],
    catalog: {
      title: "Katalog produk Lapak Karya",
      desc: "Contoh desain dan ukuran hardbox dalam satu e-book digital yang mudah dilihat dan dibagikan.",
      cta: "Buka Katalog",
      soon: "Katalog sedang disiapkan",
      waCta: "Minta katalog via WhatsApp",
    },
  },
  layanan: {
    eyebrow: "Layanan & Produk",
    title: "Satu tempat untuk semua kemasan custom-mu.",
    subtitle:
      "Ukuran, bahan, warna, dan finishing bisa disesuaikan sepenuhnya dengan kebutuhan produk dan identitas brand.",
    industriesTitle: "Sudah dipercaya untuk packaging",
    industries: ["Fashion", "Hijab", "Perhiasan", "Kosmetik", "Parfum", "Kerajinan", "Kuliner"],
    services: {
      hardbox: {
        title: "Hardbox Premium",
        description:
          "Kotak kaku berlapis kertas art/fancy. Model buka-tutup, laci (slot), mailer pita, hingga mailer magnet. Cocok untuk produk eksklusif.",
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
          "Kemasan untuk momen spesial seperti pernikahan, lamaran, hari raya, dan corporate gift.",
      },
      souvenir: {
        title: "Kemasan Souvenir & Seni",
        description:
          "Kemasan untuk kerajinan, karya seni, aksesori, dan merchandise dengan sentuhan artistik.",
      },
      prototipe: {
        title: "Prototipe & Tugas Kuliah",
        description:
          "Butuh kemasan untuk tugas sekolah, tugas kuliah, atau uji pasar? Kami bantu wujudkan dengan rapi.",
        badge: "Mahasiswa",
      },
    } as Record<string, { title: string; description: string; badge?: string }>,
  },
  keunggulan: {
    eyebrow: "Kenapa Lapak Karya",
    title1: "Dikerjakan dengan tangan.",
    title2: "**dirancang untuk brand-mu.**",
    subtitle:
      "Kami bukan pabrik massal. Kami workshop kecil yang teliti, untuk pelanggan yang peduli detail.",
    features: [
      {
        title: "Tanpa minimal order",
        desc: "Order berapa pun bisa. Cocok untuk brand baru, uji pasar, atau edisi terbatas.",
      },
      {
        title: "Jasa desain",
        desc: "Belum punya desain? Kami bantu mulai dari template, mockup 2D/3D, hingga rendering. Jasa desain bisa didiskusikan terlebih dahulu.",
      },
      {
        title: "Model & desain variatif",
        desc: 'Buka-tutup, laci, mailer pita, mailer magnet, sampai permintaan "neko-neko".',
      },
      {
        title: "Fast response",
        desc: "Respons cepat dan pengerjaan tepat waktu untuk kamu yang butuh efisien.",
      },
      {
        title: "Kualitas terjamin",
        desc: "Dirakit handmade dan dicek satu per satu agar aman dan rapi sampai tujuan.",
      },
      {
        title: "Harga terjangkau",
        desc: "Disesuaikan dengan budget yang kamu siapkan, tanpa mengorbankan kualitas.",
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
      bag: "Paper Bag & Tas",
      seni: "Souvenir & Seni",
    } as Record<string, string>,
    items: {
      "hb-ucca": { label: "Hardbox UCCA aksen bunga", alt: "Hardbox UCCA aksen bunga" },
      "hb-hunge": { label: "Hardbox tutup lepas Hunge", alt: "Hardbox tutup lepas Hunge" },
      "hb-parfum": { label: "Hardbox parfum dengan insert", alt: "Hardbox parfum dengan insert" },
      "hb-navy": { label: "Hardbox navy logo emas", alt: "Hardbox navy logo emas" },
      "hb-marmer": { label: "Hardbox motif marmer", alt: "Hardbox motif marmer" },
      "hb-bata": { label: "Hardbox hitam aksen oranye", alt: "Hardbox hitam aksen oranye" },
      "hb-laci": { label: "Hardbox laci geser", alt: "Hardbox laci geser" },
      "hb-hotprint": { label: "Hardbox navy hotprint emas", alt: "Hardbox navy hotprint emas" },
      "mg-eid-popup": { label: "Box magnet Idulfitri pop-up", alt: "Box magnet Idulfitri pop-up" },
      "mg-natal-snack": { label: "Box magnet hampers Natal", alt: "Box magnet hampers Natal" },
      "mg-eid": { label: "Box magnet Eid Mubarak", alt: "Box magnet Eid Mubarak" },
      "mg-handle": { label: "Box magnet dengan handle", alt: "Box magnet dengan handle" },
      "mg-natal": { label: "Box magnet Selamat Hari Natal", alt: "Box magnet Selamat Hari Natal" },
      "mg-christmas": { label: "Box magnet Merry Christmas", alt: "Box magnet Merry Christmas" },
      "mg-wonderful": { label: "Box magnet Wonderful Indonesia", alt: "Box magnet Wonderful Indonesia" },
      "mg-jasmine": { label: "Box magnet jasmine paper", alt: "Box magnet jasmine paper" },
      "bg-karyawastra": { label: "Paper bag Karya Wastra", alt: "Paper bag Karya Wastra" },
      "bg-jinjing": { label: "Box jinjing dengan handle", alt: "Box jinjing dengan handle" },
      "bg-boxbag": { label: "Box bag kraft berjendela", alt: "Box bag kraft berjendela dengan tali pita" },
      "bg-gable": { label: "Gable box dengan handle", alt: "Gable box dengan handle" },
      "bg-sinaras": { label: "Box jinjing edukasi Sinaras", alt: "Box jinjing edukasi Sinaras" },
      "bg-pillow": { label: "Pillow box hitam", alt: "Pillow box hitam" },
      "bg-kraft": { label: "Pillow bag kraft bertali", alt: "Pillow bag kraft bertali" },
      "bg-ribbon": { label: "Box hampers bertali pita", alt: "Box hampers bertali pita" },
      "sn-jam": { label: "Box hadiah jam tangan", alt: "Box hadiah jam tangan" },
      "sn-dakon": { label: "Box permainan Dikon Dakon", alt: "Box permainan Dikon Dakon" },
      "sn-kaos": { label: "Box kaos merchandise", alt: "Box kaos merchandise" },
      "sn-manikmaya": { label: "Hotprint emas & emboss", alt: "Hotprint emas & emboss" },
      "sn-uglybijoux": { label: "Kemasan perhiasan UglyBijoux", alt: "Kemasan perhiasan UglyBijoux" },
      "sn-floral": { label: "Box floral ucapan terima kasih", alt: "Box floral ucapan terima kasih" },
      "sn-bouquet": { label: "Bouquet box florist", alt: "Bouquet box florist" },
      "sn-lexi": { label: "Box board game ilustrasi", alt: "Box board game ilustrasi" },
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
        title: "Instansi & acara",
        desc: "Kebutuhan instansi, seserahan, souvenir pernikahan, hampers, dan corporate gift.",
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
        a: "**Tidak ada minimal order**, pesan berapa pun bisa. Cocok untuk brand baru, uji pasar, atau kamu yang masih bingung menentukan jumlah.",
      },
      {
        q: "Berapa lama waktu pengerjaannya?",
        a: "Estimasi dihitung setelah desain final disetujui, tergantung jumlah dan detail kemasan. Jadwal produksi akan kami sampaikan saat penawaran.",
      },
      {
        q: "Apa bedanya hardbox dengan softbox?",
        a: "Hardbox dibuat dari karton tebal yang dilapisi kertas, kaku dan kokoh, serta memberi kesan **premium**. Softbox dari karton tipis yang dicetak lalu dilipat, lebih ekonomis untuk produksi massal. Lapak Karya berfokus pada **hardbox custom**.",
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
        q: "Apakah Lapak Karya sudah berbadan hukum?",
        a: "Sudah. Lapak Karya memiliki **Akta PT, NIB, IUMK**, dan merek yang terdaftar di **HKI (Hak Kekayaan Intelektual) Merek**.",
      },
      {
        q: "Saya belum punya desain, bisa dibantu?",
        a: "Tentu bisa. Kami bantu dari template (model, ukuran, bahan, warna), mockup visual 2D/3D, hingga rendering sebelum produksi. Mengenai jasa desain ini, **bisa didiskusikan terlebih dahulu** bersama tim kami.",
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
    emailLabel: "Email",
    ctaWa: "Chat WhatsApp",
    ctaMaps: "Buka di Google Maps",
    mapTitle: "Lokasi Lapak Karya",
  },
  footer: {
    tagline: "Custom Packaging Premium",
    description:
      "Custom packaging premium dari Yogyakarta, dibuat handmade dengan semangat pemberdayaan. Karena Lapak Karya, berkarya dengan cinta.",
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
    katalog: "Halo Lapak Karya, saya dari website dan ingin melihat katalog produk.",
    produk: "Halo Lapak Karya, saya dari website dan tertarik dengan produk:",
  },
  lightbox: {
    dialog: "Pratinjau foto produk",
    view: "Lihat foto",
    hint: "Lihat detail",
    close: "Tutup",
    prev: "Foto sebelumnya",
    next: "Foto berikutnya",
    ask: "Tanya produk ini",
    thumbs: "Pilih foto",
  },
  unboxing: {
    showcaseAlt: "Showcase kemasan premium Lapak Karya",
    showcaseTag: "Showcase Kemasan",
    showcaseTitle: "Hardbox premium, handmade di Yogyakarta",
  },
};

export type Dict = typeof dict;
export default dict;
