import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch' // pastikan node-fetch sudah terinstall

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Tes route
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend with ES Modules is running!')
})

// Route untuk chatbot (POST /chat)
app.post('/chat', async (req, res) => {
  const { message } = req.body

  if (!message) {
    return res.status(400).json({ response: '❌ Pesan tidak boleh kosong.' })
  }

  try {
    const apiKey = process.env.HF_API_KEY
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          text: message
        }
      })
    })

    const data = await response.json()

    const reply =
      data.generated_text ||
      data[0]?.generated_text ||
      '⚠️ Bot tidak memberikan jawaban.'

    res.json({ response: reply })
  } catch (err) {
    console.error('❌ Chatbot Error:', err.message)
    res.status(500).json({ response: '❌ Terjadi kesalahan di server.' })
  }
})

// Jalankan server
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`)
})
