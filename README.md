# Ask Vadym

An AI-powered portfolio chatbot that lets visitors learn about my professional background, skills, and experience through natural conversation.

**Live:** [ask-vadym.com](https://ask-vadym.com)

## About

I built this project to showcase my QA engineering expertise in an interactive way. Instead of a static resume, visitors can ask questions and get conversational responses about my experience in test automation, quality engineering, and software testing.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 14, TypeScript, TailwindCSS |
| Backend | FastAPI, Python 3.11+, OpenAI SDK |
| AI Model | gpt-4o-mini |
| Hosting | Vercel (frontend), Railway (backend) |

## Local Development

### Prerequisites

- Python 3.11+
- Node.js 18+
- OpenAI API key

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Verify Setup

- Frontend: http://localhost:3000
- Backend health: http://localhost:8000/health
- API docs: http://localhost:8000/docs

## Project Structure

```
ask-vadym/
├── backend/           # FastAPI API server
│   ├── app/
│   │   ├── api/       # API endpoints
│   │   ├── services/  # OpenAI integration
│   │   └── prompts/   # System prompt configuration
│   └── requirements.txt
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # Pages
│   │   └── components/# UI components
│   └── package.json
└── README.md
```

## Features

- Streaming chat responses
- Rate limiting (20 requests/hour per IP)
- Mobile-responsive design
- Example questions to get started
- Error handling with user-friendly messages

## Author

**Vadym Marochok** - QA Engineer

- LinkedIn: [linkedin.com/in/vadym-m](https://www.linkedin.com/in/vadym-m/)
- GitHub: [github.com/vadymrck](https://github.com/vadymrck)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
