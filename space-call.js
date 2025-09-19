document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const imageContainer = document.getElementById('image-container');

  generateButton.addEventListener('click', async () => {
    const prompt = promptInput.value || '魔法陣が描かれた古代の羊皮紙';
    imageContainer.innerHTML = '<p>🧙‍♂️ 魔法陣を描いています…</p>';

    try {
      const res = await fetch('https://修義-magic-circle-generator.hf.space/run/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [prompt] })
      });

      const result = await res.json();
      const imageUrl = result.data[0];

      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '生成画像';
      img.className = 'generated-image-top';

      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);
    } catch (err) {
      console.error('画像生成エラー:', err);
      imageContainer.innerHTML = `<p style="color:red;">画像生成に失敗しました</p>`;
    }
  });
});
