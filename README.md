# Ask Vadym - Portfolio Chatbot

Interactive portfolio chatbot for Vadym, an ISTQB-certified AI QA Engineer with 10+ years of experience.

## Quick Start

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Add your OPENAI_API_KEY to .env
uvicorn app.main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visit http://localhost:3000

## Tech Stack

- **Backend**: FastAPI, OpenAI SDK, Python 3.11+
- **Frontend**: Next.js 14, TypeScript, TailwindCSS
- **AI Model**: gpt-4o-mini

## Project Structure

```
ask-vadym/
├── backend/          # FastAPI API
├── frontend/         # Next.js UI
├── CLAUDE.md         # Development guide
└── README.md
```

See [CLAUDE.md](./CLAUDE.md) for detailed development documentation.
