import React from "react";

function Header () {
    return (
       
        <header className="header">
            <div className="header_content">
                <div className="logo_container">
                    <div className="logo_img">
                        <img src="" alt=""></img>
                    </div>
                    <span className="logo_sub">KhulysoJohn</span>
                </div>

                <div className="header_main">
                    <ul className="main_links">
                        <li className="link_wrapper">
                            <a href="#" className="nav_link">home</a>
                        </li>
                    </ul>

                    <ul className="main_links">
                        <li className="link_wrapper">
                            <a href="#" className="nav_link">about</a>
                        </li>
                    </ul>

                    <ul className="main_links">
                        <li className="link_wrapper">
                            <a href="#" className="nav_link">projects</a>
                        </li>
                    </ul>

                    <ul className="main_links">
                        <li className="link_wrapper">
                            <a href="#" className="nav_link">contact</a>
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