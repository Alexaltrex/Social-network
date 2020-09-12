import React from 'react';
import style from './Users.module.css';
import User from "./User/User";
import Paginator from "../common/Paginator/Paginator";
import {UsersPropsType} from "./UsersContainer";
import Preloader from "../common/Preloader/Preloader";
import {userType} from "../../types/types";


type PropsType = {
    users: Array<userType>
    followThunkCreator: (id: number) => void
    unfollowThunkCreator: (id: number) => void
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    isLoading: boolean
}

let Users: React.FC<PropsType> = (props) => {

    const {
        users, followingInProgress, unfollowThunkCreator, followThunkCreator,
        totalUsersCount, pageSize, currentPage, onPageChanged, isLoading
    } = props;

    let usersElements = users.map(user => <User
        key={user.id}
        id={user.id}
        src={user.photos.small}
        followingInProgress={followingInProgress}
        unfollowThunkCreator={unfollowThunkCreator}
        followThunkCreator={followThunkCreator}
        name={user.name}
        status={user.status}
        followed={user.followed}
    />);


    return (

        <div className={style.users}>
            {isLoading ? <Preloader/> : null}
            <Paginator totalItemsCount={totalUsersCount}
                       pageSize={pageSize}
                       currentPage={currentPage}
                       onPageChanged={onPageChanged}
            />
            {usersElements}
        </div>
    )
};

export default Users;