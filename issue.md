# Integrasi Metronic Tailwind Next.js Landings

## Deskripsi Tugas
Melakukan ekstraksi, penyalinan, dan integrasi *template* **Metronic Tailwind Next.js Landings** ke dalam proyek `vibe-app` saat ini. Source file Metronic sudah tersedia di lokal komputer dalam format ZIP. Integrasi ini bertujuan menggabungkan komponen antarmuka modern dari Metronic dengan arsitektur *backend*/API yang sudah dibangun.

**Referensi Dokumentasi:** [Metronic Next.js Docs](https://docs.keenthemes.com/metronic-nextjs)

---

## Tahapan Implementasi (Panduan Detail untuk Junior Programmer / AI)

Ikuti tahapan ini secara berurutan agar integrasi *template* tidak merusak fungsionalitas sistem yang sudah ada:

### Langkah 1: Ekstraksi File ZIP
File master Metronic berada di `c:\downloads\metronic.zip`.
1. Ekstrak file tersebut ke dalam folder sementara, misalnya di `c:\downloads\metronic_extracted`.
   *(Gunakan perintah ekstraksi melalui terminal atau GUI bawaan Windows).*
2. Telusuri folder hasil ekstraksi dan temukan folder spesifik bernama **`metronic-tailwind-nextjs-landings`**. Folder ini yang akan digunakan sebagai sumber referensi kode UI.

### Langkah 2: Penyalinan Asset dan Komponen
Pindahkan struktur UI Metronic ke dalam proyek utama.
1. Salin (copy) folder-folder esensial dari `metronic-tailwind-nextjs-landings/src/` ke dalam `vibe-app/src/`. Biasanya meliputi:
   - `components/` (Berisi base UI seperti button, input, dari Radix UI/KeenThemes)
   - `layouts/` (Berisi *wrapper* layout halaman landing)
   - `core/` atau `hooks/` (Fungsi utilitas UI)
   - `providers/` (State management UI, misal untuk *dark mode*)
   - `assets/` atau `config/` (Jika ada)
2. Salin isi dari folder `metronic-tailwind-nextjs-landings/public/` (seperti gambar, icon, font) ke dalam direktori `vibe-app/public/`.

### Langkah 3: Sinkronisasi Dependensi (package.json)
Metronic bergantung pada pustaka eksternal untuk *styling* dan komponen.
1. Buka file `package.json` yang berada di dalam folder `metronic-tailwind-nextjs-landings`.
2. Bandingkan dengan file `package.json` milik `vibe-app`.
3. Pindahkan *dependencies* yang belum ada (terutama yang berkaitan dengan antarmuka seperti `@radix-ui/*`, `clsx`, `tailwind-merge`, `lucide-react`, `next-themes`) ke dalam `vibe-app`.
4. Jalankan proses instalasi:
   ```bash
   npm install
   ```
   *(Peringatan: Jangan men-downgrade versi Next.js atau Prisma yang sudah terinstal di vibe-app).*

### Langkah 4: Sinkronisasi Konfigurasi Tailwind & CSS
1. Buka file `tailwind.config.ts` (atau `.js`) milik Metronic, lalu salin bagian `theme`, `plugins`, dan pengaturan warna/font ke dalam `vibe-app/tailwind.config.ts`.
2. Pastikan *property* `content` di file Tailwind mencakup seluruh *path* file komponen baru (contoh: `"./src/components/**/*.{js,ts,jsx,tsx}"`).
3. Buka file CSS global Metronic (misalnya `globals.css` atau `style.css`), lalu salin *custom utilities* atau variabel CSS-nya ke dalam `vibe-app/src/app/globals.css`.

### Langkah 5: Setup Global Providers (layout.tsx)
Metronic membutuhkan *Provider* untuk memastikan fungsionalitas UI berjalan lancar.
1. Buka file `vibe-app/src/app/layout.tsx`.
2. Impor komponen *Provider* dari Metronic (seperti `ThemeProvider` atau provider bawaan mereka dari folder `src/providers/`).
3. Bungkus tag `<body>` atau properti `{children}` dengan komponen *Provider* tersebut.

### Langkah 6: Uji Coba dan Verifikasi
1. Jalankan aplikasi:
   ```bash
   npm run dev
   ```
2. Pastikan server berhasil berjalan tanpa error.
3. Buat halaman *dummy* sementara (contoh: `/test-ui`) dan panggil salah satu komponen Metronic (contoh: tombol atau *card*) untuk memverifikasi bahwa Tailwind dan skrip interaktifnya berfungsi dengan baik.
