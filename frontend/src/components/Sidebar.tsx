import React from 'react';

interface SidebarProps {
  activeItem?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem = 'commits' }) => {
  // Function to determine if a navigation item is active
  const isActive = (item: string) => activeItem === item;

  return (
    <div className="bauplan-sidebar">
      <div className="sidebar-logo">
        <svg viewBox="0 0 36 37" height="34" width="34" fill="none">
          <rect width="30.391" height="30.358" x="0.847" y="0.638" stroke="#FF3950" strokeWidth="1.5" rx="7.25" transform="rotate(-8.023 36.146 3.11) skewX(-.045)"></rect>
          <ellipse cx="2.658" cy="2.655" fill="#FF3950" rx="2.658" ry="2.655" transform="rotate(-8.023 70.449 -38.051) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#00A3FF" rx="2.658" ry="2.655" transform="rotate(-8.023 66.487 -94.87) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#FFD600" rx="2.658" ry="2.655" transform="rotate(-8.023 62.525 -151.688) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#FF3950" rx="2.658" ry="2.655" transform="rotate(-8.023 127.267 -42.013) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#00A3FF" rx="2.658" ry="2.655" transform="rotate(-8.023 123.305 -98.831) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#FFD600" rx="2.658" ry="2.655" transform="rotate(-8.023 119.344 -155.65) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#FF3950" rx="2.658" ry="2.655" transform="rotate(-8.023 184.086 -45.975) skewX(-.045)"></ellipse>
          <ellipse cx="2.658" cy="2.655" fill="#00A3FF" rx="2.658" ry="2.655" transform="rotate(-8.023 180.124 -102.793) skewX(-.045)"></ellipse>
        </svg>
        <span className="sidebar-logo-text">Bauplan</span>
      </div>

      {/* Main Navigation */}
      <div className="sidebar-section">
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${isActive('dashboard') ? 'active' : ''}`}
            onClick={() => {}}
          >
            Dashboard
          </li>
        </ul>
      </div>

      {/* Data Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">DATA</div>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${isActive('catalog') ? 'active' : ''}`}
            onClick={() => {}}
          >
            Catalog
          </li>
          <li
            className={`sidebar-nav-item ${isActive('commits') ? 'active' : ''}`}
            onClick={() => {}}
          >
            Commits
          </li>
        </ul>
      </div>

      {/* Settings Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">SETTINGS</div>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${isActive('apikeys') ? 'active' : ''}`}
            onClick={() => {}}
          >
            API Keys
          </li>
        </ul>
      </div>

      {/* Help Section */}
      <div className="sidebar-section">
        <div className="sidebar-section-title">HELP</div>
        <ul className="sidebar-nav">
          <li
            className={`sidebar-nav-item ${isActive('getstarted') ? 'active' : ''}`}
            onClick={() => {}}
          >
            Get Started
          </li>
          <li
            className={`sidebar-nav-item ${isActive('apireference') ? 'active' : ''}`}
            onClick={() => {}}
          >
            API Reference
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;