// backend/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/database.js"; //
import db from "./models/index.js"; //
import path from "path"; // Impor path //
import { fileURLToPath } from "url"; // Impor fileURLToPath //

// Impor router Anda
import authRouter from "./routes/auth.routes.js"; //
import manufakturRouter from "./routes/manufaktur.routes.js"; //
import munisiPesawatRouter from "./routes/munisiPesawat.routes.js"; //
import pesawatRouter from "./routes/pesawat.routes.js"; //

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Dapatkan __dirname di ES module
const __filename = fileURLToPath(import.meta.url); //
const __dirname = path.dirname(__filename); //

// Middleware
app.use(cors()); //
app.use(express.json()); //
app.use(express.urlencoded({ extended: true })); //

// Middleware untuk menyajikan file statis dari folder uploads
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); //

// Default route - Modified to serve HTML documentation
app.get("/", (req, res) => {
  const htmlDocumentation = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation - Alutsista Negara</title>
      <style>
          body { font-family: Arial, sans-serif; margin: 20px; background-color: #f4f4f4; color: #333; }
          h1, h2 { color: #333; border-bottom: 2px solid #ddd; padding-bottom: 10px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 30px; box-shadow: 0 2px 3px rgba(0,0,0,0.1); background-color: #fff; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #e9e9e9; }
          tr:nth-child(even) { background-color: #f9f9f9; }
          code { background-color: #eee; padding: 2px 5px; border-radius: 4px; }
          .endpoint { font-weight: bold; color: #007bff; }
          .method { font-weight: bold; }
          .method-get { color: #28a745; }
          .method-post { color: #007bff; }
          .method-put { color: #ffc107; }
          .method-delete { color: #dc3545; }
          .auth-required { color: #dc3545; }
          .auth-none { color: #28a745; }
          .container { max-width: 960px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; }
      </style>
  </head>
  <body>
      <div class="container">
          <h1>Dokumentasi API Alutsista Negara</h1>
          <p>Selamat datang di dokumentasi API untuk sistem informasi Alutsista Negara. Berikut adalah daftar endpoint yang tersedia:</p>

          <h2>Endpoint Dasar Aplikasi</h2>
          <table>
              <thead>
                  <tr>
                      <th>Metode HTTP</th>
                      <th>Endpoint</th>
                      <th>Deskripsi</th>
                      <th>Autentikasi</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/</td>
                      <td>Menampilkan halaman dokumentasi API ini.</td>
                      <td class="auth-none">Tidak</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/uploads/pesawat/:filename</td>
                      <td>Menyajikan file gambar pesawat yang telah diunggah.</td>
                      <td class="auth-none">Tidak</td>
                  </tr>
                  <tr>
                      <td class="method">-</td>
                      <td class="endpoint">/api/auth</td>
                      <td>Path dasar untuk endpoint autentikasi.</td>
                      <td>Bervariasi</td>
                  </tr>
                  <tr>
                      <td class="method">-</td>
                      <td class="endpoint">/api/manufaktur</td>
                      <td>Path dasar untuk endpoint manufaktur.</td>
                      <td>Bervariasi</td>
                  </tr>
                  <tr>
                      <td class="method">-</td>
                      <td class="endpoint">/api/munisipesawat</td>
                      <td>Path dasar untuk endpoint munisi pesawat.</td>
                      <td>Bervariasi</td>
                  </tr>
                  <tr>
                      <td class="method">-</td>
                      <td class="endpoint">/api/pesawat</td>
                      <td>Path dasar untuk endpoint pesawat.</td>
                      <td>Bervariasi</td>
                  </tr>
              </tbody>
          </table>

          <h2>Endpoint Autentikasi (<code>/api/auth</code>)</h2>
          <table>
              <thead>
                  <tr>
                      <th>Metode HTTP</th>
                      <th>Endpoint</th>
                      <th>Deskripsi</th>
                      <th>Autentikasi</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/auth/register</td>
                      <td>Mendaftarkan pengguna baru.</td>
                      <td class="auth-none">Tidak</td>
                  </tr>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/auth/login</td>
                      <td>Login untuk pengguna yang sudah terdaftar.</td>
                      <td class="auth-none">Tidak</td>
                  </tr>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/auth/logout</td>
                      <td>Logout pengguna yang sedang login.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/auth/profile</td>
                      <td>Mendapatkan profil pengguna yang sedang login.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
              </tbody>
          </table>

          <h2>Endpoint Manufaktur (<code>/api/manufaktur</code>)</h2>
          <table>
              <thead>
                  <tr>
                      <th>Metode HTTP</th>
                      <th>Endpoint</th>
                      <th>Deskripsi</th>
                      <th>Autentikasi</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/manufaktur/</td>
                      <td>Membuat data manufaktur baru.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/manufaktur/</td>
                      <td>Mengambil daftar semua manufaktur.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/manufaktur/:id</td>
                      <td>Mengambil data manufaktur spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-put">PUT</td>
                      <td class="endpoint">/api/manufaktur/:id</td>
                      <td>Memperbarui data manufaktur spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-delete">DELETE</td>
                      <td class="endpoint">/api/manufaktur/:id</td>
                      <td>Menghapus data manufaktur spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
              </tbody>
          </table>

          <h2>Endpoint Munisi Pesawat (<code>/api/munisipesawat</code>)</h2>
          <table>
              <thead>
                  <tr>
                      <th>Metode HTTP</th>
                      <th>Endpoint</th>
                      <th>Deskripsi</th>
                      <th>Autentikasi</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/munisipesawat/</td>
                      <td>Membuat data munisi pesawat baru.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/munisipesawat/</td>
                      <td>Mengambil daftar semua munisi pesawat.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/munisipesawat/:id</td>
                      <td>Mengambil data munisi pesawat spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-put">PUT</td>
                      <td class="endpoint">/api/munisipesawat/:id</td>
                      <td>Memperbarui data munisi pesawat spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-delete">DELETE</td>
                      <td class="endpoint">/api/munisipesawat/:id</td>
                      <td>Menghapus data munisi pesawat spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
              </tbody>
          </table>

          <h2>Endpoint Pesawat (<code>/api/pesawat</code>)</h2>
          <table>
              <thead>
                  <tr>
                      <th>Metode HTTP</th>
                      <th>Endpoint</th>
                      <th>Deskripsi</th>
                      <th>Autentikasi</th>
                  </tr>
              </thead>
              <tbody>
                  <tr>
                      <td class="method method-post">POST</td>
                      <td class="endpoint">/api/pesawat/</td>
                      <td>Membuat data pesawat baru (memungkinkan unggah gambar: <code>gambar_pesawat_file</code>).</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/pesawat/</td>
                      <td>Mengambil daftar semua pesawat.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-get">GET</td>
                      <td class="endpoint">/api/pesawat/:id</td>
                      <td>Mengambil data pesawat spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-put">PUT</td>
                      <td class="endpoint">/api/pesawat/:id</td>
                      <td>Memperbarui data pesawat spesifik berdasarkan ID (memungkinkan unggah gambar: <code>gambar_pesawat_file</code>).</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
                  <tr>
                      <td class="method method-delete">DELETE</td>
                      <td class="endpoint">/api/pesawat/:id</td>
                      <td>Menghapus data pesawat spesifik berdasarkan ID.</td>
                      <td class="auth-required">Bearer Token (Protected)</td>
                  </tr>
              </tbody>
          </table>
      </div>
  </body>
  </html>
  `;
  res.setHeader("Content-Type", "text/html");
  res.send(htmlDocumentation); //
});

// Other routes
app.use("/api/auth", authRouter); //
app.use("/api/manufaktur", manufakturRouter); //
app.use("/api/munisipesawat", munisiPesawatRouter); //
app.use("/api/pesawat", pesawatRouter); //

const startServer = async () => {
  try {
    await sequelize.authenticate(); //
    console.log("Koneksi ke database berhasil.");

    app.listen(PORT, () => {
      console.log(`API berjalan di http://localhost:${PORT}`);
      console.log(
        `Folder uploads disajikan dari: ${path.join(__dirname, "uploads")}`
      ); //
    });
  } catch (error) {
    console.error("Tidak dapat terhubung ke database:", error);
  }
};

startServer();

export default app;
