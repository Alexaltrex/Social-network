import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api";
import {FormAction, stopSubmit, StopSubmitAction} from 'redux-form';
import {authAPI} from "../api/auth-api";
import {securityAPI} from "../api/security-api";
import {BaseThunkType, GetActionsType, StateType} from "./redux-store";
import {Dispatch} from "redux";

let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isLoading: false,
    isAuth: false,
    captcha: null as null | string // если null, каптчу не показывать, не нужна
};

export type initialStateType = typeof initialState;
type ActionsType = GetActionsType<typeof authAC>
type GetStateType = () => StateType
type DispatchType = Dispatch<ActionsType>
// Расширение типа для stopSubmit из redux-form
type ThunkType = BaseThunkType<ActionsType | FormAction>

const authReducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET_AUTH_USER_DATA': {
            return {...state, ...action.data,}
        }
        case 'AUTH/SET_CAPTCHA':
            return {...state, captcha: action.captcha}
        case 'AUTH/TOGGLE_LOADING': {
            return {...state, isLoading: action.isLoading}
        }
        default:
            return state;
    }
};

export const authAC = {
    setAuthUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
        type: 'AUTH/SET_AUTH_USER_DATA',
        data: {id, email, login, isAuth}
    } as const),
    setCaptchaUrl: (captcha: string) => ({type: 'AUTH/SET_CAPTCHA', captcha} as const),
    toggleLoading: (isLoading: boolean) => ({type: 'AUTH/TOGGLE_LOADING', isLoading} as const),
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    dispatch(authAC.toggleLoading(true));
    let data = await authAPI.auth();
    //если залогинены
    if (data.resultCode === ResultCodesEnum.Success) {
        let {id, login, email} = data.data;
        dispatch(authAC.setAuthUserData(id, login, email, true));
    }
    dispatch(authAC.toggleLoading(false));
};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    dispatch(authAC.toggleLoading(true));
    let data = await authAPI.login(email, password, rememberMe, captcha);
    // если залогинены
    if (data.resultCode === ResultCodesEnum.Success) {
        dispatch(getAuthUserData());
    } else { // неправильный логин и(или) пароль
        if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) { // необходима каптча
            dispatch(getCaptchaUrl());
        }
        let message = data.messages.length > 0 ? data.messages[0] : 'some error';
        dispatch(stopSubmit('login', {_error: message}));
    }
    dispatch(authAC.toggleLoading(false));
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    dispatch(authAC.toggleLoading(true));
    const data = await securityAPI.getCaptcha();
    dispatch(authAC.setCaptchaUrl(data.url));
    dispatch(authAC.toggleLoading(false));
};

export const logout = (): ThunkType => async (dispatch) => {
    dispatch(authAC.toggleLoading(true));
    let data = await authAPI.logout();
    // если вылогинись
    if (data.resultCode === 0) {
        dispatch(authAC.setAuthUserData(null, null, null, false));
    }
    dispatch(authAC.toggleLoading(false));
};

export default authReducer;