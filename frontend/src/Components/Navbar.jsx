import React from 'react';
import { Link } from 'react-router-dom';
// import './Header.css';

const Navbar = () => {
  return (
    <header className="header">
      <div className="logo">
        <h1>MyApp</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
