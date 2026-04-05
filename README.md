# SheEarns 🚀

**Her Skills. Her Money. Her Rules.**

SheEarns is a web platform designed to help young African women monetize practical skills through guided onboarding, pricing support, client acquisition tools, a local marketplace, AI assistance, and a personal income dashboard.

### Project Status 📊
This repository currently contains:
* A working React frontend with the main product pages and flows
* A backend scaffold structure for FastAPI services and routers

### Repository Structure 📂
* **sheearns-frontend:** React + Vite frontend
* **sheearns-backend:** FastAPI backend scaffold

### Frontend Features ✨
* Landing page & Onboarding flow
* Pricing calculator UI
* Marketplace with filtering and category browsing
* Dynamic queen profile route
* AI Coach chat interface UI
* Roadmap page with templates
* Dashboard UI with progress and quick actions
* Authentication UI with context-based session state

### Backend Status 🛠️
Backend folders and routers are in place, but core implementation is still in progress.
**Available structure:**
* main.py
* routers/ai.py, pricing.py, marketplace.py, users.py, dashboard.py
* models/ & services/

### Tech Stack 💻
**Frontend:**
* React, Vite, Tailwind CSS, Lucide React, AOS

**Backend Target Stack:**
* Python, FastAPI, PostgreSQL (planned via Supabase), AI integration

### Getting Started 🚀

**1) Clone the repository**
```bash
git clone [https://github.com/cheropbecky/SheEarns.git](https://github.com/cheropbecky/SheEarns.git)
cd SheEarns
```

**2) Run the frontend**
```bash
cd sheearns-frontend
npm install
npm run dev
```
*Frontend runs at: http://localhost:5173*

**3) Build frontend for production**
```bash
npm run build
npm run preview
```

**4) Backend setup (scaffold)**
```bash
cd sheearns-backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```
*Note: Backend endpoint implementation is still pending.*

### Environment Variables 🔐
**Frontend:**
`VITE_API_URL`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`

**Backend:**
`OPENAI_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `SECRET_KEY`, `ALLOWED_ORIGINS`

### Roadmap 🗺️
* **Short term:** Connect frontend pages to backend APIs & implement persistent data.
* **Mid term:** Add booking/review flows and Supabase Auth integration.
* **Long term:** Payments integration, mobile app, and regional expansion.

### Contributing 🤝
1. Create a feature branch
2. Commit focused changes
3. Open a pull request

### License
Public
```
