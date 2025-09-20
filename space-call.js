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
        logToScreen("❌ API
