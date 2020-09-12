import {GetItemsType, instance, ResponseTypeAPI} from "./api";

export const usersAPI = {
    async getUsers(currentPage = 1, pageSize = 10) {
        let response = await instance.get<GetItemsType>(`users?page=${currentPage}&count=${pageSize}`);
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
    // async getProfile(id: number) {
    //     let response = await instance.get<>(`profile/${id}`)
    //     return response.data;
    // }
};