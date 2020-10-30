import {FriendsValuesType, PhotosType, SearchFriendsParamsType, SearchUsersParamsType, UserType} from "../types/types";
import usersReducer, {usersAC} from "../redux/users-reduser";

const user1 = {
    id: 1,
    name: 'user1',
    status: 'string',
    photos: {
        small: null,
        large: null
    },
    followed: false
}

const user2 = {
    id: 2,
    name: 'user2',
    status: 'string2',
    photos: {
        small: null,
        large: null
    },
    followed: true
}

const initialState = {
    users: [user1, user2], // массив пользователей
    pageSize: 10, // количество пользователей на одной странице
    pageFriendsSize: 10, // количество друзей на одной странице
    totalUsersCount: 0, // общее число пользователей
    totalFriendsCount: 0, // общее число друзей
    currentPage: 1, // номер текущей страницы пользователей
    currentFriendsPage: 1, // номер текущей страницы друзей
    isLoading: false, // загрузка происходит?
    isFollowing: false, // отписка/подписка происходит?
    arrayOfUserIdWhichFollowingOrUnfollowing: [33, 44] as Array<number>, // массив пользователей, для которых послан запрос на подписку/отписку
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

describe('users-reducer', () => {

    it('USERS/SET_PORTION_NUMBER', () => {
        const portionNumber = 11;
        const action = usersAC.setPortionNumber(portionNumber);
        const newState = usersReducer(initialState, action);
        expect(newState.portionNumber).toEqual(portionNumber);
    });

    it('USERS/SET_VALUE_FROM_HEADER_SEARCH', () => {
        const valueFromHeaderSearch = 'valueFromHeaderSearch';
        const action = usersAC.setValueFromHeaderSearch(valueFromHeaderSearch);
        const newState = usersReducer(initialState, action);
        expect(newState.valueFromHeaderSearch).toEqual(valueFromHeaderSearch);
    });

    it('USERS/TOGGLE_IS_FRIENDS_SEARCHING', () => {
        const isFriendsSearching = true;
        const action = usersAC.toggleIsFriendsSearching(isFriendsSearching);
        const newState = usersReducer(initialState, action);
        expect(newState.isFriendsSearching).toEqual(isFriendsSearching);
    });

    it('USERS/SET_NEED_TO_CHANG_LIST_OF_FRIENDS', () => {
        const id = 11;
        const action = usersAC.setNeedToChangeListOfFriends(true, id);
        const newState = usersReducer(initialState, action);
        expect(newState.needToChangeListOfFriends).toEqual(true);
        expect(newState.friendIdToRemove).toBe(id);
    });

    it('USERS/SET_CURRENT_FRIENDS_SIDEBAR_ITEM', () => {
        const currentFriendsSidebarItem = 2;
        const action = usersAC.setCurrentFriendsSidebarItem(currentFriendsSidebarItem);
        const newState = usersReducer(initialState, action);
        expect(newState.currentFriendsSidebarItem).toEqual(currentFriendsSidebarItem);
    });

    it('USERS/SET_FRIENDS', () => {
        const friends = [user1, user2];
        const action = usersAC.setFriends(friends);
        const newState = usersReducer(initialState, action);
        expect(newState.friends).toEqual(friends);
    });

    it('USERS/SET_SHOW_USERS_FROM', () => {
        const showUsersFrom = 'search';
        const action = usersAC.setShowUsersFrom(showUsersFrom);
        const newState = usersReducer(initialState, action);
        expect(newState.showUsersFrom).toEqual(showUsersFrom);
    });

    it('USERS/SET_SEARCH_FRIENDS_PARAMS', () => {
        const searchFriendsParams = {term: 'term'};
        const action = usersAC.setSearchFriendsParams(searchFriendsParams);
        const newState = usersReducer(initialState, action);
        expect(newState.searchFriendsParams).toEqual(searchFriendsParams);
    });

    it('USERS/SET_SEARCH_USERS_PARAMS', () => {
        const searchUsersParams = {term: 'term', friend: 'false' as FriendsValuesType};
        const action = usersAC.setSearchUsersParams(searchUsersParams);
        const newState = usersReducer(initialState, action);
        expect(newState.searchUsersParams).toEqual(searchUsersParams);
    });

    it('USERS/FOLLOW', () => {
        const id = 1;
        const action = usersAC.setFollow(id);
        const newState = usersReducer(initialState, action);
        expect(newState.users![0].followed).toBe(true)
    });

    it('USERS/UNFOLLOW', () => {
        const id = 2;
        const action = usersAC.setUnfollow(id);
        const newState = usersReducer(initialState, action);
        expect(newState.users![1].followed).toBe(false)
    });

    it('USERS/SET_USERS', () => {
        const users = [user1, user2];
        const action = usersAC.setUsers(users);
        const newState = usersReducer(initialState, action);
        expect(newState.users).toBe(users)
    });

    it('USERS/SET_CURRENT_PAGE', () => {
        const currentPage = 11;
        const action = usersAC.setCurrentPage(currentPage);
        const newState = usersReducer(initialState, action);
        expect(newState.currentPage).toBe(currentPage)
    });

    it('USERS/SET_CURRENT_FRIENDS_PAGE', () => {
        const currentFriendsPage = 11;
        const action = usersAC.setCurrentFriendsPage(currentFriendsPage);
        const newState = usersReducer(initialState, action);
        expect(newState.currentFriendsPage).toBe(currentFriendsPage)
    });

    it('USERS/SET_TOTAL_USERS_COUNT', () => {
        const totalUsersCount = 11;
        const action = usersAC.setTotalUsersCount(totalUsersCount);
        const newState = usersReducer(initialState, action);
        expect(newState.totalUsersCount).toBe(totalUsersCount)
    });

    it('USERS/SET_TOTAL_FRIENDS_COUNT', () => {
        const totalFriendsCount = 11;
        const action = usersAC.setTotalFriendsCount(totalFriendsCount);
        const newState = usersReducer(initialState, action);
        expect(newState.totalFriendsCount).toBe(totalFriendsCount)
    });

    it('USERS/TOGGLE_LOADING', () => {
        const isLoading = true;
        const action = usersAC.toggleLoading(isLoading);
        const newState = usersReducer(initialState, action);
        expect(newState.isLoading).toBe(isLoading)
    });

    it('USERS/TOGGLE_FOLLOWING', () => {
        const isFollowing = true;
        const action = usersAC.toggleFollowing(isFollowing);
        const newState = usersReducer(initialState, action);
        expect(newState.isLoading).toBe(isFollowing)
    });

    it('USERS/TOGGLE_FOLLOWING_PROGRESS - add', () => {
        const action = usersAC.toggleFollowingProgress(true, 55);
        const newState = usersReducer(initialState, action);
        expect(newState.arrayOfUserIdWhichFollowingOrUnfollowing).toContain(55)
    });

    it('USERS/TOGGLE_FOLLOWING_PROGRESS - remove', () => {
        const action = usersAC.toggleFollowingProgress(false, 44);
        const newState = usersReducer(initialState, action);
        expect(newState.arrayOfUserIdWhichFollowingOrUnfollowing).not.toContain(44)
    });

})

