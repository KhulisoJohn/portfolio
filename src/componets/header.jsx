import React from "react";
import logo from "../assets/avata.png"

function Header () {
    return (
       
        <header className="header">
            <div className="header_content">
                <div className="logo_container">
                    <div className="logo_img_cont">
                        <img src={logo} alt="logo_img" className="logo_img"></img>
                    </div>
                    <span className="logo_sub">KhulysoJohn</span>
                </div>

                <div className="header_main">
                    <ul className="main_links">
                        <li className="link_wrapper">
                            <a href="./home.jsx" className="nav_link">home</a>
                        </li>
                  
                        <li className="link_wrapper">
                            <a href="./about.jsx" className="nav_link">about</a>
                        </li>
                 
                         <li className="link_wrapper">
                            <a href="./project.jsx" className="nav_link">projects</a>
                        </li>
                   
                        <li className="link_wrapper">
                            <a href="./contact.jsx" className="nav_link">contact</a>
                        </li>
                    </ul>

                <div className="mobile_menu">

                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;