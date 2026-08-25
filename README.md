# Safari Dakwah 2026 - Islamic Community Landing Page

Landing page resmi dan modern untuk program dakwah terpadu dan kepedulian sosial akhir tahun **"Safari Dakwah 2026"**.

---

## 🎨 Global Styling & Theme System

| Unsur Desain | Spesifikasi | Nilai / Kode Warna |
| :--- | :--- | :--- |
| **Typography** | Modern Clean Sans-Serif | Google Fonts `Poppins` (300, 400, 500, 600, 700, 800) |
| **Primary Color** | Forest / Mosque Dark Green | `#0F3E2B` (Header, Tombol Utama, Footer, Aksen Kritis) |
| **Accent Color** | Warm Sand / Cream | `#F7F2EA`, `#EDE4D3`, `#D8C3A5` (Background Seksi, Kartu, Garis Aksen) |
| **Gold Highlight** | Warm Golden Amber | `#C5A059` (Garis Lengkung Dekoratif, Aksen Ikon) |
| **Body Background** | Pure White & Soft Stone | `#FFFFFF` & `#FAFAF9` |
| **Text Color** | Dark Slate Gray & Pure White | `#1F2937` (pada latar terang), `#FFFFFF` (pada latar gelap) |
| **Icons & Elements**| Line-art SVG Minimalis | Geometri kubah/bintang, dompet, pakaian, sembako, mushaf, medis |

---

## 📑 Struktur Section Sesuai Spesifikasi

1. **Section 1: Navbar (Sticky Header)**
   - Flexbox layout: Logo di kiri, navigasi rata tengah, tombol CTA `DONASI SEKARANG` di kanan.
   - Sticky header dengan efek scroll blur dan active section spy.
   - Menu drawer hamburger responsif untuk perangkat mobile / tablet.

2. **Section 2: Hero Section**
   - Komposisi split seimbang.
   - Headline super besar: `SAFARI DAKWAH 2026`.
   - Sub-headline `KEGIATAN DAKWAH & SOSIAL AKHIR TAHUN` dengan garis lengkung dekoratif (*curved accent wave*).
   - Kolase gambar dinamis: Masjid utama berbingkai Warm Sand/Cream + foto kebersamaan komunitas + floating badge verifikasi amanah.
   - Tombol utama solid Primary Green `DONASI SEKARANG` & live countdown timer menuju hari H.

3. **Section 3: About Us (Tentang Kami)**
   - Split layout: Teks misi di sisi kiri dengan 4 counter statistik dampak (Titik Dakwah, Paket Sembako, Mushaf Quran, Relawan).
   - Sidebar sisi kanan: Gambar fokus masjid dengan semi-transparent dark overlay bertuliskan `"SAFARI 2026: Menggapai Pelosok, Menyinari Hati"`.
   - Kotak informasi terstruktur rata tengah untuk **Waktu Pelaksanaan (20 - 31 Desember 2026)** dan **Wilayah Target (Pelosok & Pesisir Nusantara)**.

4. **Section 4: Our Activities (Kegiatan Kami)**
   - Latar belakang Soft Warm Sand/Cream (`#F7F2EA`).
   - CSS Grid 3 kolom di baris atas dan 2 kolom di baris bawah rata tengah (menjadi 1 kolom di mobile).
   - 5 Kartu kegiatan dengan nomor lingkaran (1–5), ikon line-art, foto autentik beresolusi tinggi, judul tebal, serta badge target capaian.

5. **Section 5: Donation Options (Mari Berdonasi)**
   - CSS Grid horizontal 4 kartu sejajar dengan warna aksen Warm Sand/Cream.
   - 4 Pilihan Donasi: `DONASI UANG`, `PAKAIAN LAYAK PAKAI`, `SEMBAKO`, `AL-QURAN & BUKU ISLAMI`.
   - Interaksi modal dialog panduan dan rincian penyaluran saat kartu diklik.

6. **Section 6: Transfer Methods (Metode Transfer & Donasi)**
   - Latar belakang penuh Primary Dark Green (`#0F3E2B`) dengan motif islami elegan.
   - Grid 2 kolom:
     - **Kolom Kiri (Transfer Bank)**: Kartu cream lembut dengan rincian rekening BSI, Mandiri, BCA, nama pemilik rekening (`An. Yayasan Safari Dakwah Nusantara`), serta tombol **1-Click Copy** nomor rekening beranimasi toast.
     - **Kolom Kanan (QRIS)**: Kartu cream lembut dengan logo standar QRIS Nasional, barcode QR presisi tinggi, sub-header hijau `SCAN QRIS UNTUK DONASI MUDAH`, serta tombol perbesar/download QRIS.

7. **Section 7: Footer & Contact**
   - Latar belakang Primary Dark Green bergradasi ke Warm Sand di bagian bawah dengan motif garis lengkung islami.
   - Kolom pesan terima kasih berhias ikon hati: *"Jazakumullahu Khairan Katsiran atas kebaikan dan ketulusan Anda"*.
   - Formulir kontak & konfirmasi donasi terintegrasi dengan validasi instan.
   - Tautan internal cepat dan ikon sosial media minimalis putih (Instagram, YouTube, WhatsApp, Facebook, TikTok).

---

## 🚀 Cara Menjalankan & Membuka Halaman

Halaman ini dibuat mandiri (*standalone*) menggunakan HTML5, Tailwind CSS, dan Vanilla JavaScript. Anda dapat membukanya langsung di peramban web:

### Opsi 1: Buka langsung file HTML
Cukup buka berkas `index.html` menggunakan browser favorit Anda (Chrome, Edge, Firefox, Safari).

### Opsi 2: Menggunakan Local Server (Python / Node)
```bash
# Menggunakan Python
cd C:\Users\Dell\.gemini\antigravity\scratch\safari-dakwah-2026
python -m http.server 3000

# Atau menggunakan Node / npx serve
npx serve .
```
Lalu buka peramban di `http://localhost:3000`.

