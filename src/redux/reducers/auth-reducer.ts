import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../../DAL/api";
import {FormAction, stopSubmit} from 'redux-form';
import {authAPI} from "../../DAL/auth-api";
import {securityAPI} from "../../DAL/security-api";
import {BaseThunkType, GetActionsType} from "../redux-store";
import {appAC, AppActionsType} from "./app-reducer";
import {SidebarItemEnum} from "../../types/types";
import {sidebarAC, SidebarActionsType} from "./sidebar-reducer";



let initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false,
    captcha: null as null | string
};

export type initialStateType = typeof initialState;
type AuthActionsType = GetActionsType<typeof authAC>
type ThunkType = BaseThunkType<AuthActionsType | FormAction | AppActionsType | SidebarActionsType>

const authReducer = (state = initialState, action: AuthActionsType): initialStateType => {
    switch (action.type) {
        case 'AUTH/SET_AUTH_USER_DATA': {
            return {...state, ...action.data,}
        }
        case 'AUTH/SET_CAPTCHA':
            return {...state, captcha: action.captcha}
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
};

export const getAuthUserData = (): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await authAPI.auth();
        //если залогинены
        if (data.resultCode === ResultCodesEnum.Success) {
            let {id, login, email} = data.data;
            dispatch(authAC.setAuthUserData(id, email, login, true));
        }
        dispatch(appAC.toggleLoading(false));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false))
    }

};

export const login = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await authAPI.login(email, password, rememberMe, captcha);
        // если залогинены
        if (data.resultCode === ResultCodesEnum.Success) {
            dispatch(getAuthUserData());
            dispatch(sidebarAC.setCurrentSidebarItem(SidebarItemEnum.myProfile))
        } else { // неправильный логин и(или) пароль
            if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) { // необходима каптча
                dispatch(getCaptchaUrl());
            }
            let message = data.messages.length > 0 ? data.messages[0] : 'some error';
            dispatch(stopSubmit('login', {_error: message}));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        const data = await securityAPI.getCaptcha();
        dispatch(authAC.setCaptchaUrl(data.url));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export const logout = (): ThunkType => async (dispatch) => {
    try {
        dispatch(appAC.toggleLoading(true));
        let data = await authAPI.logout();
        // если вылогинись
        if (data.resultCode === 0) {
            dispatch(authAC.setAuthUserData(null, null, null, false));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(appAC.toggleLoading(false));
    }
};

export default authReducer;