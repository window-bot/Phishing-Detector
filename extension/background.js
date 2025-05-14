chrome.runtime.onInstalled.addListener(() => {
  console.log("Phishing Detector extension installed.");
});

chrome.action.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    if (!tabs || tabs.length === 0) {
      console.error("No active tab found.");
      return;
    }

    const currentUrl = tabs[0].url;
    console.log("Checking URL:", currentUrl);

    fetch("http://localhost:8000/scan_url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: currentUrl })
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("HTTP error! status: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Full Response from backend:", data);

        if (data?.status === "success" && data?.log?.result) {
          const result = data.log.result;

          chrome.notifications.create({
            type: "basic",
            iconUrl: "icons/icon128.png",
            title: "Phishing Check Result",
            message: `URL is detected as: ${result}`
          });

        } else {
          throw new Error("Unexpected response format: " + JSON.stringify(data));
        }
      })
      .catch(error => {
        console.error("Error during phishing scan:", error);
        chrome.notifications.create({
          type: "basic",
          iconUrl: "icons/icon128.png",
          title: "Phishing Scan Failed",
          message: `Error: ${error.message}`
        });
      });
  });
});
