from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import bauplan
from bauplan.exceptions import BauplanError
from datetime import datetime

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Bauplan Commit Browser API",
    description="API for browsing branches and commits from Bauplan",
    version="0.1.0",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set this to the frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Bauplan client dependency
def get_bauplan_client():
    api_key = os.getenv("BPLN_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="Bauplan API key not configured")
    
    try:
        client = bauplan.Client(api_key=api_key)
        return client
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to initialize Bauplan client: {str(e)}")

# Response models
class Branch(BaseModel):
    id: str
    name: str
    last_commit_id: Optional[str] = None

class Commit(BaseModel):
    id: str
    message: str
    timestamp: str
    branch_id: str
    parent_ids: List[str]
    author: Optional[dict] = None

@app.get("/", response_model=dict)
async def root():
    return {"status": "ok", "message": "Bauplan Commit Browser API"}

@app.get("/api/branches", response_model=List[Branch])
async def get_branches(client: bauplan.Client = Depends(get_bauplan_client)):
    try:
        branches = client.get_branches()
        transformed_branches = []
        for branch in branches:
            transformed_branch = {
                "id": branch.name,  # Using the name as the id
                "name": branch.name,
                "last_commit_id": None  # This field is optional in our model
            }
            transformed_branches.append(transformed_branch)
        return transformed_branches
    except BauplanError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch branches: {str(e)}")

@app.get("/api/branches/{branch_id}/commits", response_model=List[Commit])
async def get_commits_by_branch(
    branch_id: str,
    limit: int = 10,
    start_date: str | None = None,
    end_date: str | None = None,
    message_filter: str | None = None,
    client: bauplan.Client = Depends(get_bauplan_client)
) -> list[Commit]:
    """Get commits for a branch with optional date range and message filtering."""
    try:
        commits = client.get_commits(
            branch_id,
            filter_by_authored_date_start_at=start_date,
            filter_by_authored_date_end_at=end_date,
            filter_by_message=message_filter,
            limit=limit
        )
        
        transformed_commits = []
        for commit in commits:
            transformed_commit = {
                "id": commit.ref.hash,
                "message": commit.message,
                "timestamp": commit.committed_date.isoformat(),
                "branch_id": commit.ref.name,
                "parent_ids": commit.parent_hashes,
                "author": {
                    "name": commit.authors[0].name if commit.authors else None,
                    "email": commit.authors[0].email if commit.authors else None
                } if commit.authors else None
            }
            transformed_commits.append(transformed_commit)
        return transformed_commits
    except BauplanError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch commits: {str(e)}")