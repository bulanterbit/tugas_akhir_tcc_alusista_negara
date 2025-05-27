# Gunakan base image Node.js yang sesuai
FROM node:18-slim

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin package.json dan package-lock.json (atau yarn.lock)
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Salin sisa kode aplikasi backend
COPY backend/ .

# Ekspos port yang digunakan aplikasi Anda (misalnya, 8080 atau 3000 dari app.js)
EXPOSE 8080

# Perintah untuk menjalankan aplikasi
CMD [ "node", "app.js" ]