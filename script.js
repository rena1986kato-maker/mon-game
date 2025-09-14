document.addEventListener("DOMContentLoaded", () => {
  const books = document.querySelectorAll(".book");
  let selectedField = null;

  books.forEach(book => {
    book.addEventListener("click", () => {
      books.forEach(b => b.style.opacity = "0.5");
      book.style.opacity = "1";
      selectedField = book.dataset.field;
    });
  });

  document.getElementById("new-game").addEventListener("click", () => {
    if (!selectedField) {
      alert("まず本を選んでください");
      return;
    }
    // 選んだ本のフィールドをCookieに保存してゲーム開始
    document.cookie = `playerField=${selectedField}; path=/`;
    alert(`新しいゲームを ${selectedField} から開始します`);
    // ここで次の生物選択イベントに遷移する処理を呼び出す
  });

  document.getElementById("continue-game").addEventListener("click", () => {
    // Cookieからプレイヤー情報を読み込む
    const cookies = document.cookie.split(";").reduce((acc, c) => {
      const [key, val] = c.trim().split("=");
      acc[key] = val;
      return acc;
    }, {});
    if (!cookies.playerField) {
      alert("保存されたゲームがありません。新しいゲームを開始してください。");
      return;
    }
    alert(`途中からゲームを ${cookies.playerField} から再開します`);
    // ここで保存された状態からゲームを再開する処理
  });
});