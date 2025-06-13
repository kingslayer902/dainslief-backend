import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('✅ Dainsleif AI Backend (Mixtral) is running');
});

app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  console.log('🟡 Pesan diterima dari frontend:', message);

  const prompt = `<s>[INST] Jawab dengan bahasa Indonesia yang sopan dan jelas: ${message} [/INST]`;

  try {
    const hfResponse = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ inputs: prompt })
    });

    const result = await hfResponse.json();

    if (result.error) {
      console.error('❌ Gagal fetch dari Hugging Face:', result.error);
      return res.status(500).json({ error: result.error });
    }

    console.log('🟢 Respon dari Hugging Face:', result);
    res.json({ response: result[0]?.generated_text || 'Tidak ada jawaban.' });
  } catch (err) {
    console.error('❌ Gagal fetch ke Hugging Face:', err);
    res.status(500).json({ error: 'Gagal menghubungi Hugging Face' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend siap di http://localhost:${PORT}`);
});
