# Bauplan commit browser

A web-based interface for exploring the commit history of a given environment using the commit API of Bauplan.
Technical users (developers, data scientists, ML engineers) can use this to understand how their code and data evolved over time.

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

React frontend → FastAPI backend → Bauplan API

## Limitations

* Author filter is limited to the authors of commits currently displayed in the UI
* No pagination, the commit list is limited to 20 entries

## Future improvements

* Breadcrumb which enables quick navigation to the parent(s) of the selected branch
* Infinite scroll for the commits list
* Branch selector and author filter should support type-ahead
* Author filter uses backend to get all authors sorted by number of commits
* Show not just the commit message but the tables that changed and what the changes were
* Show status of last job in branch selector and for each task in the commit list (for ref branches)
* Add ability to run a branch (potentially at an arbitrary commit) so you can re-run a historical snapshot
* Add ability to merge a branch (treating an environment as a staging area that you ship when ready)
* Timeline view where you can see which authors contributed to which branches over time
