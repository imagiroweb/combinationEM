import React from 'react';
import logo from '../assets/logo-origami.png';

const Header = () => {
    return (
        <header className="header">
            <h1>Générateur de Combinaisons EuroMillions</h1>
            <img className="logo" src={logo} alt="logo" />
        </header>
    );
}

export default Header;