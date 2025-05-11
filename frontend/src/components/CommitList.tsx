import React from 'react';
import CommitItem from './CommitItem';
import { Commit, CommitWithMergeInfo } from '../types';

interface CommitListProps {
  commits: Commit[];
  messageFilter: string;
  dateFilter: string;
  authorFilter: string;
  parentFilter: string;
  currentBranch: string;
  availableBranches?: string[]; // Add available branches
  onBranchChange?: (branchId: string) => void;
}

const CommitList: React.FC<CommitListProps> = ({
  commits,
  messageFilter,
  dateFilter,
  authorFilter,
  parentFilter,
  currentBranch,
  availableBranches = [],
  onBranchChange,
}) => {
  // Apply filters
  const filteredCommits = commits.filter(commit => {
    // Apply message filter
    if (messageFilter && !commit.message.toLowerCase().includes(messageFilter.toLowerCase())) {
      return false;
    }

    // Apply author filter
    if (authorFilter &&
        (!commit.author?.name?.toLowerCase().includes(authorFilter.toLowerCase()) &&
         !commit.author?.email?.toLowerCase().includes(authorFilter.toLowerCase()))) {
      return false;
    }

    // Apply parent filter
    if (parentFilter && !commit.parent_ids.some(id => id.includes(parentFilter))) {
      return false;
    }

    return true;
  });

  // Process commits to add mergedFrom property only if the branch exists
  const processedCommits = filteredCommits.map(commit => {
    const mergedBranch = commit.message.match(/^Merge\s+(.+?)\s+into\s+(.+?)$/i);
    const branchName = mergedBranch && mergedBranch.length > 1 ? mergedBranch[1] : null;

    // Check if the extracted branch name exists in available branches
    const commitWithMerge = {...commit} as CommitWithMergeInfo;
    if (branchName && availableBranches.includes(branchName)) {
      commitWithMerge.mergedFrom = branchName;
    }

    return commitWithMerge;
  });

  return (
    <ul className="commit-list">
      {processedCommits.length > 0 ? (
        processedCommits.map(commit => (
          <CommitItem
            key={commit.id}
            commit={commit}
            currentBranch={currentBranch}
          />
        ))
      ) : (
        <li className="commit-item">No matching commits found</li>
      )}
    </ul>
  );
};

export default CommitList;