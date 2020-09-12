import preloader from "../../../assets/img/oval.svg";
import React from "react";
import style from './Preloader.module.css'

let Preloader: React.FC = () => {
    return (
        <div className={style.preloader}>
            <img className={style.img} src={preloader} alt=""/>
        </div>
    )
};

export default Preloader;
