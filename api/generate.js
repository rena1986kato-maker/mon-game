import axios from 'axios';

export default async function handler(req, res) {
  const API_TOKEN = process.env.HUGGINGFACE_TOKEN;
  const MODEL_URL = 'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1';
  const prompt = req.body?.prompt || '魔法陣が描かれた古代の羊皮紙';

  try {
    const response = await axios.post(
      MODEL_URL,
      { inputs: prompt },
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );

    const base64Image = Buffer.from(response.data).toString('base64');
    res.status(200).json({ image: `data:image/png;base64,${base64Image}` });
  } catch (error) {
    console.error('画像生成エラー:', error.response?.data || error.message);
    res.status(500).json({ error: '画像生成に失敗しました' });
  }
}
