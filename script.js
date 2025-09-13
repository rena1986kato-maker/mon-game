document.getElementById("generate").addEventListener("click", async () => {
  const res = await fetch("/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "冒険に出る生物の物語を作ってください。" })
  });

  const data = await res.json();
  document.getElementById("output").textContent = data.result || data.error;
});
