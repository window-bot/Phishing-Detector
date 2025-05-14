# Phishing Detection Browser Extension with FastAPI Dashboard

This is a phishing detection project that includes:
- A **browser extension** to scan the current tab's URL.
- A **FastAPI backend** to classify the URL and log results.
- A **web dashboard** to view logs, with search, dark mode, and CSV export.

## Features
- URL phishing detection (basic `.xyz` check, can be extended)
- Logs URLs with timestamp and result
- Extension UI shows result and allows opening the site
- Dashboard with filtering, dark mode toggle, and CSV download

## Project Structure
phishing_detector/
├── backend/ # FastAPI backend with dashboard
│ ├── main.py
│ ├── logs.csv
│ ├── static/
│ ├── templates/
│ ├── feeds/
│ └── utils/
├── extension/ # Chrome extension files
│ ├── background.js
│ ├── popup.html
│ ├── popup.js
│ ├── icons/
│ └── manifest.json


## Getting Started
1. **Backend:**
   ```bash
   cd backend
   uvicorn main:app --reload


Extension:

Go to chrome://extensions/

Enable "Developer mode"

Click "Load unpacked" and select the extension/ folder
