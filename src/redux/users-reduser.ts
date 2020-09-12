import {updateObjectInArray} from "../utilities/objects-helpers";
import {photosType, userType} from "../types/types";
import {BaseThunkType, GetActionsType, StateType} from "./redux-store";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {usersAPI} from "../api/users-api";

let initialState = {
    users: [] as Array<userType>,
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isLoading: false,
    // массив пользователей, для которых послан запрос на подписку/отписку
    followingInProgress: [] as Array<number>
};

export type initialStateType = typeof initialState;

const usersReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
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
            // добавляем новых users
            return {...state, users: action.users}
        }
        case 'USERS/SET_CURRENT_PAGE': {
            return {...state, currentPage: action.currentPage};
        }
        case 'USERS/SET_TOTAL_USERS_COUNT': {
            return {...state, totalUsersCount: action.totalUsersCount};
        }
        case 'USERS/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        case 'USERS/TOGGLE_FOLLOWING_PROGRESS': {
            return {
                ...state,
                // если запрос на подписку-отписку полсан добавить в массив, иначе удалить из массива
                followingInProgress:
                    action.followingInProgress
                        ? [...state.followingInProgress, action.id]
                        : state.followingInProgress.filter(id => id !== action.id)
            }
        }
        default:
            return state;
    }
}



export const usersAC = {
    follow: (userId: number) => ({type: 'USERS/FOLLOW', userId} as const),
    unfollow: (userId: number) => ({type: 'USERS/UNFOLLOW', userId} as const),
    setUsers: (users: Array<userType>) => ({type: 'USERS/SET_USERS', users} as const),
    setCurrentPage: (currentPage: number) => ({type: 'USERS/SET_CURRENT_PAGE', currentPage} as const),
    setUsersTotalCount: (totalUsersCount: number) => ({type: 'USERS/SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'USERS/TOGGLE_LOADING', isLoading} as const),
    toggleFollowingProgress: (followingInProgress: boolean, id: number) => ({
        type: 'USERS/TOGGLE_FOLLOWING_PROGRESS',
        followingInProgress,
        id
    } as const)
};

type ActionsType = GetActionsType<typeof usersAC>
type GetStateType = () => StateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

// первый вариант типизации
export const getUsers = (currentPage: number, pageSize: number) => async (dispatch: DispatchType) => {
    dispatch(usersAC.toggleLoading(true));
    let data = await usersAPI.getUsers(currentPage, pageSize);
    dispatch(usersAC.setUsers(data.items));
    dispatch(usersAC.setUsersTotalCount(data.totalCount));
    dispatch(usersAC.toggleLoading(false));
};

type FollowUnfollwType = ActionsType;//followType | unfollowType

const _followUnfollowFlow = async (dispatch: DispatchType,
                                   id: number,
                                   apiMethod: any,
                                   actionCreator: (id: number) => FollowUnfollwType) => {
    dispatch(usersAC.toggleFollowingProgress(true, id));
    let data = await apiMethod(id)
    if (data.resultCode === 0) {
        dispatch(actionCreator(id))
    }
    dispatch(usersAC.toggleFollowingProgress(false, id));
};

// второй вариант типизации
//type ThunkType = ThunkAction<Promise<void>, RootState, unknown, ActionsType>

export const followThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.unfollowUser.bind(id), usersAC.unfollow);
};

export const unfollowThunkCreator = (id: number): ThunkType => async (dispatch) => {
    await _followUnfollowFlow(dispatch, id, usersAPI.followUser.bind(id), usersAC.follow);
};

export default usersReducer;