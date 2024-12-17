import React, { useState } from "react";
import logo from "../assets/avata.png";
import { FaBars, FaTimes } from "react-icons/fa";
import classNames from "classnames";

const Header = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className="header">
      {/* Logo Container */}
      <div className="logo_container">
        <div className="img_cont">
          <img src={logo} alt="logo-img" className="logo_img" />
        </div>
        <span className="logo_sub">KhulysoJohn</span>
      </div>

      {/* Desktop Menu */}
      <ul className="desktop_menu">
        <li>
          <a href="#home" className="nav_link">Home</a>
        </li>
        <li>
          <a href="#about" className="nav_link">About</a>
        </li>
        <li>
          <a href="#project" className="nav_link">Project</a>
        </li>
        <li>
          <a href="#contact" className="nav_link">Contact</a>
        </li>
      </ul>

      {/* Hamburger Icon */}
      <div onClick={handleClick} className="hamburger">
        {nav ? <FaTimes size={30} /> : <FaBars size={30} />}
      </div>

      {/* Mobile Menu */}
      <ul className={classNames("mobile_menu", { hidden: !nav })}>
        <li className="mobile_nav_link">
          <a href="#home">Home</a>
        </li>
        <li className="mobile_nav_link">
          <a href="#about">About</a>
        </li>
        <li className="mobile_nav_link">
          <a href="#project">Project</a>
        </li>
        <li className="mobile_nav_link">
          <a href="#contact">Contact</a>
        </li>
      </ul>
    </div>
  );
};

export default Header;