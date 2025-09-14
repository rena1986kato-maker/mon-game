// パートナー画像マッピング（UUIDファイル名）
const partnerImages = {
  "リヴァレット": "22DD4CC7-41AD-4EFA-A4AF-A86754F89994.png",
  "アルピア": "C596DC81-5141-4C88-B697-7FF160AC6245.png",
  "ガルドリング": "083FBB2A-8199-4C89-825A-A14F8A2707EF.png"
};

// パートナー説明文
const partnerDescriptions = {
  "リヴァレット": "湖畔のパートナー。穏やかで優雅、水辺での冒険が得意。",
  "アルピア": "高原のパートナー。好奇心旺盛で軽やかに駆け回る。",
  "ガルドリング": "山のパートナー。頼れる相棒で険しい地形も軽々。"
};

// フィールド背景画像
const fieldBackgrounds = {
  "リヴァレット": "images/lake.png",
  "アルピア": "images/highland.png",
  "ガルドリング": "images/mountain.png"
};

// パートナー選択時に画像・背景・説明を更新
function updatePartnerImage(name) {
  // パートナー画像
  const imgElement = document.getElementById("partner-image");
  imgElement.src = partnerImages[name] ? `images/${partnerImages[name]}` : "";

  // パートナー説明
  const descElement = document.getElementById("partner-description");
  descElement.textContent = partnerDescriptions[name] || "";

  // フィールド背景
  const bgElement = document.getElementById("field-background");
  bgElement.src = fieldBackgrounds[name] || "";

  // cookieに保存（30日）
  document.cookie = `selectedPartner=${name}; path=/; max-age=${60*60*24*30}`;
}

// cookieからパートナーを読み込み
function loadPartnerFromCookie() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const partnerCookie = cookies.find(c => c.startsWith("selectedPartner="));
  if (partnerCookie) {
    const name = partnerCookie.split("=")[1];
    if (partnerImages[name]) {
      updatePartnerImage(name);
    }
  }
}

// 初期化
document.addEventListener("DOMContentLoaded", () => {
  loadPartnerFromCookie();

  // ボタンにクリックイベント
  document.querySelectorAll(".partner-select").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.partner;
      updatePartnerImage(name);
    });
  });
});