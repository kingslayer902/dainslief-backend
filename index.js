// index.js
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000
const apiKey = process.env.HF_API_KEY

app.use(cors())
app.use(express.json())

// Tes route
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend with ES Modules is running!')
})

// Route chatbot
app.post('/chat', async (req, res) => {
  const message = req.body.message

  if (!message) {
    return res.status(400).json({ response: '❌ Pesan tidak boleh kosong.' })
  }

  try {
    const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: {
          text: message
        }
      })
    })

    const raw = await response.text()
    console.log('📦 Response dari HF:', raw)

    try {
      const data = JSON.parse(raw)
      const reply =
        data.generated_text ||
        data[0]?.generated_text ||
        '⚠️ Bot tidak memberikan jawaban.'

      res.json({ response: reply })
    } catch (parseError) {
      console.error('❌ JSON Parse Error:', raw)
      res.status(500).json({ response: '❌ Gagal membaca jawaban dari HuggingFace: ' + raw })
    }
  } catch (err) {
    console.error('❌ Chatbot Error:', err)
    res.status(500).json({ response: '❌ Gagal menghubungi HuggingFace API.' })
  }
})

// Jalankan server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`)
})
