const axios = require('axios');
const fs = require('fs');
const path = require('path');

const API_TOKEN = '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';
const MODEL_URL = 'https://api-inference.huggingface.co/models/hakurei/waifu-diffusion';

async function generateImage(prompt = 'モンスター') {
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

    const outputPath = path.join(__dirname, 'public', 'images', 'generated.png');
    fs.writeFileSync(outputPath, response.data);
    return true;
  } catch (error) {
    console.error('❌ 画像生成エラー:', error.response?.data || error.message);
    return false;
  }
}

module.exports = generateImage;
