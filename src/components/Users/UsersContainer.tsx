import React from 'react'
import {connect} from "react-redux";
import {followThunkCreator, usersAC} from "../../redux/users-reduser";
import {unfollowThunkCreator} from "../../redux/users-reduser";
import {getUsers} from "../../redux/users-reduser";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getCurrentPage,
    getFollowingInProgress, getIsLoading,
    getPageSize,
    getTotalUsersCount,
    getUsersSelector
} from "../../redux/users-selectors";
import {userType} from "../../types/types";
import {StateType} from "../../redux/redux-store";
import UsersContainerAJAX from "./UsersContainerAJAX";

type MapStatePropsType = {
    followingInProgress: Array<number>
    totalUsersCount: number
    pageSize: number
    isLoading: boolean
    currentPage: number
    users: Array<userType>
}

type MapDispatchPropsType = {
    getUsers: (currentPage: number, pageSize: number) => void
    setCurrentPage: (currentPage: number) => void
    unfollowThunkCreator: (id: number) => void
    followThunkCreator: (id: number) => void
}

export type UsersOwnPropsType = {
    //pageTitle: string
}

export type UsersPropsType = MapStatePropsType & MapDispatchPropsType;


let mapStateToProps = (state: StateType): MapStatePropsType => {
    return {
        followingInProgress: getFollowingInProgress(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        users: getUsersSelector(state),
        currentPage: getCurrentPage(state),
        isLoading: getIsLoading(state)
    }
};

const setCurrentPage = usersAC.setCurrentPage

const UsersContainer = compose<React.ComponentType>(
    connect<MapStatePropsType, MapDispatchPropsType, UsersOwnPropsType, StateType>(mapStateToProps,
    {
        followThunkCreator, unfollowThunkCreator, getUsers, setCurrentPage
    }), withAuthRedirect)(UsersContainerAJAX);

export default UsersContainer;