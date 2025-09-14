async function generateCreatureImage(prompt) {
  const response = await fetch("/api/generateImage", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await response.json();
  if (data.image) {
    document.getElementById("creatureImage").src = data.image;
  } else {
    console.error("Image generation failed:", data.error);
  }
}

// 例: 配合ボタン押下時
document.getElementById("breedButton").addEventListener("click", () => {
  const prompt = "赤い翼のドラゴン、森の中";
  generateCreatureImage(prompt);
});