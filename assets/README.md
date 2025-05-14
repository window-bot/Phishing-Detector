# 🛡️ Phishing Detector Extension with Dashboard

A Chrome browser extension that detects **phishing websites** and displays a real-time result with backend logging and dashboard viewing capabilities.

---

## 📸 Live Demo

![Demo Screenshot](assets/demo.png)

---

## 🔍 Features

- ✅ Detect phishing/safe URLs (demo logic: `.xyz` → phishing)
- 📋 Log all scans with timestamps
- 📊 Web Dashboard to view scan history
- 🌙 Dark mode toggle
- 🔎 Search and filter logs
- 📥 Download logs as CSV
- 🔒 CORS-enabled FastAPI backend

---

## 📁 Project Structure

phishing_detector/
├── backend/
│ ├── main.py
│ ├── logs.csv
│ ├── static/
│ └── templates/
├── dashboard/
│ └── (optional future enhancements)
├── extension/
│ ├── background.js
│ ├── content.js
│ ├── icons/
│ ├── manifest.json
│ ├── popup.html
│ └── popup.js
├── threat_feeds/
│ ├── feeds/
│ └── utils/
├── assets/
│ └── demo.png
└── README.md
---

## 🚀 Getting Started

### 🔧 Backend (FastAPI)

```bash
cd backend
source myenv/bin/activate
uvicorn main:app --reload
Then visit: http://127.0.0.1:8000/dashboard

🧩 Chrome Extension
Go to chrome://extensions

Enable Developer Mode

Click Load unpacked

Select the extension/ folder

🛠️ Tech Stack
Backend: FastAPI + Python

Frontend: HTML + JS + Bootstrap

Browser Extension: JavaScript

Styling: Custom CSS + Bootstrap

Data: CSV log storage

📌 Note
This project is a demo build to showcase a phishing detection concept. In real-world usage, always use verified APIs like Google Safe Browsing, Phishtank, etc.
---

✅ **Next Step:** Bas ab is content ko `README.md` file me paste karo.  
🟢 Jab ho jaye to bolna, fir `git init`, `.gitignore`, aur GitHub upload wala process start karenge step-by-step.

