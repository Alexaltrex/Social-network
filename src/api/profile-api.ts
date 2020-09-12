import {photosType, ProfileType} from "../types/types";
import {instance, ResponseTypeAPI} from "./api";

type SavePhotoResponseDataType = {
    photos: photosType
}

export const profileAPI = {
    async getProfile(id: number) {
        let response = await instance.get<ProfileType>(`profile/${id}`)
        return response.data;
    },
    async getStatus(id: number) {
        let response = await instance.get<string>(`profile/status/${id}`)
        return response.data;
    },
    async updateStatus(status: string) {
        let response = await instance.put<ResponseTypeAPI>(`profile/status`, {status: status})
        return response.data;
    },
    async savePhoto(photo: any) {
        const formData = new FormData();
        formData.append('image', photo);
        let response = await instance.put('profile/photo', formData);
        return response.data;
    },
    async saveProfile(values: ProfileType) {
        let response = await instance.put<ResponseTypeAPI<SavePhotoResponseDataType>>(`profile`, values)
        return response.data;
    }
};