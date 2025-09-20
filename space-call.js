document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const imageContainer = document.getElementById('image-container');

  generateButton.addEventListener('click', async () => {
    const prompt = promptInput.value.trim() || '魔法陣';
    imageContainer.innerHTML = '<p>🧙‍♂️ 魔法陣を描いています…</p>';

    try {
      const res = await fetch('https://nobuyoshi1102-shuyoshi-sd-api.hf.space/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const blob = await res.blob();
      console.log("Blob size:", blob.size); // ✅ ここでサイズ確認

      const imageUrl = URL.createObjectURL(blob);

      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '生成画像';
      img.className = 'generated-image-top';
      img.onload = () => URL.revokeObjectURL(imageUrl); // ✅ メモリ解放

      imageContainer.innerHTML = blob.size;
      //imageContainer.appendChild(img);
    } catch (err) {
      console.error('画像生成エラー:', err);
      imageContainer.innerHTML = err + `<p style="color:red;">画像生成に失敗しました</p><pre>${err.message}</pre>`;
    }
  });
});
