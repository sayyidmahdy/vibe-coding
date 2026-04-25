# Implementasi Swagger UI untuk Dokumentasi API

## Deskripsi Tugas
Menambahkan fitur **Swagger UI** ke dalam aplikasi Next.js agar *developer* atau *user* lain dapat dengan mudah melihat, membaca dokumentasi, dan melakukan uji coba (testing) terhadap seluruh endpoint API secara langsung melalui antarmuka web yang interaktif.

Halaman dokumentasi ini nantinya dapat diakses melalui URL: `/api-docs` (atau `/swagger`).

---

## Tahapan Implementasi (Panduan Detail untuk Junior Programmer / AI)

Ikuti langkah-langkah berikut secara berurutan untuk mengimplementasikan Swagger:

### Langkah 1: Instalasi Library
Kita akan menggunakan library bawaan React untuk merender Swagger UI.
1. Buka terminal, pastikan berada di folder proyek (`vibe-app`).
2. Jalankan perintah instalasi library utama:
   ```bash
   npm install swagger-ui-react
   ```
3. Instal juga *type definitions* untuk TypeScript:
   ```bash
   npm install -D @types/swagger-ui-react
   ```

### Langkah 2: Membuat Konfigurasi Spesifikasi OpenAPI (JSON)
Kita perlu mendefinisikan spesifikasi API kita menggunakan format OpenAPI 3.0.
1. Buat file baru di `src/lib/swagger.ts` (buat folder jika belum ada).
2. Di dalam file tersebut, buat objek berformat OpenAPI yang berisi definisi semua rute. Struktur dasarnya seperti ini:
   ```typescript
   export const swaggerSpec = {
     openapi: '3.0.0',
     info: {
       title: 'Vibe App API Documentation',
       version: '1.0.0',
       description: 'Dokumentasi untuk backend authentication Vibe App.',
     },
     components: {
       securitySchemes: {
         BearerAuth: {
           type: 'http',
           scheme: 'bearer',
           bearerFormat: 'UUID', // Karena kita menggunakan UUID token
         },
       },
     },
     paths: {
       // TODO: Definisikan POST /api/users di sini
       // TODO: Definisikan POST /api/users/login di sini
       // TODO: Definisikan GET /api/users/current di sini (tambahkan security: [{ BearerAuth: [] }])
       // TODO: Definisikan DELETE /api/users/logout di sini (tambahkan security: [{ BearerAuth: [] }])
     },
   };
   ```
   *(Tugas Implementator: Lengkapi blok `paths` di atas secara detail untuk ke-4 API yang sudah ada, termasuk request body dan responsenya).*

### Langkah 3: Membuat Halaman UI (Next.js Page)
Langkah ini berfungsi untuk menampilkan halaman antarmuka visual Swagger.
1. Buat direktori/folder baru untuk rute *frontend*: `src/app/api-docs`.
2. Di dalamnya, buat file `page.tsx` (`src/app/api-docs/page.tsx`).
3. Tulis kode berikut. **Penting:** Pastikan menggunakan direktif `'use client'` karena komponen ini merender UI interaktif di sisi klien.
   ```tsx
   'use client';

   import SwaggerUI from 'swagger-ui-react';
   import 'swagger-ui-react/swagger-ui.css'; // Wajib di-import agar style-nya muncul
   import { swaggerSpec } from '@/lib/swagger'; // Path import sesuaikan dengan Langkah 2

   export default function ApiDocsPage() {
     return (
       <div className="container mx-auto p-4">
         <SwaggerUI spec={swaggerSpec} />
       </div>
     );
   }
   ```

### Langkah 4: Verifikasi & Uji Coba
1. Jalankan *development server*: `npm run dev`.
2. Buka browser dan navigasi ke: `http://localhost:3000/api-docs`.
3. Anda seharusnya melihat halaman UI Swagger.
4. Pastikan ada tombol hijau **"Authorize"** di kanan atas (karena kita mendefinisikan `securitySchemes`).
5. Coba lakukan simulasi login melalui Swagger, lalu *copy* tokennya, masukkan ke tombol "Authorize", dan coba panggil API `GET /api/users/current`. Pastikan responsenya berhasil.
