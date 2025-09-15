window.addEventListener('load', () => {
  // 背景フェードイン
  document.querySelector('.background').classList.add('show');

  // 魔法書表示
  setTimeout(() => {
    document.querySelector('.book-open').classList.add('show');
  }, 800);

  // 光の演出
  setTimeout(() => {
    document.querySelector('.fx-light').classList.add('show');
  }, 1600);

  // 生物召喚
  setTimeout(() => {
    document.querySelector('.creature').classList.add('show');
  }, 2200);

  // ボタン表示
  setTimeout(() => {
    document.querySelector('#menu-buttons').classList.add('show');
  }, 2800);
});
