# Bauplan Commit Browser Backend

A FastAPI application that provides an API for browsing branches and commits from the Bauplan API.

## Features

- Fetch list of branches from Bauplan
- Fetch list of commits for a specific branch

## Requirements

- Python 3.9+
- uv (for dependency management)

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with your Bauplan API key:
   ```
   BPLN_KEY=your_bauplan_api_key_here
   ```
3. Install dependencies with uv:
   ```
   uv venv
   uv pip install -e ".[dev]"
   ```

## Running the API

```bash
uv run run.py
```

The API will be available at http://localhost:8000

## API Endpoints

- `GET /`: API health check
- `GET /api/branches`: Get list of all branches
- `GET /api/branches/{branch_id}/commits`: Get all commits for a specific branch

## Running Tests

```bash
uv run pytest
```