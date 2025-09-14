// ゲーム状態
const player = {
  name: "研究者",
  partner: null,
  location: null,
  notebook: [],
  unlockedFields: []
};

const partners = {
  "リヴァレット": { image: "rivarett.png", field: "湖畔" },
  "アルピア": { image: "alpia.png", field: "高原" },
  "ガルドリング": { image: "gardring.png", field: "山" }
};

// Cookieに保存
function savePlayerData() {
  const playerData = {
    name: player.name,
    partner: player.partner,
    location: player.location,
    notebook: player.notebook
  };
  document.cookie = "playerData=" + encodeURIComponent(JSON.stringify(playerData)) + "; path=/; max-age=" + (60*60*24*7);
}

// Cookieから読み込み
function loadPlayerData() {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find(c => c.startsWith("playerData="));
  if(cookie) {
    const data = JSON.parse(decodeURIComponent(cookie.split("=")[1]));
    player.name = data.name;
    player.partner = data.partner;
    player.location = data.location;
    player.notebook = data.notebook;

    // UI更新
    if(player.partner) {
      showFieldView();
      updateFieldDescription(`${player.location}に到着。${player.partner}があなたを見つめている…`);
      updatePartnerImage(player.partner);
      updateNotebook();
    }
  }
}

// UI更新関数
function showFieldView() {
  document.getElementById("partner-selection").style.display = "none";
  document.getElementById("field-view").style.display = "block";
  document.getElementById("actions").style.display = "block";
  document.getElementById("notebook").style.display = "block";
}

function updateFieldDescription(text) {
  document.getElementById("field-description").textContent = text;
}

function updatePartnerImage(name) {
  document.getElementById("partner-image").src = `images/${name.toLowerCase()}.png`;
}

function updateNotebook() {
  const notesUl = document.getElementById("notes");
  notesUl.innerHTML = "";
  player.notebook.forEach(note => {
    const li = document.createElement("li");
    li.textContent = note;
    notesUl.appendChild(li);
  });
}

// パートナー選択
function selectPartner(name) {
  player.partner = name;
  player.location = partners[name].field;

  showFieldView();
  updateFieldDescription(`${player.location}に到着。${name}があなたを見つめている…`);
  updatePartnerImage(name);

  recordObservation("契約", `${name}と契約した`);
  savePlayerData(); // 保存
}

// ノートに記録
function recordObservation(action, detail) {
  const note = `${new Date().toLocaleTimeString()} - ${action}: ${detail}`;
  player.notebook.push(note);
  updateNotebook();
  savePlayerData(); // 保存
}

// 操作関数
function observe() {
  recordObservation("観察", `${player.partner}の行動を観察した`);
  alert(`${player.partner}が周囲を観察している…`);
}

function movePartner() {
  recordObservation("移動", `${player.partner}を移動させた`);
  alert(`${player.partner}が少し移動した`);
}

function collectMaterial() {
  recordObservation("採集", `${player.partner}と共に素材を収集`);
  alert(`小魚や植物を採集した`);
}

// ページロード時にCookieから復元
window.addEventListener("load", () => {
  loadPlayerData();
});