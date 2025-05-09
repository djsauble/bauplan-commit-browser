import React, { useState } from 'react';

interface FilterBarProps {
  onMessageFilterChange: (filter: string) => void;
  onDateFilterChange: (filter: string) => void;
  onAuthorFilterChange: (filter: string) => void;
  onParentFilterChange: (filter: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  onMessageFilterChange,
  onDateFilterChange,
  onAuthorFilterChange,
  onParentFilterChange,
}) => {
  const [messageFilter, setMessageFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');
  const [authorFilter, setAuthorFilter] = useState('');
  const [parentFilter, setParentFilter] = useState('');

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageFilter(value);
    onMessageFilterChange(value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDateFilter(value);
    onDateFilterChange(value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAuthorFilter(value);
    onAuthorFilterChange(value);
  };

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParentFilter(value);
    onParentFilterChange(value);
  };

  return (
    <div className="filters-container">
      <div className="filter">
        <input
          type="text"
          placeholder="Message Filter"
          value={messageFilter}
          onChange={handleMessageChange}
        />
      </div>
      <div className="filter">
        <input
          type="text"
          placeholder="Date Filter"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </div>
      <div className="filter">
        <input
          type="text"
          placeholder="Author Filter"
          value={authorFilter}
          onChange={handleAuthorChange}
        />
      </div>
    </div>
  );
};

export default FilterBar;