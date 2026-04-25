# Penulisan Unit Test untuk Seluruh API

## Deskripsi Tugas
Melakukan penulisan *unit test* secara komprehensif untuk seluruh endpoint API yang tersedia guna memastikan stabilitas sistem. Semua file *unit test* harus dikumpulkan secara terpusat di dalam folder baru bernama `test/` pada root proyek.

---

## Daftar Skenario Test (Test Cases)

### 1. API Registrasi (`POST /api/users`)
**Skenario Sukses:**
- Berhasil mendaftarkan user baru dan mengembalikan status 201 dengan data user (id, name, email, created_at).

**Skenario Gagal:**
- Mengembalikan status 400 jika ada *field* (name, email, password) yang kosong.
- Mengembalikan status 400 jika format email tidak valid.
- Mengembalikan status 400 jika password kurang dari 6 karakter.
- Mengembalikan status 400 jika jumlah karakter nama lebih dari 255 karakter.
- Mengembalikan status 400 jika email yang didaftarkan sudah ada di database.

### 2. API Login (`POST /api/users/login`)
**Skenario Sukses:**
- Berhasil login dan mengembalikan status 200 beserta token UUID saat email dan password sesuai.

**Skenario Gagal:**
- Mengembalikan status 400 jika *field* (email, password) kosong.
- Mengembalikan status 400 jika format email tidak valid.
- Mengembalikan status 401 (Invalid credentials) jika email tidak ditemukan.
- Mengembalikan status 401 (Invalid credentials) jika password salah.

### 3. API Get Current User (`GET /api/users/current`)
**Skenario Sukses:**
- Berhasil mengembalikan status 200 beserta objek data user jika token yang dikirimkan di *header* valid.

**Skenario Gagal:**
- Mengembalikan status 401 jika header `Authorization` tidak disertakan.
- Mengembalikan status 401 jika format header salah (tidak menggunakan "Bearer ").
- Mengembalikan status 401 jika token tidak ditemukan di database sesi.

### 4. API Logout (`DELETE /api/users/logout`)
**Skenario Sukses:**
- Berhasil mengembalikan status 200 dengan pesan "Logout success" jika token valid dan sesi berhasil dihapus dari database.

**Skenario Gagal:**
- Mengembalikan status 401 jika header `Authorization` tidak disertakan atau formatnya salah.
- Mengembalikan status 401 jika token tidak ditemukan di database sesi.

---

## Tahapan Implementasi (Panduan High-Level)

1. **Penyesuaian Struktur Folder**
   - Buat folder `test/` di root proyek.
   - Pindahkan *unit test* registrasi yang mungkin sudah ada (misal `route.test.ts` atau `users-service.test.ts`) ke dalam folder `test/` dan rapikan penamaannya (misalnya `test/api/auth.test.ts`).
   
2. **Penyesuaian Konfigurasi Jest**
   - Pastikan file `jest.config.js` di-update agar mendeteksi file test di dalam folder `test/` secara otomatis.
   
3. **Penulisan Skenario Test**
   - Gunakan fitur *mocking* Jest (`jest.mock`) untuk me-mock *Prisma Client* dan *Bcrypt* agar test berjalan secara terisolasi tanpa menyentuh database asli.
   - Implementasikan seluruh skenario sukses dan gagal untuk keempat API di atas menggunakan struktur `describe` dan `it` yang jelas.
   - Lakukan asersi (*assertion*) terhadap **status code HTTP** dan **response body** dari masing-masing *route*.

4. **Verifikasi**
   - Jalankan perintah `npm test` atau `npm run test` untuk memastikan semua skenario berhasil dilewati (PASS) tanpa ada error.
