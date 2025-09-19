
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: '魔法陣が描かれた古代の羊皮紙' })
    });

    const data = await res.json();
    const container = document.getElementById('image-container');
    container.innerHTML = ''; // 前の内容を消す

    // ログを文字列として表示
    const logText = document.createElement('pre');
    logText.textContent = `画像データ（先頭100文字）:\n${data.image?.slice(0, 100)}\n\n文字数: ${data.image?.length}`;
    logText.style.color = 'white';
    logText.style.background = 'rgba(0,0,0,0.6)';
    logText.style.padding = '10px';
    logText.style.fontSize = '12px';
    logText.style.maxWidth = '90vw';
    logText.style.overflowWrap = 'break-word';
    container.appendChild(logText);

    // 画像も表示（任意）
    if (data.image) {
      const img = document.createElement('img');
      img.src = data.image;
      img.className = 'generated-image-top';
      img.alt = '生成画像';
      container.appendChild(img);
    }
  } catch (err) {
    const container = document.getElementById('image-container');
    container.innerHTML = `<div style="color:red;">画像取得エラー: ${err.message}</div>`;
    console.error('画像取得エラー:', err);
  }
});



window.addEventListener('load', () => {
  const closedBook = document.querySelector('.book-closed');
  const bookOpen = document.querySelector('.book-open');
  const magicCircle = document.querySelector('.magic-circle');
  const fxLight = document.querySelector('.fx-light');
  const creature = document.querySelector('.creature');
  const menuButtons = document.querySelector('#menu-buttons');

  closedBook.addEventListener('click', () => {
    // 閉じた本をフェードアウト
    closedBook.classList.add('fade-out');

    // 開いた本をフェードイン
    setTimeout(() => {
      bookOpen.classList.add('fade-in');
    }, 600);

    // 魔法陣をフェードイン
    setTimeout(() => {
      magicCircle.classList.add('fade-in');
    }, 1200);

    // 光の演出をフェードイン
    setTimeout(() => {
      fxLight.classList.add('fade-in');
    }, 1800);

    // 生物をフェードイン
    setTimeout(() => {
      creature.classList.add('fade-in');
    }, 2400);

    // ボタン群をフェードイン
    setTimeout(() => {
      menuButtons.classList.add('fade-in');
    }, 3000);
  });
});
