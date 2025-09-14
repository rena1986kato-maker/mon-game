const partnerImages = {
  "リヴァレット": "22DD4CC7-41AD-4EFA-A4AF-A86754F89994.png",
  "アルピア": "C596DC81-5141-4C88-B697-7FF160AC6245.png",
  "ガルドリング": "083FBB2A-8199-4C89-825A-A14F8A2707EF.png"
};

const partnerDescriptions = {
  "リヴァレット": "湖畔のパートナー。穏やかで優雅、水辺での冒険が得意。",
  "アルピア": "高原のパートナー。好奇心旺盛で軽やかに駆け回る。",
  "ガルドリング": "山のパートナー。頼れる相棒で険しい地形も軽々。"
};

const fieldBackgrounds = {
  "リヴァレット": "images/lake.png",
  "アルピア": "images/highland.png",
  "ガルドリング": "images/mountain.png"
};

// パートナー画像更新 + cookie保存
function updatePartner(name) {
  document.getElementById("partner-image").src = `images/${partnerImages[name]}`;
  document.getElementById("partner-description").textContent = partnerDescriptions[name];
  document.getElementById("field-background").src = fieldBackgrounds[name];

  document.cookie = `selectedPartner=${name}; path=/; max-age=${60*60*24*30}`;
}

// cookie読み込み
function loadPartnerFromCookie() {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const partnerCookie = cookies.find(c => c.startsWith("selectedPartner="));
  if (partnerCookie) {
    const name = partnerCookie.split("=")[1];
    if (partnerImages[name]) {
      updatePartner(name);
    }
  }
}

// ページめくり
let currentPage = 1;
const totalPages = 2;

function showPage(page) {
  const p1 = document.getElementById("page1");
  const p2 = document.getElementById("page2");

  if (page === 1) {
    p1.style.transform = "rotateY(0deg)";
    p2.style.transform = "rotateY(180deg)";
  } else if (page === 2) {
    p1.style.transform = "rotateY(-180deg)";
    p2.style.transform = "rotateY(0deg)";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadPartnerFromCookie();

  document.querySelectorAll(".partner-select").forEach(btn => {
    btn.addEventListener("click", () => {
      updatePartner(btn.dataset.partner);
    });
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages) currentPage++;
    showPage(currentPage);
  });

  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 1) currentPage--;
    showPage(currentPage);
  });

  showPage(currentPage);
});