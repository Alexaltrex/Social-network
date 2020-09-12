import React from 'react';
import s from './Header.module.css';
import {NavLink} from "react-router-dom";
import {HeaderPropsType} from "./HeaderContainer";

const Header: React.FC<HeaderPropsType> = (props) => {
    const {isAuth, login, logout} = props
    return (
        <header className={s.header}>
            <img
                src="https://i.mycdn.me/image?id=886337513216&ts=0000000000000f0154&plc=WEB&tkn=*u1GpzXPcA82wxOfVLnRWdSlOcvM&fn=sqr_288_2x"
                alt=""
            />
            <div className={s.loginBlock}>
                {isAuth
                    ? <div>
                        {login} - <button onClick={logout}>
                        Log out
                    </button>
                    </div>
                    : <NavLink to={'/login'}>Login</NavLink>}
            </div>

        </header>
    );
};

export default Header;
