import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend lokal siap!')
})

// 🔁 Endpoint chatbot lokal
app.post('/chat', (req, res) => {
  const question = req.body.message?.toLowerCase() || ''
  let response = '🤖 Maaf, saya belum mengerti pertanyaan itu.'

  if (question.includes('checkout')) {
    response = '🛒 Untuk checkout, klik tombol "Checkout" lalu isi data pengiriman dan konfirmasi.'
  } else if (question.includes('gambar') || question.includes('foto')) {
    response = '🖼️ Pastikan gambar sudah diupload dengan URL yang benar atau file yang sesuai.'
  } else if (question.includes('login')) {
    response = '🔐 Login dilakukan dengan email dan password kamu di halaman login.'
  } else if (question.includes('alamat')) {
    response = '📍 Alamat pengiriman bisa diatur di halaman profil atau saat checkout.'
  } else if (question.includes('produk')) {
    response = '🛍️ Produk kami bisa dilihat di halaman "Products" dengan berbagai kategori menarik.'
  }

  res.json({ response })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`✅ Backend lokal aktif di http://localhost:${PORT}`)
})
