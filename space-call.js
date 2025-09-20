let logArea; // グローバル定義

document.addEventListener('DOMContentLoaded', () => {
  logArea = document.getElementById('debug-log');
  logToScreen("✅ DOMContentLoaded: スクリプト開始");

  const generateButton = document.getElementById('generate-button');
  const promptInput = document.getElementById('prompt-input');
  const imageContainer = document.getElementById('image-container');

  if (!generateButton || !promptInput || !imageContainer || !logArea) {
    logToScreen("❌ 必要なDOM要素が見つかりません");
    return;
  }

  generateButton.addEventListener('click', async () => {
    logToScreen("🧙‍♂️ ボタンがクリックされました");

    const prompt = promptInput.value.trim() || '魔法陣';
    logToScreen("📝 プロンプト: " + prompt);

    imageContainer.innerHTML = '<p>🧙‍♂️ 魔法陣を描いています…</p>';

    try {
      logToScreen("📡 APIにリクエスト送信中…");

      startWaitTimer(); // fetch前に開始
      const res = await fetch('https://nobuyoshi1102-shuyoshi-sd-api.hf.space/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: prompt })
      });
      stopWaitTimer(); // レスポンス受信後に停止
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
});

// グローバル logToScreen 関数
function logToScreen(message) {
  if (!logArea) return;
  const p = document.createElement('p');
  p.textContent = message;
  p.style.fontSize = '12px';
  p.style.color = '#555';
  logArea.appendChild(p);
}
let timerInterval;
let timerStart;

function startWaitTimer() {
  timerStart = Date.now();
  logToScreen('⏳ 待機時間: 0秒');

  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - timerStart) / 1000);
    logToScreen(`⏳ 待機時間: ${elapsed}秒`);
  }, 1000);
}

function stopWaitTimer() {
  clearInterval(timerInterval);
}


