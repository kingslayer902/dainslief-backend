const express = require('express');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tes route root
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend is running!');
});

// Tambahkan route lain di bawah ini
// contoh:
// app.get('/api/products', (req, res) => {
//   res.json([{ id: 1, name: 'Produk A' }]);
// });

// Gunakan port dari Railway atau default ke 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`);
});
