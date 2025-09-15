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
  bookCover.style.display = "none";
  bookOpen.style.display = "block";

  setTimeout(() => {
    lightFx.classList.add("show");   // 光をフェードイン
    creature.classList.add("show");  // 生物もフェードイン
    bookOpen.style.display = "none";
  }, 1000);

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