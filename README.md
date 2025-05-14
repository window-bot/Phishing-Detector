# 🛡️ Phishing Detector

A powerful Chrome browser extension with a FastAPI backend and web dashboard that detects and logs phishing or suspicious URLs in real-time.

![Screenshot](https://raw.githubusercontent.com/window-bot/Phishing-Detector/main/extension_screenshot.png)

---

## 🚀 Features

- 🔍 Real-time phishing detection
- ✅ Google Safe Browsing API integration
- 📊 Web dashboard with logs view
- 🌗 Dark mode support
- 🔎 Search and filter logs
- 📥 Download logs as CSV
- 🔒 Secure CORS communication with extension

---

## 🧩 Components

### 🔹 Browser Extension
- Built with HTML, JS, and manifest v3
- Detects and sends URL to backend API
- Displays result in a popup

### 🔹 Backend API (FastAPI)
- Accepts and scans URLs
- Logs to `logs.csv`
- Serves dashboard

### 🔹 Web Dashboard
- Built with Jinja2 + HTML + TailwindCSS
- Displays logs with search, filter, dark mode
- Option to download logs

---

## 📁 Project Structure

phishing_detector/
│
├── backend/
│ ├── main.py
│ ├── logs.csv
│ ├── static/
│ ├── templates/
│ └── feeds/ & utils/
│
├── extension/
│ ├── manifest.json
│ ├── popup.html / popup.js
│ ├── background.js / content.js
│ └── icons/
│
├── dashboard/ ← Optional separate folder for UI
├── threat_feeds/ ← Future enhancements
├── README.md

yaml
Copy
Edit

---

## 🛠️ How to Run

### ▶️ Backend (API + Dashboard)

```bash
cd backend
source myenv/bin/activate      # Or use your venv
uvicorn main:app --reload
Access Dashboard: http://127.0.0.1:8000/dashboard

🧪 Chrome Extension

1. Open chrome://extensions/

2. Enable Developer Mode

3. Click Load Unpacked

4. Select the extension/ folder

5. Visit any website to test

📦 Installation
Backend uses Python 3.9+

cd backend
python3 -m venv myenv
source myenv/bin/activate
pip install -r requirements.txt


💡 Technologies Used
🐍 Python (FastAPI, Jinja2)

🌐 JavaScript, HTML, CSS

🧠 Google Safe Browsing API

🧪 Chrome Extensions API

🐧 Linux (Kali)

👤 Author
window-bot
Made with ❤️ by a cybersecurity enthusiast.

📄 License
This project is licensed under the MIT License.


---

### 🔧 Next Step:

Upload your screenshot to GitHub like this:

```bash
# Move the screenshot to root project folder
mv your_screenshot.png phishing_detector/extension_screenshot.png

# Stage and push
git add .
git commit -m "Added screenshot for README"
git push

