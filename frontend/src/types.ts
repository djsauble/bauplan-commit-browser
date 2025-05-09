export interface Branch {
  id: string;
  name: string;
  last_commit_id?: string;
}

export interface Author {
  name?: string;
  email?: string;
}

export interface Commit {
  id: string;
  message: string;
  timestamp: string;
  branch_id: string;
  parent_ids: string[];
  author?: Author;
}

export interface CommitWithMergeInfo extends Commit {
  mergedFrom?: string;
}