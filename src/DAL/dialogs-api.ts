import {instance, ResultCodesEnum} from "./api";
import {PhotosType} from "../types/types";

export const dialogsAPI = {
    // получить массив пользователей с кем ведется диалог
    async getDialogs() {
        let response = await instance.get<Array<DialogType>>(`dialogs`);
        return response.data;
    },

    // ???
    async startDialog(userId: number) {
        let response = await instance.put<SendMessageType>(`dialogs/${userId}`);
        return response.data;
    },

    // получить массив сообщений из диалога с определенный пользователем
    async getMessages(userId: number) {
        let response = await instance.get<GetMessagesType>(`dialogs/${userId}/messages`)
        return response.data;
    },

    // послать сообщение пользователю
    async sendMessage(userId: number, message: string) {
        let response = await instance.post<SendMessageType>(`dialogs/${userId}/messages`,{body: message})
        return response.data;
    },

    // проверить просмотрено ли мое сообщение
    async getIsMessageViewed(messageId: string) {
        let response = await instance.get<boolean>(`dialogs/messages/${messageId}/viewed`)
        return response.data;
    },

    // отметить сообщение как спам
    async signMessageAsSpam(messageId: string) {
        let response = await instance.post<SendMessageType>(`dialogs/messages/${messageId}/spam`)
        console.log(response)
        return response.data;
    },

    // удалить сообщение (только для меня, не для собеседника)
    async deleteMessage(messageId: string) {
        let response = await instance.delete<SendMessageType>(`dialogs/messages/${messageId}`)
        return response.data;
    },

    // восстановить удаленное или помеченное как спам сообщение
    async restoreMessage(messageId: string) {
        let response = await instance.put<SendMessageType>(`dialogs/messages/${messageId}/restore`)
        return response.data;
    },

};

//================================= TYPE =======================================
type SendMessageType = {
    data: {message: MessageType}
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: ResultCodesEnum
}

export type MessageType = {
    id: string
    body: string
    translatedBody: any
    addedAt: string
    senderId: number
    senderName: string
    recipientId: number
    recipientName: string
    viewed: boolean
    deletedBySender: boolean // только для post
    deletedByRecipient: boolean  //только для post
    isSpam: boolean  //только для post
    distributionId: any  //только для post
}

type GetMessagesType = {
    items: Array<MessageType>
    totalCount: number
    error: any
}

export type DialogType = {
    id: number
    userName: string
    hasNewMessages: boolean
    lastDialogActivityDate: string
    lastUserActivityDate: string
    newMessagesCount: number
    photos: PhotosType
}

