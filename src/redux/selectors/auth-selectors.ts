import {StateType} from "../redux-store";

export const getId = (state: StateType) => state.auth.id;
export const getEmail = (state: StateType) => state.auth.email;
export const getLogin = (state: StateType) => state.auth.login;
export const getIsAuth = (state: StateType) => state.auth.isAuth;
export const getCaptchaSelector = (state: StateType) => state.auth.captcha;
