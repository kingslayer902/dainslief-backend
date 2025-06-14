// index.js
import express from 'express'
import cors from 'cors'
import axios from 'axios'
import 'dotenv/config'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Tes route
app.get('/', (req, res) => {
  res.send('✅ Dainsleif Backend with ES Modules is running!')
})

// Route /chat untuk AI Chatbot
app.post('/chat', async (req, res) => {
  const { message } = req.body

  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    )

    const reply = response.data.generated_text || '🤖 Bot tidak memberikan jawaban.'
    res.json({ response: reply })

  } catch (error) {
    console.error('❌ Error dari Hugging Face:', error.message)
    res.status(500).json({ response: '❌ Gagal mendapatkan jawaban dari AI.' })
  }
})

// Jalankan server
const PORT = process.env.PORT || 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Backend siap di http://0.0.0.0:${PORT}`)
})
