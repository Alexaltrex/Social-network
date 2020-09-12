import React from 'react';
import style from './User.module.css';
import userPhoto from './../../../assets/img/user.png';
import {NavLink} from "react-router-dom";

type PropType = {
    id: number
    name: string
    status: string
    src: string | null
    followed: boolean
    followingInProgress: Array<number>
    unfollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
 }

const User: React.FC<PropType> = (props) => {
   const {id, name, status, followed, src, followingInProgress, followThunkCreator, unfollowThunkCreator} = props;
    return (
        <div>
            <div>
                <div>
                    <NavLink to={`/profile/${id}`}>
                        <img className={style.avatar} src={(src !== null) ? src : userPhoto}
                             alt=""/>
                    </NavLink>
                </div>
                <div>
                    {followed
                        ? <button disabled={followingInProgress.some(item => item === id)}
                                  onClick={() => {
                                      followThunkCreator(id)
                                  }
                                  }>UnFollow</button>
                        : <button disabled={followingInProgress.some(item => item === id)}
                                  onClick={() => {
                                      unfollowThunkCreator(id);
                                  }}>Follow</button>}
                </div>
            </div>
            <div>
                <div>
                    <div>{name}</div>
                    <div>{status}</div>
                </div>
            </div>
        </div>
    )
};

export default User;