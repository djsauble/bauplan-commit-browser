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
  onBranchChange?: (branchId: string) => void;
}

const CommitList: React.FC<CommitListProps> = ({
  commits,
  messageFilter,
  dateFilter,
  authorFilter,
  parentFilter,
  currentBranch,
  onBranchChange,
}) => {
  // Apply filters
  const filteredCommits = commits.filter(commit => {
    // Apply message filter
    if (messageFilter && !commit.message.toLowerCase().includes(messageFilter.toLowerCase())) {
      return false;
    }

    // Apply date filter (simple text match in formatted date)
    if (dateFilter) {
      const date = new Date(commit.timestamp).toLocaleDateString();
      if (!date.includes(dateFilter)) {
        return false;
      }
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

  return (
    <ul className="commit-list">
      {filteredCommits.length > 0 ? (
        filteredCommits.map(commit => (
          <CommitItem
            key={commit.id}
            commit={commit as CommitWithMergeInfo}
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