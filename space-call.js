document.addEventListener('DOMContentLoaded', () => {
  logToScreen("✅ DOMContentLoaded: スクリプト開始");

  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const imageContainer = document.getElementById('image-container');
  const logArea = document.getElementById('debug-log');

  generateButton.addEventListener('click', async () => {
    logToScreen("🧙‍♂️ ボタンがクリックされました");

    const prompt = promptInput.value.trim() || '魔法陣';
    logToScreen("📝 プロンプト: " + prompt);

    imageContainer.innerHTML = '<p>🧙‍♂️ 魔法陣を描いています…</p>';

    try {
      logToScreen("📡 APIにリクエスト送信中…");

      const res = await fetch('https://nobuyoshi1102-shuyoshi-sd-api.hf.space/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });

      logToScreen("📬 レスポンス受信: " + res.status + " " + res.statusText);

      const contentType = res.headers.get('content-type') || '';
      logToScreen("📦 Content-Type: " + contentType);

      if (!res.ok) {
        const error = await res.json();
        logToScreen("❌ APIエラー: " + JSON.stringify(error));
        throw new Error(error.error || `HTTP ${res.status}: ${res.statusText}`);
      }

      if (contentType.includes('application/json')) {
        const error = await res.json();
        logToScreen("⚠️ JSONエラー応答: " + JSON.stringify(error));
        throw new Error(error.error || '画像生成に失敗しました');
      }

      const blob = await res.blob();
      logToScreen("🖼️ Blobサイズ: " + blob.size);

      const imageUrl = URL.createObjectURL(blob);
      logToScreen("🔗 Blob URL生成: " + imageUrl);

      const img = document.createElement('img');
      img.src = imageUrl;
      img.alt = '生成画像';
      img.className = 'generated-image-top';

      img.onload = () => {
        logToScreen("✅ 画像読み込み成功");
        URL.revokeObjectURL(imageUrl);
      };

      img.onerror = () => {
        logToScreen("❌ 画像読み込み失敗");
        imageContainer.innerHTML = `<p style="color:red;">画像の読み込みに失敗しました</p>`;
      };

      imageContainer.innerHTML = '';
      imageContainer.appendChild(img);
    } catch (err) {
      logToScreen("❗️画像生成エラー: " + err.message);
      imageContainer.innerHTML = `<p style="color:red;">画像生成に失敗しました</p><pre>${err.message}</pre>`;
    }
  });

  function logToScreen(message) {
    const p = document.createElement('p');
    p.textContent = message;
    p.style.fontSize = '12px';
    p.style.color = '#555';
    logArea.appendChild(p);
  }
});
