# Perencanaan Implementasi API Registrasi User

Dokumen ini berisi spesifikasi dan tahapan implementasi untuk fitur registrasi user baru. Dokumen ini ditujukan sebagai panduan bagi junior programmer atau model AI untuk mengeksekusi fitur ini.

## 1. Spesifikasi Database (Prisma Schema)

Buat tabel `users` dengan atribut sebagai berikut:
- `id`: Integer, Auto Increment, Primary Key.
- `name`: String / Varchar(255).
- `email`: String / Varchar(255), Unique.
- `password`: String / Varchar(255) (Akan menyimpan hash bcrypt).
- `created_at`: DateTime, Default now().

## 2. Struktur Folder & File

Pastikan kode diletakkan sesuai dengan struktur berikut di dalam folder `src/`:

- **Types**: `src/types/user.ts`
  - Definisikan interface untuk User dan Request Body.
- **Library**: `src/lib/prisma-lib.ts`
  - Re-export instance Prisma client (bisa menggunakan singleton yang sudah ada).
- **Utility**: `src/utils/validator.ts`
  - Fungsi untuk validasi format email.
- **Service**: `src/services/users-service.ts`
  - Logic bisnis: pengecekan email existing, hashing password, dan pemanggilan Prisma.
- **Route**: `src/app/api/users/route.ts` (menggunakan format App Router Next.js)
  - Handling HTTP Request (`POST`) dan mengembalikan response JSON.

## 3. Spesifikasi API

**Endpoint**: `POST /api/users`

### Request Body
```json
{
    "name": "budi",
    "email": "budi@example.com",
    "password": "password123"
}
```

### Response
- **Success (201 Created)**:
  ```json
  {
      "id": 1,
      "name": "budi",
      "email": "budi@example.com",
      "created_at": "2022-01-01T00:00:00.000Z"
  }
  ```
- **Error - Email exists (400 Bad Request)**: `{"message": "Email already exists"}`
- **Error - Invalid email (400 Bad Request)**: `{"message": "Invalid email"}`
- **Error - Password too short (400 Bad Request)**: `{"message": "Password must be at least 6 characters"}`
- **Error - Others (500 Internal Server Error)**: `{"message": "Internal server error"}`

## 4. Tahapan Implementasi

1.  **Update Schema**: Tambahkan model `User` ke dalam `prisma/schema.prisma` sesuai spesifikasi dan jalankan `npx prisma migrate dev --name init_users`.
2.  **Define Types**: Buat interface untuk data user dan request payload di `src/types/user.ts`.
3.  **Implement Utility**: Buat fungsi validasi format email menggunakan regex di `src/utils/validator.ts`.
4.  **Implement Service**:
    *   Buat file `src/services/users-service.ts`.
    *   Gunakan library `bcrypt` (atau `bcryptjs`) untuk melakukan hash password sebelum disimpan ke database.
    *   Buat fungsi `registerUser` yang menangani logika bisnis (pengecekan email duplikat, hashing, dan simpan data via Prisma).
5.  **Implement API Route**:
    *   Buat file `src/app/api/users/route.ts` sesuai format Next.js.
    *   Ambil dan validasi input (cek validitas email dan panjang password minimal 6 karakter).
    *   Panggil fungsi dari `users-service`.
    *   Kembalikan response sesuai spesifikasi yang diminta (pastikan password tidak disertakan di dalam response success).
6.  **Testing**: Uji endpoint registrasi yang baru dibuat menggunakan tools seperti Postman, cURL, atau Thunder Client.
