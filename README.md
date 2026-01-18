# Vani-Health

Voice-first healthcare access guidance for India.

## Setup

### Backend

1. Create a Gemini API key and set it in `backend/.env`:

```
GEMINI_API_KEY=your_key_here
FRONTEND_ORIGIN=http://localhost:3000
PORT=4000
```

2. Install dependencies and run:

```
cd backend
npm install
npm run dev
```

### Frontend

1. Point the frontend to the backend in `frontend/.env`:

```
NEXT_PUBLIC_API_BASE=http://localhost:4000
```

2. Install dependencies and run:

```
cd frontend
npm install
npm run dev
```
