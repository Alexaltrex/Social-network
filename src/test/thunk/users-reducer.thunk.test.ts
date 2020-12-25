import {usersAPI} from "../../DAL/users-api";
import {GetItemsType, ResponseTypeAPI, ResultCodesEnum} from "../../DAL/api";
import {getFollow, getUnfollow, getUsers, removeAndUpdateFriends, searchUsers, usersAC} from "../../redux/reducers/users-reduser";
import {appAC} from "../../redux/reducers/app-reducer";
import {FriendsValuesType, PhotosType, UserType} from "../../types/types";

const action6 = appAC.setLanError(true);

// заменяем объект usersAPI с API-запросами на mock-заглушку
jest.mock('../DAL/users-api');
// типизируем usersAPIMock
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

// заменяем dispatch из redux на mock-заглушку
const dispatchMock = jest.fn();
// заменяем getState из redux на mock-заглушку
const getStateMock = jest.fn();

describe('users-reducer-thunk', () => {
    beforeEach(() => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        usersAPIMock.followUser.mockClear();
        usersAPIMock.unfollowUser.mockClear();
        usersAPIMock.getUsers.mockClear();
    });

    describe('getFollow', () => {
        const id = 1;
        const action1 = usersAC.toggleFollowing(true);
        const action2 = usersAC.toggleFollowingProgress(true, id);
        const action3 = usersAC.setFollow(id);
        const action4 = usersAC.toggleFollowingProgress(false, id);
        const action5 = usersAC.toggleFollowing(false);

        // тестируемый thunk
        const thunk = getFollow(id);

        it('getFollow - api-метод - resolve c ResultCodesEnum.Success', async () => {
            // возвращяемый api-методом usersAPI.followUser результат - data - заменяем на dataMock
            const dataMock: ResponseTypeAPI = {
                data: {},
                messages: [],
                resultCode: ResultCodesEnum.Success
            };
            // возвращаемый api-методом usersAPI.followUser результат заменяем на dataMock
            usersAPIMock.followUser.mockReturnValue(Promise.resolve(dataMock));
            // запускаем thunk
            await thunk(dispatchMock, getStateMock, {});

            // dispatchMock был вызван определенное количество раз
            expect(dispatchMock).toBeCalledTimes(5);
            // проверка того, что определенный action был вызван в определенном порядке
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action3);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
        });

        it('getFollow - api-метод resolve c ResultCodesEnum.Error', async () => {
            const dataMock: ResponseTypeAPI = {
                data: {},
                messages: [],
                resultCode: ResultCodesEnum.Error
            };
            usersAPIMock.followUser.mockReturnValue(Promise.resolve(dataMock));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(4);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action5);
        });

        it('getFollow - api-метод reject', async () => {
            const error = new Error;
            usersAPIMock.followUser.mockReturnValue(Promise.reject(error));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(5);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action6);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
        });

    });

    describe('getUnfollow', () => {
        const id = 1;
        const action1 = usersAC.toggleFollowing(true);
        const action2 = usersAC.toggleFollowingProgress(true, id);
        const action3 = usersAC.setUnfollow(id);
        const action4 = usersAC.toggleFollowingProgress(false, id);
        const action5 = usersAC.toggleFollowing(false);
        const thunk = getUnfollow(id);

        it('getUnfollow - api-метод - resolve c ResultCodesEnum.Success', async () => {
            const dataMock: ResponseTypeAPI = {
                data: {},
                messages: [],
                resultCode: ResultCodesEnum.Success
            };
            usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(dataMock));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(5);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action3);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
        })

        it('getUnfollow - api-метод resolve c ResultCodesEnum.Error', async () => {
            const dataMock: ResponseTypeAPI = {
                data: {},
                messages: [],
                resultCode: ResultCodesEnum.Error
            };
            usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(dataMock));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(4);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action5);
        });

        it('getUnfollow - api-метод reject', async () => {
            const error = new Error;
            usersAPIMock.unfollowUser.mockReturnValue(Promise.reject(error));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(5);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action6);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
            expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
        });


    });

    describe('getUsers', () => {
        const currentPage = 1;
        const pageSize = 10;
        const action1 = appAC.toggleLoading(true);
        const action2 = appAC.toggleLoading(false);
        const thunk = getUsers(currentPage, pageSize);

        it('getUsers - Success', async () => {
            const user1: UserType = {
                id: 1,
                name: 'string',
                status: 'string',
                photos: {small: null, large: null},
                followed: false
            };
            const response: GetItemsType = {
                items: [user1],
                totalCount: 1,
                error: null
            };
            const action7 = usersAC.setUsers(response.items);
            const action8 = usersAC.setTotalUsersCount(response.totalCount)
            usersAPIMock.getUsers.mockReturnValue(Promise.resolve(response));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toBeCalledTimes(4);
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action7);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action8);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action2);

        });

        it('getUsers - lan error', async () => {
            const error = new Error;
            usersAPIMock.getUsers.mockReturnValue(Promise.reject(error));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action6);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action2);

        })

    });

    describe('searchUsers', () => {
        const currentPage = 1;
        const pageSize = 10;
        const term = 'term';
        const friend = 'true';
        const thunk = searchUsers(currentPage, pageSize, term, friend);
        const action1 = appAC.toggleLoading(true);
        const action2 = appAC.toggleLoading(false);

        it('searchUsers - Success', async () => {
            const user1: UserType = {
                id: 1,
                name: 'string',
                status: 'string',
                photos: {small: null, large: null},
                followed: false
            };
            const data: GetItemsType = {
                items: [user1],
                totalCount: 1,
                error: null
            };
            const action9 = usersAC.setUsers(data.items);
            const action10 = usersAC.setTotalUsersCount(data.totalCount);
            usersAPIMock.searchUsers.mockReturnValue(Promise.resolve(data));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action9);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action10);
            expect(dispatchMock).toHaveBeenNthCalledWith(4, action2);
        });

        it('searchUsers - lan error', async () => {
            const error = new Error;
            usersAPIMock.searchUsers.mockReturnValue(Promise.reject(error));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
            expect(dispatchMock).toHaveBeenNthCalledWith(2, action6);
            expect(dispatchMock).toHaveBeenNthCalledWith(3, action2);
        })

    });

    describe('removeAndUpdateFriends', () => {
        const currentPage = 1;
        const pageSize = 1;
        const id = 1;
        const thunk = removeAndUpdateFriends(currentPage, pageSize, id);
        const action1 = usersAC.toggleFollowing(true);
        const action2 = usersAC.toggleFollowingProgress(true, id);
        const action3 = usersAC.toggleFollowing(true);
        const action4 = usersAC.toggleFollowingProgress(false, id);

        it('removeAndUpdateFriends - api-метод - resolve c ResultCodesEnum.Success', async () => {
            const dataFromUnfollow: ResponseTypeAPI = {
                data: {},
                messages: [],
                resultCode: ResultCodesEnum.Success
            };


            usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(dataFromUnfollow));
            await thunk(dispatchMock, getStateMock, {});
            expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);

        })



    })

})

