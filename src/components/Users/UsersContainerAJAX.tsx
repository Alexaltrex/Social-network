import React from "react";
import Users from "./Users";
import {UsersOwnPropsType, UsersPropsType} from "./UsersContainer";


class UsersContainerAJAX extends React.Component<UsersPropsType & UsersOwnPropsType> {
    componentDidMount() {
        const {getUsers, currentPage, pageSize} = this.props;
        getUsers(currentPage, pageSize);
    }

    onPageChanged = (pageNumber: number) => {
        const {setCurrentPage, pageSize, getUsers} = this.props;
        getUsers(pageNumber, pageSize);
        setCurrentPage(pageNumber);
    };

    render() {
        const {
            isLoading, followingInProgress, totalUsersCount, pageSize,
            users, followThunkCreator, unfollowThunkCreator, currentPage,
            //pageTitle
        } = this.props;
        return <>
            {/*<h2>{pageTitle}</h2>*/}

            <Users followingInProgress={followingInProgress}
                   totalUsersCount={totalUsersCount}
                   pageSize={pageSize}
                   onPageChanged={this.onPageChanged}
                   users={users}
                   isLoading={isLoading}
                   followThunkCreator={followThunkCreator}
                   unfollowThunkCreator={unfollowThunkCreator}
                   currentPage={currentPage}/>
        </>
    }
};

export default UsersContainerAJAX;