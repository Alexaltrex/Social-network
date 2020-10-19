import {updateObjectInArray} from "../utilities/objects-helpers";
import {
    FriendsValuesType, SearchFriendsParamsType,
    SearchUsersParamsType,
    UserType
} from "../types/types";
import {BaseThunkType, GetActionsType} from "./redux-store";
import {Dispatch} from "redux";
import {usersAPI} from "../DAL/users-api";
import {appAC, AppActionsType} from "./app-reducer";

let initialState = {
    users: null as null | Array<UserType>, // массив пользователей
    pageSize: 10, // количество пользователей на одной странице
    pageFriendsSize: 10, // количество друзей на одной странице
    totalUsersCount: 0, // общее число пользователей
    totalFriendsCount: 0, // общее число друзей
    currentPage: 1, // номер текущей страницы пользователей
    currentFriendsPage: 1, // номер текущей страницы друзей
    isLoading: false, // загрузка происходит?
    isFollowing: false, // отписка/подписка происходит?
    followingInProgress: [] as Array<number>, // массив пользователей, для которых послан запрос на подписку/отписку
    friends: null as null | Array<UserType>, // массив друзей
    searchUsersParams: {term: '', friend: 'all'} as SearchUsersParamsType, // параметры поиска пользователей
    searchFriendsParams: {term: ''} as SearchFriendsParamsType, // параметры поиска друзей
    isFriendsSearching: false, // поиск друзей происходит?
    showUsersFrom: 'all' as 'all' | 'search', // откуда показывать пользователей - всех или из поиска
    currentFriendsSidebarItem: 0, // номер элемента бокового меню
    needToChangeListOfFriends: false, // список друзей нужно изменить (используется для обновления после удаления)?
    friendIdToRemove: null as null | number, // id друга, которого удаляем
    valueFromHeaderSearch: null as null | string, // страка поиска пользователя из header
    portionNumber: 1 // текущий номер порции страниц пользователей (начинается с 1)
};

const usersReducer = (state = initialState, action: UsersActionsType): initialStateType => {
    switch (action.type) {
        case 'USERS/SET_PORTION_NUMBER': {
            return {...state, portionNumber: action.portionNumber}
        }
        case 'USERS/SET_VALUE_FROM_HEADER_SEARCH': {
            return {...state, valueFromHeaderSearch: action.valueFromHeaderSearch}
        }
        case 'USERS/TOGGLE_IS_FRIENDS_SEARCHING': {
            return {...state, isFriendsSearching: action.isFriendsSearching}
        }
        case 'USERS/SET_NEED_TO_CHANG_LIST_OF_FRIENDS': {
            return {...state,
                needToChangeListOfFriends: action.needToChangeListOfFriends,
                friendIdToRemove: action.friendIdToRemove
            }
        }
        case 'USERS/SET_CURRENT_FRIENDS_SIDEBAR_ITEM': {
            return {...state, currentFriendsSidebarItem: action.currentFriendsSidebarItem}
        }
        case 'USERS/SET_FRIENDS': {
            return {...state, friends: action.friends}
        }
        case 'USERS/SET_SHOW_USERS_FROM': {
            return {...state, showUsersFrom: action.showUsersFrom}
        }
        case 'USERS/SET_SEARCH_FRIENDS_PARAMS': {
            return {...state, searchFriendsParams: action.searchFriendsParams}
        }
        case 'USERS/SET_SEARCH_USERS_PARAMS': {
            return {...state, searchUsersParams: action.searchUsersParams}
        }
        case 'USERS/FOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: true})
            }
        }
        case 'USERS/UNFOLLOW': {
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, 'id', {followed: false})
            }
        }
        case 'USERS/SET_USERS': {
            return {...state, users: action.users}
        }
        case 'USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage};
        }
        case 'USERS/SET_CURRENT_FRIENDS_PAGE': {
            return {...state, currentFriendsPage: action.currentFriendsPage};
        }
        case 'USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount};
        }
        case 'USERS/SET_TOTAL_FRIENDS_COUNT': {
            return {...state, totalFriendsCount: action.totalFriendsCount};
        }
        case 'USERS/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'USERS/TOGGLE_FOLLOWING': {
            return {...state, isFollowing: action.isFollowing}
        }
        case 'USERS/TOGGLE_FOLLOWING_PROGRESS': {
            return {
                ...state,
                // если запрос на подписку-отписку послан - добавить в массив, иначе удалить из массива
                followingInProgress:
                    action.followingInProgress
                        ? [...state.followingInProgress, action.id]
                        : state.followingInProgress.filter(id => id !== action.id)
            }
        }
        default:
            return state;
    }
};

export const usersAC = {
    setPortionNumber: (portionNumber: number) => ({type: 'USERS/SET_PORTION_NUMBER', portionNumber} as const),
    setValueFromHeaderSearch: (valueFromHeaderSearch: string | null) => ({type: 'USERS/SET_VALUE_FROM_HEADER_SEARCH', valueFromHeaderSearch} as const),
    toggleIsFriendsSearching: (isFriendsSearching: boolean) => ({type: 'USERS/TOGGLE_IS_FRIENDS_SEARCHING', isFriendsSearching} as const),
    setNeedToChangeListOfFriends: (needToChangeListOfFriends: boolean, friendIdToRemove: number | null) => ({
        type: 'USERS/SET_NEED_TO_CHANG_LIST_OF_FRIENDS',
        needToChangeListOfFriends,
        friendIdToRemove
    } as const),
    setCurrentFriendsSidebarItem: (currentFriendsSidebarItem: number) => ({
        type: 'USERS/SET_CURRENT_FRIENDS_SIDEBAR_ITEM',
        currentFriendsSidebarItem
    } as const),
    setFriends: (friends: Array<UserType>) => ({type: 'USERS/SET_FRIENDS', friends} as const),
    setSearchFriendsParams: (searchFriendsParams: SearchFriendsParamsType) => ({
        type: 'USERS/SET_SEARCH_FRIENDS_PARAMS',
        searchFriendsParams
    } as const),
    setSearchUsersParams: (searchUsersParams: SearchUsersParamsType) => ({
        type: 'USERS/SET_SEARCH_USERS_PARAMS',
        searchUsersParams
    } as const),
    setFollow: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    setUnfollow: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setCurrentFriendsPage: (currentFriendsPage: number) => ({type: 'USERS/SET_CURRENT_FRIENDS_PAGE', currentFriendsPage} as const),
    setTotalUsersCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setTotalFriendsCount: (totalFriendsCount: number) => ({
        type: 'USERS/SET_TOTAL_FRIENDS_COUNT',
        totalFriendsCount
    } as const),
    toggleLoading: (isLoading: boolean) => ({type: 'USERS/TOGGLE_LOADING', isLoading} as const),
    toggleFollowing: (isFollowing: boolean) => ({type: 'USERS/TOGGLE_FOLLOWING', isFollowing} as const),
    toggleFollowingProgress: (followingInProgress: boolean, id: number) => ({
        type: 'USERS/TOGGLE_FOLLOWING_PROGRESS',
        followingInProgress,
        id
    } as const),
    setShowUsersFrom: (showUsersFrom: 'all' | 'search') => ({type: 'USERS/SET_SHOW_USERS_FROM', showUsersFrom} as const),
    };

export const getUsers = (currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await usersAPI.getUsers(currentPage, pageSize);
        dispatch(usersAC.setUsers(data.items));
        dispatch(usersAC.setTotalUsersCount(data.totalCount));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const searchUsers = (currentPage: number, pageSize: number, term: string, friend: FriendsValuesType): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await usersAPI.searchUsers(currentPage, pageSize, term, friend);
        console.log('searchUsers')
        dispatch(usersAC.setUsers(data.items));
        dispatch(usersAC.setTotalUsersCount(data.totalCount));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const searchFriends = (currentPage: number, pageSize: number, term: string): ThunkType => async (dispatch) => {
    try {
        dispatch(usersAC.toggleIsFriendsSearching(true));
        let data = await usersAPI.searchUsers(currentPage, pageSize, term, 'true');
        dispatch(usersAC.setFriends(data.items));
        dispatch(usersAC.setTotalFriendsCount(data.totalCount));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(usersAC.toggleIsFriendsSearching(false));
    }
};

export const removeAndUpdateFriends = (currentPage: number, pageSize: number, id: number): ThunkType => async (dispatch) => {
    try {
        dispatch(usersAC.toggleFollowing(true));
        dispatch(usersAC.toggleFollowingProgress(true, id));
        let dataFromUnfollow = await usersAPI.unfollowUser(id);
        if (dataFromUnfollow.resultCode === 0) {
            let data = await usersAPI.searchUsers(currentPage, pageSize, '', 'true');
            dispatch(usersAC.setFriends(data.items));
            dispatch(usersAC.setTotalFriendsCount(data.totalCount));
            dispatch(usersAC.setNeedToChangeListOfFriends(false, null));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(usersAC.toggleFollowing(true));
        dispatch(usersAC.toggleFollowingProgress(false, id));
    }
};

type FollowUnfollwType = UsersActionsType;//followType | unfollowType

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   id: number,
                                   apiMethod: any,
                                   actionCreator: (id: number) => FollowUnfollwType) => {
    dispatch(usersAC.toggleFollowing(true));
    dispatch(usersAC.toggleFollowingProgress(true, id));
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(usersAC.toggleFollowingProgress(false, id));
};

export const getFollow = (id: number): ThunkType => async (dispatch) => {
    try {
        await _followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(id), usersAC.setFollow);
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(usersAC.toggleFollowing(false));
    }

};

export const getUnfollow = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.unfollowUser.bind(id), usersAC.setUnfollow);
};

export default usersReducer;

//============================ TYPES ==============================================
export type initialStateType = typeof initialState;
type UsersActionsType = GetActionsType<typeof usersAC>
type DispatchType = Dispatch<UsersActionsType>
type ThunkType = BaseThunkType<UsersActionsType | AppActionsType>