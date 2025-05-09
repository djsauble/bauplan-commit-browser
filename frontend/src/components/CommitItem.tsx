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

  // No longer needed as we handle this in renderCommitMessage
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

  // Function to render commit message with branch name as a link if it exists
  const renderCommitMessage = (message: string, mergedBranch?: string) => {
    if (!mergedBranch) {
      // If no merged branch or branch doesn't exist, return the plain message
      return message;
    }

    // For merge commits, highlight the branch name as a link
    const mergeRegex = /^Merge\s+(.+?)\s+into\s+(.+?)$/i;
    const match = message.match(mergeRegex);

    if (match && match.length > 2) {
      const [fullMessage, branchName, targetBranch] = match;

      // Only make it a link if it matches the mergedFrom branch (which we know exists)
      if (branchName === mergedBranch) {
        return (
          <>
            Merge{' '}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleBranchClick(mergedBranch); }}
              style={{ color: '#0066cc', textDecoration: 'none' }}
            >
              ⎇ {branchName}
            </a>
            {' '}into{' '}{targetBranch}
          </>
        );
      }
    }

    // Default case: return the plain message
    return message;
  };

  return (
    <li className="commit-item">
      <div className="commit-item-dot"></div>
      <div className="commit-timestamp">{formatDate(commit.timestamp)}</div>
      <div className="commit-message">
        {renderCommitMessage(commit.message, commit.mergedFrom)}
      </div>
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
      </div>
    </li>
  );
};

export default CommitItem;