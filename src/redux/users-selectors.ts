import {StateType} from "./redux-store";

export const getUsersSelector = (state: StateType) => state.users.users;
export const getFriendsSelector = (state: StateType) => state.users.friends;
export const getPageSize = (state: StateType) => state.users.pageSize;
export const getCurrentPage = (state: StateType) => state.users.currentPage;
export const getCurrentFriendsPage = (state: StateType) => state.users.currentFriendsPage;
export const getFollowingInProgress = (state: StateType) => state.users.followingInProgress;
export const getTotalUsersCount = (state: StateType) => state.users.totalUsersCount;
export const getTotalFriendsCount = (state: StateType) => state.users.totalFriendsCount;
export const getIsLoading = (state: StateType) => state.users.isLoading;
export const getIsFollowing = (state: StateType) => state.users.isFollowing;
export const getSearchUsersParams = (state: StateType) => state.users.searchUsersParams;
export const getSearchFriendsParams = (state: StateType) => state.users.searchFriendsParams;
export const getShowUsersFrom = (state: StateType) => state.users.showUsersFrom;
export const getCurrentFriendsSidebarItem = (state: StateType) => state.users.currentFriendsSidebarItem;
export const getNeedToChangeListOfFriends = (state: StateType) => state.users.needToChangeListOfFriends;
export const getFriendIdToRemove = (state: StateType) => state.users.friendIdToRemove;
export const getIsFriendsSearching = (state: StateType) => state.users.isFriendsSearching;



