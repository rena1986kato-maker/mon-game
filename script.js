document.addEventListener("DOMContentLoaded", () => {
  const topScreen = document.getElementById("top-screen");
  const mainScreen = document.getElementById("main-screen");
  const bookCover = document.querySelector(".book-cover");

  const newGameBtn = document.getElementById("new-game");
  const continueBtn = document.getElementById("continue-game");
  const codexBtn = document.getElementById("codex");

  // 閉じた本をクリックすると開く演出
  bookCover.addEventListener("click", () => {
    bookCover.classList.add("open-animation");
    setTimeout(() => {
      topScreen.style.display = "none";
      mainScreen.style.display = "block";
    }, 1000); // 1秒後に本が開いてメイン画面表示
  });

  // 新規プレイボタン
  newGameBtn.addEventListener("click", () => {
    console.log("新規プレイ開始");
    // Cookieに初期プレイヤー情報を保存
    // ここで初期生物や物語フラグをセット
  });

  // 続きからプレイ
  continueBtn.addEventListener("click", () => {
    console.log("途中からプレイ");
    // Cookieから情報を読み込む
  });

  // 図鑑ボタン
  codexBtn.addEventListener("click", () => {
    console.log("図鑑表示");
    // 図鑑画面へ遷移
  });
});