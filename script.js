document.addEventListener('DOMContentLoaded', () => {
  const generatedImg = document.createElement('img');
  generatedImg.src = '/images/generated.png?' + Date.now(); // キャッシュ回避
  generatedImg.className = 'generated-image-top';
  generatedImg.alt = '生成画像';

  // bodyの最初に挿入（最上部表示）
  document.body.insertBefore(generatedImg, document.body.firstChild);
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
