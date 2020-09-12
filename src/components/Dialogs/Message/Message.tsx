import React from 'react';
import s from './../Dialogs.module.css';

type PropsType = {
    text: string
}

const Message:React.FC<PropsType> = (props) => {
    const {text} = props;
    return (
        <div className={s.dialog}>{text}</div>
    )
}

export default Message;