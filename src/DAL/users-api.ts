import {GetItemsType, instance, ResponseTypeAPI} from "./api";
import {FriendsValuesType} from "../types/types";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
        return response.data;
    },

    async searchUsers(currentPage = 1, pageSize = 10, term: string, friend: FriendsValuesType) {
        let url = `users?page=${currentPage}&count=${pageSize}`;
        if (term) url = url + `&term=${term}`;
        let friendUrl;
        if (friend === 'all') {
            friendUrl = ''
        } else {
            friendUrl = `&friend=${friend}`
        }
        url = url + friendUrl;
        let response = await instance.get<GetItemsType>(url);
        return response.data;
    },

    async followUser(id: number) {
        let response = await instance.post<ResponseTypeAPI>(`follow/${id}`)
        return response.data;
    },

    async unfollowUser(id: number) {
        let response = await instance.delete(`follow/${id}`) //as AxiosResponse<any>
                return response.data as Promise<ResponseTypeAPI>;
      },
    };

