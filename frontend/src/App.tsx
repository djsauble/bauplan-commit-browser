import React, { useState, useEffect } from 'react';
import BranchSelector from './components/BranchSelector';
import FilterBar from './components/FilterBar';
import CommitList from './components/CommitList';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import { fetchBranches, fetchCommitsByBranch } from './api/bauplanApi';
import { Branch, Commit } from './types';

const App: React.FC = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [commits, setCommits] = useState<Commit[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [messageFilter, setMessageFilter] = useState<string>('');
  const [dateFilter, setDateFilter] = useState<string>('');
  const [authorFilter, setAuthorFilter] = useState<string>('');
  const [parentFilter, setParentFilter] = useState<string>('');

  const [authors, setAuthors] = useState<{ name?: string; email?: string }[]>([]);

  // Read branch from URL query parameter on mount
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const branchParam = queryParams.get('branch');

    if (branchParam) {
      setSelectedBranch(branchParam);
    }
  }, []);

  // Fetch branches on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const branchesData = await fetchBranches();
        setBranches(branchesData);

        // Get branch from URL query param
        const queryParams = new URLSearchParams(window.location.search);
        const branchParam = queryParams.get('branch');

        // Set selected branch (priority: URL param > main branch > default first branch)
        if (branchParam) {
          // Check if branch exists in available branches
          if (branchesData.some(branch => branch.id === branchParam)) {
            setSelectedBranch(branchParam);
          } else {
            // If branch doesn't exist, find and use 'main' branch
            const mainBranch = branchesData.find(branch => branch.id === 'main');
            if (mainBranch) {
              setSelectedBranch('main');
            } else if (branchesData.length > 0) {
              setSelectedBranch(branchesData[0].id);
            }
          }
        } else if (branchesData.length > 0 && !selectedBranch) {
          // No branch specified, use 'main' if available
          const mainBranch = branchesData.find(branch => branch.id === 'main');
          if (mainBranch) {
            setSelectedBranch('main');
          } else {
            setSelectedBranch(branchesData[0].id);
          }
        }

        setError(null);
      } catch (err) {
        setError('Failed to load branches. Please try again.');
        console.error('Error fetching branches:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch commits when selected branch changes
  useEffect(() => {
    const fetchCommits = async () => {
      if (selectedBranch) {
        try {
          setIsLoading(true);
          const [startDate, endDate] = dateFilter.split('~');
          const commitsData = await fetchCommitsByBranch(
            selectedBranch,
            20,
            startDate || undefined,
            endDate || undefined
          );
          setCommits(commitsData);
          // Extract unique authors
          const uniqueAuthors = Array.from(
            new Map(
              commitsData
                .filter(c => c.author)
                .map(c => [c.author?.email, c.author])
            ).values()
          ).filter(Boolean) as { name?: string; email?: string }[];
          setAuthors(uniqueAuthors);
          setError(null);

          // Update URL with the selected branch
          const url = new URL(window.location.href);
          url.searchParams.set('branch', selectedBranch);
          window.history.pushState({}, '', url);
        } catch (err) {
          setError('Failed to load commits. Please try again.');
          console.error('Error fetching commits:', err);
          setCommits([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCommits();
  }, [selectedBranch, dateFilter]);

  const handleBranchChange = (branchId: string) => {
    if (branchId !== selectedBranch) {
      setSelectedBranch(branchId);
    }
  };

  return (
    <div className="bauplan-layout">
      <Sidebar activeItem="commits" />
      <div className="bauplan-main">
        <Header username="djsauble" />
        <div className="bauplan-content">
          <h1 className="content-title">Commit Browser</h1>
          <div className="branch-selector-group">
            <label className="branch-selector-label">Branch</label>
            <BranchSelector
              branches={branches}
              selectedBranch={selectedBranch}
              onBranchChange={handleBranchChange}
            />
          </div>

          <FilterBar
            onMessageFilterChange={setMessageFilter}
            onDateFilterChange={setDateFilter}
            onAuthorFilterChange={setAuthorFilter}
            onParentFilterChange={setParentFilter}
            authors={authors}
          />

          {isLoading ? (
            <div>Loading...</div>
          ) : error ? (
            <div style={{ color: 'red' }}>{error}</div>
          ) : (
            <CommitList
              commits={commits}
              messageFilter={messageFilter}
              dateFilter={dateFilter}
              authorFilter={authorFilter}
              parentFilter={parentFilter}
              currentBranch={selectedBranch}
              availableBranches={branches.map(branch => branch.id)}
              onBranchChange={handleBranchChange}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default App;