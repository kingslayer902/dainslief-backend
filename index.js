import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Tes route
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend with ES Modules is running!')
})

// Chatbot endpoint
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message
  const hfKey = process.env.HF_API_KEY

  if (!hfKey) {
    return res.status(500).json({ error: '❌ API key Hugging Face belum diset di .env' })
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: userMessage })
    })

    const resultText = await response.text()

    console.log('📦 Response dari HF:', resultText)

    try {
      const result = JSON.parse(resultText)

      const generated = result?.[0]?.generated_text || result?.generated_text || '🤖 Tidak ada balasan.'
      res.json({ response: generated })
    } catch (parseErr) {
      console.error('❌ JSON Parse Error:', parseErr.message)
      res.status(500).json({ error: '❌ Gagal memproses jawaban dari HF' })
    }

  } catch (err) {
    console.error('❌ Chatbot Error:', err.message)
    res.status(500).json({ error: '❌ Terjadi kesalahan saat meminta ke Hugging Face' })
  }
})

// Jalankan server
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`)
})
