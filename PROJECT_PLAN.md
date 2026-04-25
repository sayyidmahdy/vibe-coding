# Project Planning: Next.js + Supabase + Prisma

Dokumen ini berisi instruksi tingkat tinggi (high-level) untuk mengimplementasikan proyek web modern. Dokumen ini dirancang untuk digunakan oleh programmer atau AI assistant (model) guna memulai pengembangan proyek.

## 1. Inisialisasi Proyek Utama
- **Framework:** Next.js (App Router direkomendasikan).
- **Styling:** Tailwind CSS.
- **Bahasa:** TypeScript.
- **Tugas:** 
  1. Jalankan perintah pembuatan proyek Next.js (contoh: `npx create-next-app@latest .`).
  2. Pastikan opsi TypeScript, Tailwind CSS, dan ESLint diaktifkan selama proses instalasi.
  3. Bersihkan *boilerplate* kode bawaan Next.js pada file halaman utama (`app/page.tsx` atau `pages/index.tsx`) agar siap digunakan.

## 2. Setup Database & ORM (Prisma + Supabase)
- **Database:** Supabase (PostgreSQL).
- **ORM:** Prisma.
- **Tugas:**
  1. **Supabase:** Buat proyek baru di dashboard Supabase. Dapatkan `Database URL` (Transaction connection pooler direkomendasikan untuk environment serverless) dan `Direct URL` (untuk migrasi).
  2. **Prisma:** 
     - Instal Prisma CLI sebagai *development dependency* dan Prisma Client.
     - Lakukan inisialisasi Prisma (`npx prisma init`).
     - Atur `schema.prisma` agar terhubung ke provider PostgreSQL.
     - Buat file *singleton* untuk koneksi Prisma Client (misalnya di `lib/prisma.ts` atau `utils/db.ts`) untuk mencegah *connection leak* pada environment Next.js.

## 3. Konfigurasi Environment Variables
- **Tugas:** Buat file `.env` di root proyek dan tambahkan variabel berikut:
  ```env
  # Diambil dari dashboard Supabase
  DATABASE_URL="postgres://[db-user]:[db-password]@[host]:6543/[db-name]?pgbouncer=true"
  DIRECT_URL="postgres://[db-user]:[db-password]@[host]:5432/[db-name]"
  
  # Kredensial Supabase (Opsional, jika menggunakan Supabase Client/Auth)
  NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
  NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
  ```

## 4. Konfigurasi Autentikasi & Supabase Client (Opsional / Jika diperlukan)
- Jika aplikasi membutuhkan fitur *User Authentication* atau akses langsung ke Supabase Storage/Realtime:
- **Tugas:**
  1. Instal `@supabase/ssr` dan `@supabase/supabase-js`.
  2. Buat utility functions (misalnya di direktori `utils/supabase/`) untuk inisialisasi Supabase client pada sisi Server, Browser, dan Middleware sesuai standar dokumentasi Supabase SSR.

## 5. Standar Struktur Direktori (High-Level)
Gunakan struktur direktori yang bersih dan rapi. Contoh:
- `/app` (atau `/pages`): Untuk routing dan halaman UI utama.
- `/components`: Untuk komponen UI modular yang dapat digunakan kembali.
- `/lib` atau `/utils`: Untuk konfigurasi pihak ketiga (seperti inisialisasi Prisma Client dan Supabase Client).
- `/prisma`: Menyimpan file schema Prisma dan file migrasi database.

---
**Catatan untuk Implementator:** 
Fokus pada pengaturan fondasi yang solid. Jangan menambahkan fungsionalitas fitur spesifik (seperti CRUD entitas tertentu) sebelum infrastruktur dasar (Next.js, Tailwind, Prisma, dan Supabase) terhubung dan dapat berjalan dengan baik.
