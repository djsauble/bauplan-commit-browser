import React from 'react';

interface HeaderProps {
  username?: string;
}

const Header: React.FC<HeaderProps> = ({ username = 'User' }) => {
  // Get first letter of username for avatar
  const userInitial = username.charAt(0).toUpperCase();

  return (
    <div className="bauplan-header">
      <div className="bauplan-header-actions">
        <div className="bauplan-user">
          <div className="bauplan-user-avatar">
            {userInitial}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;