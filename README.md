# Vibe App - Authentication Service

Aplikasi ini merupakan layanan *backend authentication* (registrasi, login, manajemen sesi, dan logout) yang kokoh dan efisien, dibangun menggunakan arsitektur modern berbasis Next.js App Router. Aplikasi ini dirancang sebagai fondasi kuat untuk aplikasi web yang membutuhkan sistem autentikasi mandiri dengan manajemen sesi berbasis UUID.

---

## 🛠 Technology Stack & Libraries
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: PostgreSQL (di-hosting di Supabase)
- **ORM**: Prisma ORM v6
- **Styling**: Tailwind CSS v4
- **Testing**: Jest & ts-jest
- **Security/Utils**: `bcryptjs` (Password Hashing), `crypto` (UUID Generation)

---

## 🏗 Arsitektur & Struktur Folder
Aplikasi ini memisahkan secara ketat antara routing (*Controller*), logika bisnis (*Service*), dan akses data (*Model/Repository*), sehingga kode menjadi lebih bersih (*Clean Architecture*) dan mudah diuji.

```text
vibe-app/
├── prisma/                 # Skema database dan file migrasi Prisma
├── src/
│   ├── app/api/            # Next.js App Router (Entry point API)
│   ├── interfaces/         # Definisi tipe data & kontrak (contoh: user.ts, session.ts)
│   ├── lib/                # Konfigurasi library pihak ketiga (contoh: prisma-lib.ts)
│   ├── services/           # Layer Logika Bisnis (contoh: users-service.ts, sessions-service.ts)
│   └── utils/              # Fungsi helper/utilitas (contoh: validator.ts)
└── test/                   # Folder terpusat untuk semua Unit Test
    ├── api/                # Test untuk endpoint API route
    └── services/           # Test untuk business logic (Service)
```

**Konvensi Penamaan File**:
- **Routes**: Selalu menggunakan format bawaan Next.js (`route.ts`).
- **Services/Lib/Utils**: Menggunakan format kebab-case deskriptif, misal `users-service.ts` atau `prisma-lib.ts`.
- **Interfaces**: Menggunakan kata benda tunggal, misal `session.ts`.

---

## 💾 Skema Database
Database menggunakan PostgreSQL dengan dua tabel utama:

1. **Table `users`**:
   - `id`: Integer, Auto Increment, Primary Key
   - `name`: VarChar(255)
   - `email`: VarChar(255), Unique
   - `password`: VarChar(255) (Disimpan dalam bentuk hash Bcrypt)
   - `created_at`: Timestamp, Default Current Timestamp

2. **Table `sessions`**:
   - `id`: Integer, Auto Increment, Primary Key
   - `token`: VarChar(255), Not Null (Berisi UUID unik)
   - `user_id`: Integer, Foreign Key ke tabel `users`
   - `created_at`: Timestamp, Default Current Timestamp

---

## 📡 Daftar API yang Tersedia

### 1. Registrasi User
Mendaftarkan pengguna baru ke dalam sistem.
- **Endpoint**: `POST /api/users`
- **Request Body**:
  ```json
  { "name": "Budi", "email": "budi@example.com", "password": "password123" }
  ```
- **Response Success (201)**: Objek data user.
- **Validasi**: Nama max 255 karakter, format email valid, password min 6 karakter, email belum terdaftar.

### 2. Login User
Melakukan autentikasi dan mengembalikan token sesi (UUID).
- **Endpoint**: `POST /api/users/login`
- **Request Body**:
  ```json
  { "email": "budi@example.com", "password": "password123" }
  ```
- **Response Success (200)**: `{ "token": "uuid-token-string" }`
- **Validasi**: Email & password harus cocok.

### 3. Get Current User
Mengambil data detail pengguna yang sedang login berdasarkan token sesi.
- **Endpoint**: `GET /api/users/current`
- **Request Header**: `Authorization: Bearer <token>`
- **Response Success (200)**: 
  ```json
  { "data": { "id": 1, "name": "Budi", "email": "budi@example.com", "created_at": "..." } }
  ```
- **Validasi**: Token harus dikirim dan valid di database `sessions`. Mengembalikan 401 Unauthorized jika gagal.

### 4. Logout User
Menghapus sesi pengguna dari database agar token tidak dapat digunakan lagi.
- **Endpoint**: `DELETE /api/users/logout`
- **Request Header**: `Authorization: Bearer <token>`
- **Response Success (200)**: `{ "message": "Logout success" }`
- **Validasi**: Token dihapus dari tabel `sessions` menggunakan satu kali query `deleteMany`.

---

## 📖 Dokumentasi API (Swagger UI)
Aplikasi ini dilengkapi dengan dokumentasi interaktif menggunakan **Swagger UI**. Anda dapat melihat detail endpoint, skema request/response, serta melakukan uji coba API secara langsung melalui browser.

- **URL Dokumentasi**: `http://localhost:3000/api-docs`

---

## 🚀 Cara Setup & Run Aplikasi


### 1. Persiapan Awal
Pastikan Anda sudah menginstal Node.js dan npm. Clone repository ini, lalu masuk ke direktori proyek (`cd vibe-app`).

### 2. Instalasi Dependensi
Jalankan perintah berikut untuk menginstal semua library yang dibutuhkan:
```bash
npm install
```

### 3. Konfigurasi Environment (Database)
Buat file `.env` di root proyek (atau di dalam folder `vibe-app`) dan tambahkan *Connection String* database PostgreSQL Anda:
```env
DATABASE_URL="postgresql://user:password@host:port/database"
```

### 4. Setup Database Prisma
Generate *Prisma Client* dan terapkan skema ke database:
```bash
npx prisma generate
npx prisma migrate dev
```

### 5. Menjalankan Aplikasi (Development)
Jalankan server *development* Next.js dengan Turbopack:
```bash
npm run dev
```
Aplikasi akan berjalan di `http://localhost:3000`.

---

## 🧪 Cara Test Aplikasi
Proyek ini sudah dilengkapi dengan *Unit Test* komprehensif menggunakan Jest. Test mencakup seluruh skenario validasi, *success case*, dan *error handling* pada level API dan Service tanpa menyentuh database asli (*Mocking*).

Jalankan perintah berikut untuk menjalankan seluruh *test suite*:
```bash
npm test
```
*(Seluruh unit test terletak terpusat di dalam folder `test/`)*
