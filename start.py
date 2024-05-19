import subprocess
subprocess.run(["powershell", "-Command", "start 'C:/Program Files/Google/Chrome/Application/chrome.exe' --app='http://localhost:3000'"], capture_output=True, text=True)
subprocess.run(["powershell", "-Command", "pnpm dev"], capture_output=True, text=True)