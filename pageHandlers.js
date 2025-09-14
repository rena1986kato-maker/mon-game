import { setCookie, getCookie, showPage } from "./common.js";

export function initCoverPage(openBookButtonId) {
  document.getElementById(openBookButtonId)?.addEventListener("click", () => {
    showPage(1);
  });
}

export function initPartnerPage(partnerButtonsSelector, partnerImages, partnerDescriptions) {
  document.querySelectorAll(partnerButtonsSelector).forEach(btn => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.partner;
      document.getElementById("partner-image").src = `images/${partnerImages[name]}`;
      document.getElementById("partner-description").textContent = partnerDescriptions[name];
      setCookie("selectedPartner", name);
      showPage(2);
    });
  });

  // クッキーから復元
  const saved = getCookie("selectedPartner");
  if (saved && partnerImages[saved]) {
    document.getElementById("partner-image").src = `images/${partnerImages[saved]}`;
    document.getElementById("partner-description").textContent = partnerDescriptions[saved];
  }
}
