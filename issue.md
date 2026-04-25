# Fitur Login User & Session Management

## Deskripsi Tugas
Mengimplementasikan fitur login untuk user yang sudah terdaftar, beserta pembuatan sesi (session) menggunakan token UUID yang disimpan di database.

## 1. Database Schema (Prisma)
Tambahkan tabel `sessions` dengan struktur berikut:
- `id`: Integer, Auto Increment, Primary Key
- `token`: String/Varchar(255), Not Null, berisi UUID
- `user_id`: Integer, Foreign Key ke tabel `users`
- `created_at`: DateTime/Timestamp, Default Current Timestamp

## 2. API Endpoint
**Endpoint**: `POST /api/users/login`

**Request Body**:
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

**Response Success (200 OK)**:
```json
{
    "token": "123e4567-e89b-12d3-a456-426614174000"
}
```
*(Token UUID di-generate di backend, disimpan ke tabel `sessions`, lalu di-return ke user)*

**Error Handling Responses**:
- **Email Tidak Valid**: `{ "message": "Invalid email" }` (400)
- **Password Terlalu Pendek**: `{ "message": "Password must be at least 6 characters" }` (400)
- **Email Tidak Terdaftar / Password Salah**: `{ "message": "Invalid credentials" }` (401) *(Sesuai kaidah login, pesan error disamakan untuk keamanan)*
- **Error Lainnya**: `{ "message": "Internal server error" }` (500)

## 3. Struktur File & Folder (di dalam `src/`)
Pastikan mengikuti struktur dan konvensi penamaan berikut:
- **Routes** (`app/api/users/login/route.ts`): Berisi routing API Next.js.
- **Services** (`services/sessions-service.ts`): Berisi logic bisnis (cek password, generate UUID, simpan session).
- **Lib** (`lib/prisma-lib.ts`): Berisi instance library Prisma.
- **Utils** (`utils/validator.ts`): Berisi fungsi utilitas seperti pengecekan format email.
- **Interfaces** (`interfaces/session.ts`): Berisi definisi interface untuk Request dan Response login.

---

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI Model)

1. **Update Skema Database (`prisma/schema.prisma`)**
   - Tambahkan model `Session` dengan tipe data yang diminta, jangan lupa tambahkan relasi (*Foreign Key*) ke model `User` yang sudah ada.
   - Jalankan proses generate Prisma (dan migrasi jika database lokal/dev sudah siap) agar *Prisma Client* mengetahui tabel baru.

2. **Definisikan Interface (`src/interfaces/session.ts`)**
   - Buat interface seperti `LoginRequest` (email, password) dan `LoginResponse` (token) agar kode memiliki *type-safety* yang baik.

3. **Gunakan/Update Utility (`src/utils/validator.ts`)**
   - Pastikan fungsi validasi email sudah tersedia dan dapat di-import.

4. **Implementasi Business Logic (`src/services/sessions-service.ts`)**
   - Buat fungsi/method (misal `loginUser`) yang menerima `LoginRequest`.
   - Cari user di database berdasarkan email menggunakan Prisma. Jika tidak ada, lemparkan error.
   - Verifikasi kesesuaian password menggunakan `bcrypt.compare`. Jika tidak cocok, lemparkan error.
   - Generate token UUID unik menggunakan fungsi bawaan `crypto.randomUUID()` atau package `uuid`.
   - Simpan data sesi baru (token & user_id) ke dalam tabel `sessions` via Prisma.
   - Kembalikan token.

5. **Buat API Route (`src/app/api/users/login/route.ts`)**
   - Ekspor fungsi `POST(req: NextRequest)`.
   - Parsing `body` dari request.
   - Lakukan validasi *early exit* (cek format email dan panjang password).
   - Panggil fungsi service `loginUser` di dalam blok `try...catch`.
   - Tangani error dengan mengembalikan response status HTTP yang sesuai (400, 401, atau 500).
