import {StateType} from "./redux-store";

export const getUsersSelector = (state: StateType) => state.usersPage.users;
export const getPageSize = (state: StateType) => state.usersPage.pageSize;
export const getCurrentPage = (state: StateType) => state.usersPage.currentPage;
export const getFollowingInProgress = (state: StateType) => state.usersPage.followingInProgress;
export const getTotalUsersCount = (state: StateType) => state.usersPage.totalUsersCount;
export const getIsLoading = (state: StateType) => state.usersPage.isLoading;
