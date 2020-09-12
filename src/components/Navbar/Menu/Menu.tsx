import React from 'react';
import s from './Menu.module.css';
import {NavLink} from "react-router-dom";

const Menu: React.FC = () => {
    return (
        <nav className={s.menu}>
            <div className={`${s.item} ${s.active}`}>
                <NavLink activeClassName={s.activeLink} to="/profile">Profile</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.activeLink} to="/dialogs">Dialogs</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.activeLink} to="/news">News</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.activeLink} to="/music">Music</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.activeLink} to="/users">Users</NavLink>
            </div>
            <div className={s.item}>
                <NavLink activeClassName={s.activeLink} to="/settings">Settings</NavLink>
            </div>

        </nav>
    );
}

export default Menu;
