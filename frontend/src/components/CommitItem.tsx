import React from 'react';
import { CommitWithMergeInfo } from '../types';

interface CommitItemProps {
  commit: CommitWithMergeInfo;
  currentBranch: string;
}

const CommitItem: React.FC<CommitItemProps> = ({ commit, currentBranch }) => {
  // Format the timestamp
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffMinutes < 60 * 24) {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      const days = Math.floor(diffMinutes / (60 * 24));
      return `${days} ${days === 1 ? 'day' : 'days'} ago`;
    }
  };

  // Generate initials for avatar placeholder
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Extract branch name from merge message
  const extractMergedBranch = (message: string): string | null => {
    const mergeMatch = message.match(/^Merge\s+(.+?)\s+into\s+(.+?)$/i);
    return mergeMatch && mergeMatch.length > 1 ? mergeMatch[1] : null;
  };

  const mergedBranch = extractMergedBranch(commit.message);
  const handleBranchClick = (branchName: string) => {
    // Don't do anything if branchName is empty
    if (!branchName) return;

    // Update URL and reload to switch branches
    if (commit.branch_id !== branchName) {
      // Set the query parameter and reload the page
      const url = new URL(window.location.href);
      url.searchParams.set('branch', branchName);
      window.location.href = url.toString();
    }
  };

  return (
    <li className="commit-item">
      <div className="commit-item-dot"></div>
      <div className="commit-timestamp">{formatDate(commit.timestamp)}</div>
      <div className="commit-message">{commit.message}</div>
      <div className="commit-author">
        <div className="author-avatar" style={{
          backgroundColor: '#ddd',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '12px'
        }}>
          {getInitials(commit.author?.name)}
        </div>
        <span className="author-name">{commit.author?.name}</span>
        <span className="author-email">&lt;{commit.author?.email}&gt;</span>

        {commit.mergedFrom && (
          <span className="merge-info" style={{ marginLeft: 'auto' }}>
            Merged from <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleBranchClick(commit.mergedFrom || ''); }}
              className="branch-label"
              style={{ color: '#0066cc', textDecoration: 'none' }}
            >
              <span className="branch-icon">⎇</span>{commit.mergedFrom}
            </a>
          </span>
        )}
      </div>
    </li>
  );
};

export default CommitItem;