import { initCoverPage, initPartnerPage } from "./pageHandlers.js";
import { showPage } from "./common.js";

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

document.addEventListener("DOMContentLoaded", async () => {
  const pages = ["cover", "intro", "partner"];
  const container = document.getElementById("container");

  for (const page of pages) {
    const res = await fetch(`pages/${page}.html`);
    container.insertAdjacentHTML("beforeend", await res.text());
  }

  // 初期化
  initCoverPage("openBook");
  initPartnerPage(".partner-select", partnerImages, partnerDescriptions);

  // ページ遷移
  let currentPage = 0;
  const totalPages = pages.length;

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentPage < totalPages -1) currentPage++;
    showPage(currentPage, totalPages);
  });
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentPage > 0) currentPage--;
    showPage(currentPage, totalPages);
  });
});
