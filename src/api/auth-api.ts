import {instance, ResponseTypeAPI, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

// type AuthResponseType = {
//     data: {
//         id: number
//         email: string
//         login: string
//     }
//     resultCode: ResultCodesEnum
//     messages: Array<string>
// }
type AuthResponseDataType = {
    id: number
    email: string
    login: string
}
type AuthResponseType = ResponseTypeAPI<AuthResponseDataType>

// type LoginResponseType = {
//     data: {
//         userId: number
//     }
//     resultCode: ResultCodesEnum | ResultCodeForCaptchaEnum
//     messages: Array<string>
// }
type LoginResponseDataType = {
    userId: number
}
type LoginResponseType = ResponseTypeAPI<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>

export const authAPI = {
    async auth() {
        let response = await instance.get<AuthResponseType>(`auth/me`)
        return response.data;
    },
    async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
        let response = await instance.post<LoginResponseType>(`auth/login`, {email, password, rememberMe, captcha})
        return response.data;
    },
    async logout() {
        let response = await instance.delete(`auth/login`)
        return response.data;
    }
};