import React from 'react';
import s from './../Dialogs.module.css';
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    name: string
}

const Dialog:React.FC<PropsType> = (props) => {
    const {id, name} = props;
    let path = "/dialogs/" + id;
    return (
        <div className={s.dialog}>
            <NavLink activeClassName={s.activeLink} to={path}>{name}</NavLink>
        </div>
    );
}

export default Dialog;