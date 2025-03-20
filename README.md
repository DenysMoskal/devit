## Quick Start with Docker

1. Clone the repository:

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

2. Create `.env` file in the backend directory:

```bash
cp backend/.env.example backend/.env
```

3. Create `.env` file in the frontend directory:

```bash
cp frontend/.env.example frontend/.env
```

4. Start the containers:

```bash
docker compose up
```

5. Access the application:

- Backend: http://localhost:4000
- Frontend: http://localhost:3000
