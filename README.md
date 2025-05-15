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

## Jobs to be done

### Track changes

See what changed, when, and why.

> <span style="color: green">✓</span> Nominally met by current design, though the "what" could be clearer (e.g. a list of tables and actions taken, a diff view of code).

### Debug regressions

Check if a recent commit introduced a bug.

> <span style="color: red">✗</span> Need to show run status in the commit list + task status in ref branches.

### Review team activity

Understand who changed what in collaborative projects.

> <span style="color: green">✓</span> Met by current design, though we might want to support multiple authors per commit (merges)

### Reproduce past results

Grab a historical snapshot and re-run it.

> <span style="color: red">✗</span> Need the ability to create a branch from a particular commit and run it.

### Manage data releases

Treat the environment as a staging area and ship when ready.

> <span style="color: red">✗</span> Need the ability to merge a branch once it has a successful run.

## Future design explorations

* Commit history is a DAG, so the current list view is a somewhat limited view of the underlying data structure. A graph representation would provide a clearer visualization in situations where a commit has multiple parents (e.g. a main branch and a feature branch, or a feature branch and a ref branch).

* Branch relationships are also not represented well in the current design (outside of embedded links in the commit history). We could add a breadcrumb which shows the ancestors and children of the current branch (useful for understanding relationships as well as navigation).

* A diff view would make it easier for data engineers to understand the difference between two commits (e.g. when they're trying to figure out what code change caused a bug).

* If the same branch is run multiple times, we should be able to show the run history. This is useful when the code fails intermittently, in which case the last run status doesn't tell the whole story.

* Ref branches are special, in the sense that they reflect active jobs or jobs that have failed. We could add some kind of annotation in the branch selector to highlight these branches, or provide a dedicated filter so you can manage these branches directly (in a way these serve the same purpose as PRs in GitHub, which also provides a dedicated view for managing them).

* In a collaborative environment, when you're trying to contribute to a given branch, it might be useful to see which authors have contributed most recently (possibly at the level of individual lines of code) so that you know who to reach out to if you have a question about something.

## Other usability improvements

* Infinite scroll for the commits list

* Branch selector and author filter should support type-ahead

* Branch selector sorts by most recently updated
