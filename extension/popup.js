document.addEventListener("DOMContentLoaded", () => {
  const urlDisplay = document.getElementById("urlDisplay");
  const checkBtn = document.getElementById("checkBtn");
  const resultCard = document.getElementById("resultCard");
  const loader = document.getElementById("loader");

  let currentUrl = "";

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    currentUrl = tabs[0]?.url || "N/A";
    urlDisplay.textContent = "URL: " + currentUrl;
  });

  checkBtn.addEventListener("click", () => {
    resultCard.style.display = "none";
    loader.style.display = "block";

    fetch("http://127.0.0.1:8000/scan_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: currentUrl })
    })
    .then(res => res.json())
    .then(data => {
      loader.style.display = "none";
      resultCard.style.display = "block";

      const result = data.log?.result || "unknown";
      const timestamp = data.log?.timestamp || "N/A";
      const note = data.log?.note || "";

      if (result === "phishing") {
        resultCard.className = "phishing";
        resultCard.innerHTML = `
          ⚠ <strong>Phishing Detected</strong><br>
          <div class="timestamp">Scanned: ${timestamp}</div>
        `;
      } else {
        resultCard.className = "safe";
        resultCard.innerHTML = `
          ✅ <strong>Site is Safe</strong><br>
          <div class="timestamp">Scanned: ${timestamp}</div>
          ${note ? `<div class="note">${note}</div>` : ""}
          <div class="link" style="margin-top: 5px; color: blue; text-decoration: underline; cursor: pointer;">
            Open Site
          </div>
        `;

        // Add event listener to open link
        const link = resultCard.querySelector(".link");
        link.addEventListener("click", () => {
          chrome.tabs.create({ url: currentUrl });
        });
      }
    })
    .catch(err => {
      loader.style.display = "none";
      resultCard.style.display = "block";
      resultCard.className = "phishing";
      resultCard.innerHTML = `❌ Error: ${err.message}`;
    });
  });
});
