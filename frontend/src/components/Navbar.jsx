import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
          <Link to="/">notes app</Link>
        </div>
        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/profile">Profile</Link>
          <button>Logout</button>

          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>  
      </div>
    </nav>
  );
};

export default Navbar;
