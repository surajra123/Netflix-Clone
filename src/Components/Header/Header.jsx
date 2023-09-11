import React from "react";
import logo from "../../logo.png";
import { Link } from "react-router-dom";
import { LuSearch } from "react-icons/lu";

const Header = () => {
  return (
    <nav className="header">
      <img src={logo} alt="logo" />

      <div>
        <Link to="/tvshows">TV Shows</Link>
        <Link to="/Movies">Movies</Link>
        <Link to="/New">Recently Added</Link>
        <Link to="/List">My List</Link>
      </div>
      <LuSearch />
    </nav>
  );
};

export default Header;
