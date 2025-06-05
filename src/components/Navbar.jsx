// src/components/Navbar.jsx
import React from "react";
import "./Navbar.css";

const Navbar = () => {
    return (
        <header className="navbar">
            <div className="navbar__logo">
                <a href="#home">CarService</a>
            </div>
            <nav>
                <ul className="navbar__links">
                    <li><a href="#services">Услуги</a></li>
                    <li><a href="#masters">Мастера</a></li>
                    <li><a href="#prices">Цены</a></li>
                    <li><a href="#reviews">Отзывы</a></li>
                    <li><a href="#map">Карта</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;
