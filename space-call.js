document.addEventListener('DOMContentLoaded', () => {
  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const imageContainer = document.getElementById('image-container');

  generateButton.addEventListener('click', async () => {
    const prompt = promptInput.value || '魔法陣';
    imageContainer.innerHTML = '<p>🧙‍♂️ 魔法陣を描いています…</p>';

    try {
      const res = await fetch('https://nobuyoshi1102-magic-circle-generator.hf.space/run/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: [prompt] })
      });

      const result = await res.json();
　　　　if (result && result.data && result.data[0]) {
  // ✅ 画像生成成功
       const imageUrl = result.data[0]; // Base64形式の画像URL

       const img = document.createElement('img');
       img.src = imageUrl;
       img.alt = '生成画像';
       img.className = 'generated-image-top';

       imageContainer.innerHTML = '';
       imageContainer.appendChild(img);
      } else if (result && result.error) {
  // ❌ 生成失敗（エラーあり）
       console.error('生成エラー:', result.error);
       imageContainer.innerHTML = result.error + `<p style="color:red;">生成に失敗しました: ${result.error}</p>`;
     } else {
  // ❓ 不明な状態（遅延中 or 空レスポンス）
      console.warn('レスポンスが不完全です:', result);
      imageContainer.innerHTML = `<pre>${JSON.stringify(result, null, 2)}</pre>`;

      imageContainer.innerHTML = `<p>画像がまだ返ってきていません。しばらくお待ちください。</p>`;
     }
    } catch (err) {
      console.error('画像生成エラー:', err);
      imageContainer.innerHTML = err + `<p style="color:red;">画像生成に失敗しました</p>`;
    }
  });
});
