import React, { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="layout">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">🏠 HomeFinder</h1>
          {user && (
            <div className="user-info">
              <span className="user-name">
                {user.firstName} {user.lastName}
              </span>
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {user && (
        <nav className="sidebar">
          <ul className="nav-menu">
            <li>
              <Link to="/dashboard" className="nav-link">
                📊 Dashboard
              </Link>
            </li>
            <li>
              <Link to="/prospects" className="nav-link">
                👥 Prospects
              </Link>
            </li>
            <li>
              <Link to="/properties" className="nav-link">
                🏠 Properties
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-link">
                👤 Profile
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <main className={`main-content ${user ? 'with-sidebar' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default Layout;