import {usersAPI} from "../DAL/users-api";
import {ResponseTypeAPI, ResultCodesEnum} from "../DAL/api";
import {getFollow, getUnfollow, usersAC} from "../redux/users-reduser";


// заменяем объект usersAPI с API-запросами на mock-заглушку
jest.mock('../DAL/users-api');
// типизируем usersAPIMock
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

// возвращяемый api-методом users.followUser результат - data - заменяем на dataMock
const dataMock: ResponseTypeAPI = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success
};

// возвращаемый api-методом users.followUser результат заменяем на dataMock
usersAPIMock.followUser.mockReturnValue(Promise.resolve(dataMock));
// возвращаемый api-методом users.unfollowUser результат заменяем на dataMock
usersAPIMock.unfollowUser.mockReturnValue(Promise.resolve(dataMock));

// заменяем dispatch из redux на mock-заглушку
const dispatchMock = jest.fn();
// заменяем getState из redux на mock-заглушку
const getStateMock = jest.fn();


describe('users-reducer-thunk', () => {
    // сброс
    beforeEach(() => {
        dispatchMock.mockClear();
        getStateMock.mockClear();
        usersAPIMock.followUser.mockClear();
        usersAPIMock.unfollowUser.mockClear();
    });

   it('getFollow - Success', async () => {
       const id = 1;
       // тестируемый thunk
       const thunk = getFollow(id);

       // запускаем thunk
       await thunk(dispatchMock, getStateMock, {});

       const action1 = usersAC.toggleFollowing(true)
       const action2 = usersAC.toggleFollowingProgress(true, id)
       const action3 = usersAC.setFollow(id)
       const action4 = usersAC.toggleFollowingProgress(false, id)
       const action5 = usersAC.toggleFollowing(false);

       // dispatchMock был вызван определенное количество раз
       expect(dispatchMock).toBeCalledTimes(5);
       // проверка того, что определенный action был вызван в определенном порядке
       expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
       expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
       expect(dispatchMock).toHaveBeenNthCalledWith(3, action3);
       expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
       expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
   });

    it('getUnfollow - Success', async () => {
        const id = 1;
        // тестируемый thunk
        const thunk = getUnfollow(id)

        // запускаем thunk
        await thunk(dispatchMock, getStateMock, {});

        const action1 = usersAC.toggleFollowing(true)
        const action2 = usersAC.toggleFollowingProgress(true, id)
        const action3 = usersAC.setUnfollow(id)
        const action4 = usersAC.toggleFollowingProgress(false, id)
        const action5 = usersAC.toggleFollowing(false);

        // dispatchMock был вызван определенное количество раз
        expect(dispatchMock).toBeCalledTimes(5);
        // проверка того, что определенный action был вызван в определенном порядке
        expect(dispatchMock).toHaveBeenNthCalledWith(1, action1);
        expect(dispatchMock).toHaveBeenNthCalledWith(2, action2);
        expect(dispatchMock).toHaveBeenNthCalledWith(3, action3);
        expect(dispatchMock).toHaveBeenNthCalledWith(4, action4);
        expect(dispatchMock).toHaveBeenNthCalledWith(5, action5);
    })

})

