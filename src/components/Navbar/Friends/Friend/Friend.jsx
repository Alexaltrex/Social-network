import React from 'react';
import s from './Friend.module.css';
import {NavLink} from "react-router-dom";

const Friend = (props) => {
    let path = "/friends/" + props.id;
    return (
        <div className={s.item}>
            <NavLink activeClassName={s.activeLink} to={path}>{props.name}</NavLink>
        </div>
    );
}

export default Friend;
