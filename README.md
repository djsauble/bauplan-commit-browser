# Bauplan commit browser

A web-based interface for exploring the commit history of a given environment using the commit API of Bauplan.
The goal is a small, clean UI that helps technical users (developers, data scientists, ML engineers) understand how their code and data evolved over time.

## Get started

### Start the backend

In one terminal, start the backend FastAPI service.

```
cd backend/
cp .env.example .env # Add your Bauplan API key
uv venv
uv pip install -e ".[dev]"
uv run run.py
```

The server is now running at https://localhost:8000.
Check http://localhost:8000/api/branches to see if you can retrieve a list of branches from Bauplan.

For more details about the backend and available endpoints, see backend/README.md.

### Start the frontend

In another terminal, start the frontend React app.

```
cd frontend/
npm install
npm start
```

Open https://localhost:3000 in your browser. Enjoy!

## Architecture

* FastAPI backend
* React frontend

## Limitations

TBD

## Future improvements

TBD