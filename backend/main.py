from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from urllib.parse import urlparse
import csv
import os

app = FastAPI()

# CORS for Chrome Extension
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class URLData(BaseModel):
    url: str

LOG_FILE = "logs.csv"

def scan_and_log(url: str) -> dict:
    result = "phishing" if url.endswith(".xyz") else "safe"
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    # HTTPS check
    parsed_url = urlparse(url)
    is_https = parsed_url.scheme == "https"
    note = "" if is_https else "⚠ Connection is not secure (uses HTTP)."

    # Log to CSV
    file_exists = os.path.isfile(LOG_FILE)
    with open(LOG_FILE, "a", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["timestamp", "url", "result", "note"])
        writer.writerow([timestamp, url, result, note])

    return {"timestamp": timestamp, "url": url, "result": result, "note": note}

@app.post("/scan_url")
async def scan_url(data: URLData):
    try:
        log_entry = scan_and_log(data.url)
        return {"status": "success", "log": log_entry}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Optional: Dashboard route if needed
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

@app.get("/dashboard", response_class=HTMLResponse)
async def dashboard(request: Request):
    logs = []
    if os.path.exists(LOG_FILE):
        with open(LOG_FILE, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            logs = list(reader)
    return templates.TemplateResponse("dashboard.html", {"request": request, "logs": logs})

@app.get("/download_csv")
async def download_csv():
    if os.path.exists(LOG_FILE):
        return FileResponse(
            path=LOG_FILE,
            filename="phishing_logs.csv",
            media_type="text/csv"
        )
    else:
        raise HTTPException(status_code=404, detail="Log file not found")
