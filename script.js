// DOMが読み込まれたら実行
document.addEventListener("DOMContentLoaded", () => {
  const bookCover = document.querySelector(".book-cover");
  const bookOpen = document.querySelector(".book-open");
  const lightFx = document.querySelector(".fx-light");
  const creature = document.querySelector(".creature");
  const menuButtons = document.getElementById("menu-buttons");

  // ボタンは最初は非表示
  menuButtons.style.display = "none";

  // 閉じた本をクリックで演出開始
  bookCover.addEventListener("click", () => {
    // 閉じた本を消す
    bookCover.style.display = "none";

    // 開いた本を表示
    bookOpen.style.display = "block";

    // 少し待って光の演出と生物を表示
    setTimeout(() => {
      lightFx.style.opacity = "1";
      creature.style.display = "block";
    }, 1000);

    // さらに待ってボタン表示
    setTimeout(() => {
      menuButtons.style.display = "flex";
    }, 2000);
  });

  // ボタンの動作サンプル
  document.querySelector(".btn-start").addEventListener("click", () => {
    alert("新しい冒険を始めます！");
  });

  document.querySelector(".btn-continue").addEventListener("click", () => {
    alert("前回の続きを読み込みます！");
  });

  document.querySelector(".btn-codex").addEventListener("click", () => {
    alert("図鑑を開きます！");
  });
});