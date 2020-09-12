// DAL - уровень доступа к данным
// упрощенный (через коллбэки) доступ к данным на сервере
import axios from "axios";
import {userType} from "../types/types";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        'API-KEY': 'e09d6375-5dac-4dde-95ca-700e186a8f7d'
    }
});

export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type GetItemsType = {
    items: Array<userType>
    totalCount: number
    error: string | null
}

export type ResponseTypeAPI<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}