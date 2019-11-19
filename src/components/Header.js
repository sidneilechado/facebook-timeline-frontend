import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/feed">
          <h1>Feed</h1>
        </Link>
        <Link to="/new">
          <h1>New</h1>
        </Link>
      </div>
    </header>
  );
}
