import React, { useState, useRef } from 'react';

interface FilterBarProps {
  onMessageFilterChange: (filter: string) => void;
  onDateFilterChange: (filter: string) => void;
  onAuthorFilterChange: (filter: string) => void;
  onParentFilterChange: (filter: string) => void;
  authors: { name?: string; email?: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  onMessageFilterChange,
  onDateFilterChange,
  onAuthorFilterChange,
  onParentFilterChange,
  authors,
}) => {
  const [messageFilter, setMessageFilter] = useState('');
  const [dateRange, setDateRange] = useState<{ start: string; end: string } | null>(null);
  const [authorFilter, setAuthorFilter] = useState('');
  const [parentFilter, setParentFilter] = useState('');
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isAuthorDropdownOpen, setIsAuthorDropdownOpen] = useState(false);
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const authorDropdownRef = useRef<HTMLDivElement>(null);

  // Handle outside click for dropdowns
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDateDropdownOpen(false);
      }
      if (
        authorDropdownRef.current &&
        !authorDropdownRef.current.contains(event.target as Node)
      ) {
        setIsAuthorDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMessageFilter(value);
    onMessageFilterChange(value);
  };

  // Date range picker logic
  const handleDateRangeChange = (start: string, end: string) => {
    setDateRange({ start, end });
    setIsDateDropdownOpen(false);
    onDateFilterChange(`${start}~${end}`);
  };

  // Author dropdown logic
  const handleAuthorSelect = (author: { name?: string; email?: string }) => {
    setAuthorFilter(author.email || author.name || '');
    setIsAuthorDropdownOpen(false);
    onAuthorFilterChange(author.email || author.name || '');
  };

  // Helper for avatar initials
  const getInitials = (name?: string) => {
    if (!name) return '?';
    return name.split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date range label
  const dateLabel = dateRange
    ? `${dateRange.start} - ${dateRange.end}`
    : 'Dates';

  // Find selected author for label
  const selectedAuthor = authors.find(a => a.email === authorFilter || a.name === authorFilter);
  const authorLabel = selectedAuthor
    ? (
      <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span className="author-avatar">{getInitials(selectedAuthor.name)}</span>
        {selectedAuthor.name}
      </span>
    )
    : 'Authors';

  const handleParentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setParentFilter(value);
    onParentFilterChange(value);
  };

  return (
    <div className="filters-container">
      <input
        type="text"
        placeholder="Message filter"
        value={messageFilter}
        onChange={handleMessageChange}
        className="filter"
        style={{ minWidth: 180 }}
      />
      {/* Dates Dropdown */}
      <div className="filter" style={{ position: 'relative', minWidth: 180 }} ref={dateDropdownRef}>
        <div
          className="dropdown-label"
          onClick={() => setIsDateDropdownOpen(open => !open)}
          style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {dateLabel}
          <span style={{ marginLeft: 8 }}>▼</span>
        </div>
        {isDateDropdownOpen && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, background: '#fff', border: '1px solid #eee', borderRadius: 6, padding: 16, minWidth: 240, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, color: '#666' }}>Start date</label>
              <input
                type="date"
                value={dateRange?.start || ''}
                onChange={e => handleDateRangeChange(e.target.value, dateRange?.end || e.target.value)}
                style={{ marginBottom: 8 }}
              />
              <label style={{ fontSize: 13, color: '#666' }}>End date</label>
              <input
                type="date"
                value={dateRange?.end || ''}
                min={dateRange?.start || ''}
                onChange={e => handleDateRangeChange(dateRange?.start || e.target.value, e.target.value)}
              />
              <button
                style={{ marginTop: 12, padding: '6px 12px', borderRadius: 4, border: 'none', background: '#eee', cursor: 'pointer' }}
                onClick={() => { setDateRange(null); onDateFilterChange(''); setIsDateDropdownOpen(false); }}
              >Clear</button>
            </div>
          </div>
        )}
      </div>
      {/* Authors Dropdown */}
      <div className="filter" style={{ position: 'relative', minWidth: 180 }} ref={authorDropdownRef}>
        <div
          className="dropdown-label"
          onClick={() => setIsAuthorDropdownOpen(open => !open)}
          style={{ cursor: 'pointer', userSelect: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        >
          {authorLabel}
          <span style={{ marginLeft: 8 }}>▼</span>
        </div>
        {isAuthorDropdownOpen && (
          <div className="dropdown-menu" style={{ position: 'absolute', top: '100%', left: 0, zIndex: 10, background: '#fff', border: '1px solid #eee', borderRadius: 6, minWidth: 240, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
            <div style={{ maxHeight: 220, overflowY: 'auto' }}>
              {authors.length === 0 && <div style={{ padding: 12, color: '#888' }}>No authors</div>}
              {authors.map((author, idx) => (
                <div
                  key={author.email || author.name || idx}
                  className="dropdown-item"
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', cursor: 'pointer', borderRadius: 4, background: (author.email === authorFilter || author.name === authorFilter) ? '#f5f8fa' : 'transparent' }}
                  onClick={() => handleAuthorSelect(author)}
                >
                  <span className="author-avatar">{getInitials(author.name)}</span>
                  <span>{author.name}</span>
                </div>
              ))}
              {authors.length > 0 && (
                <div
                  className="dropdown-item"
                  style={{ padding: '8px 12px', color: '#888', cursor: 'pointer' }}
                  onClick={() => { setAuthorFilter(''); onAuthorFilterChange(''); setIsAuthorDropdownOpen(false); }}
                >
                  Clear
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;