const { createLogger, format, transports } = require("winston");

// Membuat logger
const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.splat(),
    format.json()
  ),
  transports: [
    // Menyimpan log ke file
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({ filename: "success.log", level: "info" }),
  ],
});

// Jika Anda ingin menambahkan logger khusus untuk permintaan HTTP, misalnya:
// const httpLogger = createLogger({
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.json()
//   ),
//   transports: [
//     new transports.File({ filename: 'http.log' }),
//   ],
// });

// Ekspor logger agar dapat digunakan di seluruh aplikasi Anda
module.exports = logger;
// module.exports = { logger, httpLogger }; // Jika Anda menggunakan logger HTTP
