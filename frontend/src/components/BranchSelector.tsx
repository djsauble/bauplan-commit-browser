import React from 'react';
import { Branch } from '../types';

interface BranchSelectorProps {
  branches: Branch[];
  selectedBranch: string;
  onBranchChange: (branchId: string) => void;
}

const BranchSelector: React.FC<BranchSelectorProps> = ({
  branches,
  selectedBranch,
  onBranchChange,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onBranchChange(e.target.value);
  };

  return (
    <div className="branch-selector">
      <select
        className="branch-dropdown"
        value={selectedBranch}
        onChange={handleChange}
      >
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelector;