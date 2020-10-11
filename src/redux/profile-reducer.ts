import {FormAction, stopSubmit} from 'redux-form';
import {PhotosType, PostType, ProfileSidebarItemEnum, ProfileType} from "../types/types";
import {profileAPI} from "../DAL/profile-api";
import {BaseThunkType, GetActionsType, StateType} from "./redux-store";
import {appAC, AppActionsType} from "./app-reducer";
import {DATE} from "../utilities/date";

let initialState = {
    posts: [
        {id: 1, message: 'Hello, world', likeCount: 4, likeMe: false, time: '25 September in 10:10'},
    ] as Array<PostType>, // массив постов
    profile: null as null | ProfileType, // прифиль инициализированного пользователя
    currentUserProfile: null as null | ProfileType, // профиль текущего просматриваемого пользователя
    status: null as null | string, // статус
    avatarIsLoading: false, // аватар загружается?
    statusIsLoading: false, //  статус загружается?
    editMode: false, // вкл./выкл. режим редактирования статуса
    currentInfoFormSidebarItem: 0 as ProfileSidebarItemEnum, // текущий элемент бокового меню (все, удаленные, спам)
    followed: null as null | boolean, // пользователь - друг?
    editingPost: false // режим ввода нового поста (false - надпись, true - форма ввода)
};

export type initialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof profileAC>
type ThunkType = BaseThunkType<ActionsType | FormAction | AppActionsType>

const profileReducer = (state = initialState, action: ActionsType): initialStateType => {

    switch (action.type) {
        case 'profile/TOGGLE_LIKE_ME': {
            return {
                ...state,
                posts: state.posts.map(el => {
                    if (el.id === action.postId) {
                        return {...el, likeCount: el.likeMe ? el.likeCount - 1 : el.likeCount + 1, likeMe: !el.likeMe}
                    } else {
                        return el
                    }
                })
            }
        }
        case 'profile/SET_EDITING_POST': {
            return {...state, editingPost: action.editingPost}
        }
        case 'profile/SET_CURRENT_USER_PROFILE': {
            return {...state, currentUserProfile: action.currentUserProfile}
        }
        case 'profile/SET_FOLLOWED': {
            return {...state, followed: action.followed}
        }
        case 'profile/SET_CURRENT_INFO_FORM_SIDEBAR_ITEM': {
            return {...state, currentInfoFormSidebarItem: action.currentInfoFormSidebarItem}
        }
        case 'profile/SET_EDIT_MODE': {
            return {...state, editMode: action.editMode}
        }
        case 'profile/AVATAR_IS_LOADING': {
            return {...state, avatarIsLoading: action.avatarIsLoading}
        }
        case 'profile/STATUS_IS_LOADING': {
            return {...state, statusIsLoading: action.statusIsLoading}
        }
        case 'profile/ADD_POST': {
            let id = state.posts.length ? state.posts[state.posts.length - 1].id + 1 : 1;
            return {
                ...state,
                posts: [
                    ...state.posts,
                    {
                        id: id,
                        message: action.post,
                        likeMe: false,
                        likeCount: 0,
                        time: action.time
                    }
                ]
            };
        }
        case 'profile/DELETE_POST': {
            return {...state, posts: state.posts.filter(post => post.id !== action.id)}
        }
        case 'profile/SET_USER_PROFILE': {
            return {...state, profile: action.profile}
        }
        case 'profile/SET_STATUS': {
            return {...state, status: action.status}
        }
        case 'profile/SET_PHOTOS': {
            if (state.profile) {
                return {
                    ...state, profile: {...state.profile, photos: action.photos}
                }
            }
        }
        default:
            return state;
    }
};

export const profileAC = {
    toggleLikeMe: (postId: number) => ({type: 'profile/TOGGLE_LIKE_ME', postId} as const),
    setEditingPost: (editingPost: boolean) => ({type: 'profile/SET_EDITING_POST', editingPost} as const),
    setCurrentUserProfile: (currentUserProfile: ProfileType) => ({
        type: 'profile/SET_CURRENT_USER_PROFILE',
        currentUserProfile
    } as const),
    setFollowed: (followed: null | boolean) => ({type: 'profile/SET_FOLLOWED', followed} as const),
    setCurrentInfoFormSidebarItem: (currentInfoFormSidebarItem: number) => ({
        type: 'profile/SET_CURRENT_INFO_FORM_SIDEBAR_ITEM',
        currentInfoFormSidebarItem
    } as const),
    addPost: (post: string) => ({
        type: 'profile/ADD_POST',
        post,
        time: DATE.dateTranslateFromJS(DATE.getCurrentDate())
    } as const),
    deletePost: (id: number) => ({type: 'profile/DELETE_POST', id} as const),
    setUserProfile: (profile: ProfileType) => ({type: 'profile/SET_USER_PROFILE', profile} as const),
    setStatus: (status: string) => ({type: 'profile/SET_STATUS', status} as const),
    setPhotos: (photos: PhotosType) => ({type: 'profile/SET_PHOTOS', photos} as const),
    toggleAvatarLoading: (avatarIsLoading: boolean) => ({type: 'profile/AVATAR_IS_LOADING', avatarIsLoading} as const),
    toggleStatusLoading: (statusIsLoading: boolean) => ({type: 'profile/STATUS_IS_LOADING', statusIsLoading} as const),
    setEditMode: (editMode: boolean) => ({type: 'profile/SET_EDIT_MODE', editMode} as const),
};


export const getProfile = (id: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await profileAPI.getProfile(id);
        dispatch(profileAC.setUserProfile(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getCurrentUserProfile = (id: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await profileAPI.getProfile(id);
        dispatch(profileAC.setCurrentUserProfile(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

// определение явдяется ли другом пользователь
export const getFollowed = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await profileAPI.getFollowed(userId);
        dispatch(profileAC.setFollowed(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getStatus = (id: number): ThunkType => async (dispatch) => {
    try {
        dispatch(profileAC.toggleStatusLoading(true));
        const data = await profileAPI.getStatus(id);
        dispatch(profileAC.setStatus(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(profileAC.toggleStatusLoading(false));
    }
};

export const updateStatus = (status: string): ThunkType => async (dispatch) => {
    try {
        dispatch(profileAC.toggleStatusLoading(true));
        const data = await profileAPI.updateStatus(status);
        if (data.resultCode === 0) {
            dispatch(profileAC.setStatus(status));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(profileAC.toggleStatusLoading(false));
    }
};

export const savePhoto = (photo: File): ThunkType => async (dispatch) => {
    try {
        dispatch(profileAC.toggleAvatarLoading(true));
        const data = await profileAPI.savePhoto(photo);
        if (data.resultCode === 0) {
            dispatch(profileAC.setPhotos(data.data.photos));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(profileAC.toggleAvatarLoading(false));
    }
};

export const saveProfile = (values: ProfileType): ThunkType => async (dispatch, getState) => {
    try {
        dispatch(appAC.toggleLoading(true));
        const data = await profileAPI.saveProfile(values)
        //const id = getState().auth.id;
        const id = values.userId

        if (data.resultCode === 0) {
            dispatch(getProfile(id));
        } else {
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
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }

};

export default profileReducer;