import React from 'react';
import s from './Navbar.module.css';
import Menu from "./Menu/Menu";

const Navbar:React.FC = () => {
    return (
        <nav className={s.nav}>
            <Menu/>
        </nav>
    );
}

export default Navbar;
