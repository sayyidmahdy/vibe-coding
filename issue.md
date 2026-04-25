# Fitur Get Current User

## Deskripsi Tugas
Mengimplementasikan API untuk mendapatkan data user yang sedang login (*current user*) berdasarkan token session yang dikirimkan melalui header `Authorization`.

## 1. API Endpoint
**Endpoint**: `GET /api/users/current`

**Request Header**:
```json
{
    "Authorization": "Bearer <token>"
}
```

**Response Success (200 OK)**:
```json
{
    "data": {
        "id": 1,
        "name": "budi",
        "email": "user@example.com",
        "created_at": "2022-01-01T00:00:00.000Z"
    }
}
```

**Error Handling Responses**:
- **Tidak Ada Token / Token Tidak Valid**: `{ "error": "unauthorized" }` (401)
- **Error Lainnya (Internal Server Error)**: `{ "error": "Internal server error" }` (500)

*(Catatan: Instruksi error seperti email sudah terdaftar, invalid email, atau password pendek adalah aturan untuk proses pendaftaran. Untuk API GET data user ini, fokus utama error handler adalah otorisasi token).*

## 2. Struktur File & Folder (di dalam `src/`)
Pastikan mengikuti struktur dan konvensi penamaan berikut:
- **Routes** (`app/api/users/current/route.ts`): Berisi routing API Next.js.
- **Services** (`services/users-service.ts` atau `sessions-service.ts`): Berisi logic bisnis (mencari session berdasarkan token dan me-return user terkait).
- **Lib** (`lib/prisma-lib.ts`): Berisi instance library Prisma.
- **Interfaces** (`interfaces/user.ts`): Berisi definisi interface untuk Response current user.

---

## Tahapan Implementasi (Panduan untuk Junior Programmer / AI Model)

1. **Definisikan Interface (`src/interfaces/user.ts`)**
   - Pastikan sudah ada interface yang mendeskripsikan response, misalnya `CurrentUserResponse` yang mencakup field `id`, `name`, dan `email`.

2. **Implementasi Business Logic (`src/services/users-service.ts` atau `sessions-service.ts`)**
   - Buat fungsi/method (misal `getCurrentUser(token: string)`).
   - Lakukan *query* ke database menggunakan Prisma untuk mencari record di tabel `sessions` berdasarkan `token` yang diberikan, **dan pastikan untuk melakukan `include` ke tabel `users`** (karena kita butuh data usernya).
   - Jika session tidak ditemukan, lemparkan error dengan pesan `"unauthorized"`.
   - Jika ditemukan, kembalikan data user (`id`, `name`, `email`) yang melekat pada session tersebut.

3. **Buat API Route (`src/app/api/users/current/route.ts`)**
   - Ekspor fungsi `GET(req: NextRequest)`.
   - Ekstrak *request header* bernama `Authorization`.
   - Cek formatnya. Pisahkan string `"Bearer "` untuk mendapatkan token murni.
   - Jika header kosong atau formatnya salah, langsung *return* response status 401 dengan body `{ "error": "unauthorized" }`.
   - Panggil fungsi service `getCurrentUser` di dalam blok `try...catch`.
   - Tangani error. Jika error karena "unauthorized", *return* 401. Jika karena error sistem lainnya, *return* response 500.
