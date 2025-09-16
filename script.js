window.addEventListener('load', () => {
  const closedBook = document.querySelector('.book-closed');

  closedBook.addEventListener('click', () => {
    // 閉じた本をフェードアウト
    closedBook.style.opacity = '0';
    closedBook.style.pointerEvents = 'none';

    // 開いた本を表示
    setTimeout(() => {
      document.querySelector('.book-open').classList.remove('hidden');
    }, 500);

    // 魔法陣表示
    setTimeout(() => {
      document.querySelector('.magic-circle').classList.remove('hidden');
    }, 1000);

    // 光の演出
    setTimeout(() => {
      document.querySelector('.fx-light').classList.remove('hidden');
    }, 1500);

    // 生物召喚
    setTimeout(() => {
      document.querySelector('.creature').classList.remove('hidden');
    }, 2000);

    // ボタン表示
    setTimeout(() => {
      document.querySelector('#menu-buttons').classList.remove('hidden');
    }, 2600);
  });
});
