import {instance} from "./api";

type getCaptchaResponseType = {
    url:string
}

export const securityAPI = {
    async getCaptcha() {
        let response = await instance.get<getCaptchaResponseType>(`security/get-captcha-url`);
        return response.data;
    }
};