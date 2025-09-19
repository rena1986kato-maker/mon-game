const express = require('express');
const generateImage = require('./generate');
const path = require('path');

const app = express();
const PORT = 3000;

app.use('/images', express.static(path.join(__dirname, 'public', 'images')));
app.use(express.json());

app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt || '魔法陣が描かれた古代の羊皮紙';
  const success = await generateImage(prompt);
  if (success) {
    res.json({ status: 'ok', imageUrl: '/images/generated.png' });
  } else {
    res.status(500).json({ status: 'error', message: '画像生成に失敗しました' });
  }
});

app.listen(PORT, () => {
  console.log(`🌐 サーバー起動中：http://localhost:${PORT}`);
});
