import {FormAction, stopSubmit} from 'redux-form';
import {photosType, PostType, ProfileType} from "../types/types";
import {profileAPI} from "../api/profile-api";
import {BaseThunkType, GetActionsType, StateType} from "./redux-store";
import {Dispatch} from "redux";

let initialState = {
    posts: [
        {id: 1, message: 'Первое сообщение', likeCount: 1},
        {id: 2, message: 'Второе сообщение', likeCount: 2},
        {id: 3, message: 'Третье сообщение', likeCount: 3},
        {id: 4, message: 'Четвертое сообщение', likeCount: 5}
    ] as Array<PostType>,
    profile: null as ProfileType | null,
    status: '',
    isLoading: false
};

export type initialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'profile/ADD_POST': {
            let id = state.posts ? state.posts[state.posts.length - 1].id + 1 : 1;
            return {
                ...state,
                posts: [...state.posts, {
                    id: id,
                    message: action.post,
                    likeCount: 0
                }]

            };
        }
        case 'profile/DELETE_POST': {
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        }
        case 'profile/SET_USER_PROFILE': {
            return {
                ...state,
                profile: action.profile
            }
        }
        case 'profile/SET_STATUS': {
            return {
                ...state,
                status: action.status
            }
        }
        case 'profile/SET_PHOTOS': {
            return ({
                ...state,
                profile: {...state.profile, photos: action.photos} as any //profileType
            })
        }
        case 'profile/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state;
    }
};


export const profileAC = {
    toggleLoading: (isLoading: boolean) => ({type: 'profile/TOGGLE_LOADING', isLoading} as const),
    addPost: (post: string) => ({type: 'profile/ADD_POST', post} as const),
    deletePost: (id: number) => ({type: 'profile/DELETE_POST', id} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
    setPhotos: (photos: File) => ({type: 'profile/SET_PHOTOS', photos} as const)
};

type ActionsType = GetActionsType<typeof profileAC>
type GetStateType = () => StateType
type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType | FormAction>

export const getProfile = (id: number): ThunkType => async (dispatch) => {
    dispatch(profileAC.toggleLoading(true));
    let data = await profileAPI.getProfile(id);
    dispatch(profileAC.setUserProfile(data));
    dispatch(profileAC.toggleLoading(false));
};

export const getStatus = (id: number): ThunkType => async (dispatch) => {
    dispatch(profileAC.toggleLoading(true));
    const data = await profileAPI.getStatus(id);
    dispatch(profileAC.setStatus(data));
    dispatch(profileAC.toggleLoading(false));
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        dispatch(profileAC.toggleLoading(true));
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(profileAC.setStatus(status));
            dispatch(profileAC.toggleLoading(false));
        }
    } catch (e) {

    }
};

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    const data = await profileAPI.savePhoto(photo);
    if (data.resultCode === 0) {
        dispatch(profileAC.setPhotos(data.photos));
    }
};

export const saveProfile = (values: ProfileType): ThunkType => async (dispatch, getState) => {
    const data = await profileAPI.saveProfile(values)
    const id = getState().auth.id
    if (data.resultCode === 0) {
        if (id !== null) {
            dispatch(getProfile(id));
        } else {
            throw new Error('userId can not be null')
        }

    } else { // ошибка
        //data.messages[0]
        let errorFields = {} as any;
        for (let message of data.messages) {
            let key = message.slice(30, message.length - 1).toLowerCase();
            errorFields[key] = 'Invalid url format';
        }
        //dispatch(stopSubmit('profileAboutMeForm', {_error: 'error'}));
        dispatch(stopSubmit('profileAboutMeForm', {'contacts': errorFields}));
        return Promise.reject(data.messages[0]);
    }
};

export default profileReducer;