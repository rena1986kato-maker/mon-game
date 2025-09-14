// cookieとページ切替の共通処理
export function setCookie(name, value, days = 30) {
  const expires = new Date(Date.now() + days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${value}; path=/; expires=${expires}`;
}

export function getCookie(name) {
  const cookies = document.cookie.split(";").map(c => c.trim());
  const cookie = cookies.find(c => c.startsWith(name + "="));
  return cookie ? cookie.split("=")[1] : null;
}

export function showPage(pageIndex, totalPages) {
  const pages = document.querySelectorAll(".page");
  pages.forEach((p, i) => {
    if (i < pageIndex) p.style.transform = "rotateY(-180deg)";
    else if (i === pageIndex) p.style.transform = "rotateY(0deg)";
    else p.style.transform = "rotateY(180deg)";
  });
}
