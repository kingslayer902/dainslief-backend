import express from 'express';
import cors from 'cors';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Tes route
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend with ES Modules is running!');
});

// Jalankan server
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`);
});
