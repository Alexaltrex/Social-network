import {BaseThunkType, GetActionsType} from "../redux-store";
import {appAC, AppActionsType} from "./app-reducer";
import {dialogsAPI, DialogType, MessageType} from "../../DAL/dialogs-api";
import {DialogsSidebarItemEnum, DeletedMessagesType} from "../../types/types";
import {ResultCodesEnum} from "../../DAL/api";

export const GET_DIALOGS = 'DIALOGS/GET_DIALOGS';
export const SEND_MASSAGE = 'DIALOGS/SEND_MASSAGE';
export const GET_MASSAGES = 'DIALOGS/GET_MASSAGES';
export const DELETE_MESSAGES = 'DIALOGS/DELETE_MESSAGES';
export const RESTORE_MESSAGES = 'DIALOGS/RESTORE_MESSAGES';

let initialState = {
    dialogs: null as null | Array<DialogType>, // массив диалогов
    messages: null as null | Array<MessageType>, // сообщения из текущего диалога
    selectedMessages: [] as Array<MessageType>, // массив выделенных сообщений
    selectedDeletedMessages: [] as Array<MessageType>, // массив выделенных удаленных сообщений
    selectedSpamMessages: [] as Array<MessageType>, // массив выделенных spam сообщений
    dialogsIsLoading: false, // диалоги загружаются
    messagesIsLoading: false, // сообщения загружаются?
    messagesIsDeleting: false, // сообщения удаляются (или отправляются в спам)?
    messageIsSending: false, // используется для всплывающего сообщения об отправке сообщения
    recipientName: null as null | string, // имя получателя, используется для всплывающего сообщения об отправке сообщения
    currentDialogsSidebarItem: 0 as DialogsSidebarItemEnum, // текущий элемемент бокового меню
    deletedMessages: [] as DeletedMessagesType, // массив удаленных диалогов [{dialog: DialogType, messages: Array<MessageType>}, ...]
    spamMessages: [] as DeletedMessagesType, // массив диалогов отмеченных как spam [{dialog: DialogType, messages: Array<MessageType>}, ...]
};

export type initialStateType = typeof initialState;
type DialogsActionsType = GetActionsType<typeof dialogsAC>
export type DialogsSagaActionsType = GetActionsType<typeof dialogsSagaAC>
type ThunkType = BaseThunkType<DialogsActionsType | AppActionsType>

const dialogsReducer = (state = initialState, action: DialogsActionsType | DialogsSagaActionsType): initialStateType => {
    switch (action.type) {
        case 'dialogs/REMOVE_FROM_DELETED_MESSAGES': {
            let deletedMessages = [...state.deletedMessages];
            for (let i = 0; i < action.messages.length; i++) {
                for (let j = 0; j < deletedMessages.length; j++) {
                    deletedMessages[j].messages = deletedMessages[j].messages.filter(el => el.id !== action.messages[i].id)
                }
            }
            deletedMessages = deletedMessages.filter(el => el.messages.length);

            return {...state, deletedMessages: deletedMessages}
        }
        case 'dialogs/REMOVE_FROM_SPAM_MESSAGES': {
            let spamMessages = [...state.spamMessages];
            for (let i = 0; i < action.messages.length; i++) {
                for (let j = 0; j < spamMessages.length; j++) {
                    spamMessages[j].messages = spamMessages[j].messages.filter(el => el.id !== action.messages[i].id)
                }
            }
            spamMessages = spamMessages.filter(el => el.messages.length);

            return {...state, spamMessages: spamMessages}
        }
        case 'dialogs/ADD_TO_DELETED_MESSAGES': {
            const index = state.deletedMessages.findIndex(el => el.dialog.id === action.dialog.id)
            if (index === -1) { // если удаленных сообщений из этого диалога еще нет
                return {
                    ...state,
                    deletedMessages: [...state.deletedMessages, {dialog: action.dialog, messages: [action.message]}]
                }
            } else {
                return {
                    ...state,
                    deletedMessages: state.deletedMessages.map((el, i) => {
                        if (i !== index) {
                            return el
                        } else {
                            return {dialog: el.dialog, messages: [...el.messages, action.message]}
                        }
                    })
                }
            }
        }
        case 'dialogs/ADD_TO_SPAM_MESSAGES': {
            const index = state.spamMessages.findIndex(el => el.dialog.id === action.dialog.id)
            if (index === -1) { // если удаленных сообщений из этого диалога еще нет
                return {
                    ...state,
                    spamMessages: [...state.spamMessages, {dialog: action.dialog, messages: [action.message]}]
                }
            } else {
                return {
                    ...state,
                    spamMessages: state.spamMessages.map((el, i) => {
                        if (i !== index) {
                            return el
                        } else {
                            return {dialog: el.dialog, messages: [...el.messages, action.message]}
                        }
                    })
                }
            }
        }
        case 'dialogs/SET_CURRENT_DIALOGS_SIDEBAR_ITEM': {
            return {...state, currentDialogsSidebarItem: action.currentDialogsSidebarItem}
        }
        case 'dialogs/SET_MESSAGES_IS_DELETING': {

            return {...state, messagesIsDeleting: action.messagesIsDeleting}
        }
        case 'dialogs/SET_MESSAGES_IS_LOADING': {
            return {...state, messagesIsLoading: action.messagesIsLoading}
        }
        case 'dialogs/SET_RECIPIENT_NAME': {
            return {...state, recipientName: action.recipientName}
        }
        case 'dialogs/SET_MESSAGE_IS_SENDING': {
            return {...state, messageIsSending: action.messageIsSending}
        }
        case 'dialogs/TOGGLE_DIALOGS_IS_LOADING': {
            return {...state, dialogsIsLoading: action.dialogsIsLoading}
        }
        case 'dialogs/CLEAN_SELECTED_MESSAGES': {
            return {...state, selectedMessages: []}
        }
        case 'dialogs/CLEAN_DELETED_SELECTED_MESSAGES': {
            return {...state, selectedDeletedMessages: []}
        }
        case 'dialogs/REMOVE_FROM_SELECTED_MASSAGES': {
            return {...state, selectedMessages: state.selectedMessages.filter(el => el.id !== action.message.id)}
        }
        case 'dialogs/REMOVE_FROM_DELETED_SELECTED_MASSAGES': {
            return {
                ...state,
                selectedDeletedMessages: state.selectedDeletedMessages.filter(el => el.id !== action.message.id)
            }
        }
        case 'dialogs/ADD_TO_SELECTED_MASSAGES': {
            return {...state, selectedMessages: [...state.selectedMessages, action.message]}
        }
        case 'dialogs/ADD_TO_DELETED_SELECTED_MASSAGES': {
            return {...state, selectedDeletedMessages: [...state.selectedDeletedMessages, action.message]}
        }
        case 'dialogs/SET_MESSAGES': {
            return {...state, messages: action.messages}
        }
        case 'dialogs/SET_DIALOGS': {
            return {...state, dialogs: action.dialogs}
        }
        // SAGA
        case GET_DIALOGS: {
            return state
        }
        case SEND_MASSAGE: {
            return state
        }
        case GET_MASSAGES: {
            return state
        }
        case DELETE_MESSAGES: {
            return state
        }
        case RESTORE_MESSAGES: {
            return state
        }
        default:
            return state;
    }
};

export const dialogsAC = {
    removeFromDeletedMessages: (messages: Array<MessageType>) => ({
        type: 'dialogs/REMOVE_FROM_DELETED_MESSAGES',
        messages
    } as const),
    removeFromSpamMessages: (messages: Array<MessageType>) => ({
        type: 'dialogs/REMOVE_FROM_SPAM_MESSAGES',
        messages
    } as const),
    addToDeletedMessages: (dialog: DialogType, message: MessageType) => ({
        type: 'dialogs/ADD_TO_DELETED_MESSAGES',
        dialog,
        message
    } as const),
    addToSpamMessages: (dialog: DialogType, message: MessageType) => ({
        type: 'dialogs/ADD_TO_SPAM_MESSAGES',
        dialog,
        message
    } as const),
    setCurrentDialogsSidebarItem: (currentDialogsSidebarItem: number) => ({
        type: 'dialogs/SET_CURRENT_DIALOGS_SIDEBAR_ITEM',
        currentDialogsSidebarItem
    } as const),
    setMessagesIsDeleting: (messagesIsDeleting: boolean) => ({
        type: 'dialogs/SET_MESSAGES_IS_DELETING',
        messagesIsDeleting
    } as const),
    setMessagesIsLoading: (messagesIsLoading: boolean) => ({
        type: 'dialogs/SET_MESSAGES_IS_LOADING',
        messagesIsLoading
    } as const),
    setRecipientName: (recipientName: null | string) => ({type: 'dialogs/SET_RECIPIENT_NAME', recipientName} as const),
    setMessageIsSending: (messageIsSending: boolean) => ({
        type: 'dialogs/SET_MESSAGE_IS_SENDING',
        messageIsSending
    } as const),
    toggleDialogsIsLoading: (dialogsIsLoading: boolean) => ({
        type: 'dialogs/TOGGLE_DIALOGS_IS_LOADING',
        dialogsIsLoading
    } as const),
    cleanSelectedMessages: () => ({type: 'dialogs/CLEAN_SELECTED_MESSAGES'} as const),
    cleanSelectedDeletedMessages: () => ({type: 'dialogs/CLEAN_DELETED_SELECTED_MESSAGES'} as const),
    addToSelectedMessages: (message: MessageType) => ({type: 'dialogs/ADD_TO_SELECTED_MASSAGES', message} as const),
    addToSelectedDeletedMessages: (message: MessageType) => ({
        type: 'dialogs/ADD_TO_DELETED_SELECTED_MASSAGES',
        message
    } as const),
    removeFromSelectedMessages: (message: MessageType) => ({
        type: 'dialogs/REMOVE_FROM_SELECTED_MASSAGES',
        message
    } as const),
    removeFromSelectedDeletedMessages: (message: MessageType) => ({
        type: 'dialogs/REMOVE_FROM_DELETED_SELECTED_MASSAGES',
        message
    } as const),
    setMessages: (messages: Array<MessageType> | null) => ({type: 'dialogs/SET_MESSAGES', messages} as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'dialogs/SET_DIALOGS', dialogs} as const),
};

// action creator for sagas
export const dialogsSagaAC = {
    getDialogs: () => ({type: GET_DIALOGS} as const),
    sendMessage: (userId: number, message: string) => ({type: SEND_MASSAGE, userId, message} as const),
    getMessages: (userId: number) => ({type: GET_MASSAGES, userId} as const),
    deleteMessages: (messages: Array<MessageType>, dialog: DialogType) => ({
        type: DELETE_MESSAGES,
        messages,
        dialog
    } as const),
    restoreMessages: (messages: Array<MessageType>) => ({
        type: RESTORE_MESSAGES,
        messages
    } as const)
};

// типизация экшн-криейторов для саг (для воркеров)
export type GetDialogsACType = {
    type: typeof GET_DIALOGS
}
export type SendMessageACType = {
    type: typeof SEND_MASSAGE
    userId: number
    message: string
}
export type GetMessagesACType = {
    type: typeof GET_MASSAGES
    userId: number
}
export type DeleteMessagesACType = {
    type: typeof DELETE_MESSAGES,
    messages: Array<MessageType>
    dialog: DialogType
}
export type RestoreMessagesACType = {
    type: typeof RESTORE_MESSAGES
    messages: Array<MessageType>
}

//======================= THUNK-CREATORS (ЗАМЕНЕНЫ НА САГИ) =======================
// получить массив пользователей с кем ведется диалог
// export const getDialogs = (): ThunkType => async (dispatch) => {
//     try {
//         dispatch(dialogsAC.toggleDialogsIsLoading(true));
//         let data = await dialogsAPI.getDialogs();
//         dispatch(dialogsAC.setDialogs(data));
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//         dispatch(dialogsAC.toggleDialogsIsLoading(false));
//     }
// };

// послать сообщение пользователю
// export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
//     try {
//         dispatch(dialogsAC.setMessageIsSending(true)); // сообщение отправляется
//         const dataSend = await dialogsAPI.sendMessage(userId, message);// post-запрос на сервер
//         if (dataSend.resultCode === ResultCodesEnum.Success) { // если запрос удачный
//             dispatch(dialogsAC.setRecipientName(dataSend.data.message.recipientName)); // установить имя адресата сообщения
//             const data = await dialogsAPI.getMessages(userId);// обновить список сообщений
//             if (data.error === null) {
//                 dispatch(dialogsAC.setMessages(data.items));
//             }
//         }
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//         dispatch(dialogsAC.setMessageIsSending(false));
//     }
// };

// получить массив сообщений из диалога с определенный пользователем
// export const getMessages = (userId: number): ThunkType => async (dispatch) => {
//     try {
//         dispatch(dialogsAC.setMessagesIsLoading(true));
//         const data = await dialogsAPI.getMessages(userId);
//         if (data.error === null) {
//             dispatch(dialogsAC.setMessages(data.items));
//         }
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//         dispatch(dialogsAC.setMessagesIsLoading(false));
//     }
// };

// удаление сообщений
// export const deleteMessages = (messages: Array<MessageType>, dialog: DialogType): ThunkType => async (dispatch) => {
//     try {
//         dispatch(dialogsAC.setMessagesIsDeleting(true));
//
//         const arrayOfRequests = messages
//             .map(el => dialogsAPI.deleteMessage(el.id));
//         const results = await Promise.all(arrayOfRequests);
//
//         let resultCodeFinally: ResultCodesEnum = 0;// определение успеха массива промисов
//         for (let i = 0; i < results.length - 1; i++) {
//             if (results[i].resultCode === ResultCodesEnum.Error) {
//                 resultCodeFinally = ResultCodesEnum.Error;
//                 break
//             }
//         }
//
//         if (resultCodeFinally === ResultCodesEnum.Success) {
//             const data = await dialogsAPI.getMessages(dialog.id);// обновление массива сообщений
//             if (data.error === null) {
//                 dispatch(dialogsAC.setMessages(data.items));
//                 for (let i = 0; i < messages.length; i++) {// добавление сообщений в массив удаленных
//                     dispatch(dialogsAC.addToDeletedMessages(dialog, messages[i]))
//                 }
//                 dispatch(dialogsAC.cleanSelectedMessages()); // очистка массива ид выделенных сообщений
//             }
//         }
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//         dispatch(dialogsAC.setMessagesIsDeleting(false));
//     }
// };

// восстановить удаленное или помеченное как спам сообщение
// export const restoreMessages = (messages: Array<MessageType>): ThunkType => async (dispatch) => {
//     try {
//         const arrayOfRequests = messages
//             .map(el => dialogsAPI.restoreMessage(el.id));
//         const results = await Promise.all(arrayOfRequests);
//
//         let resultCodeFinally: ResultCodesEnum = 0;
//         for (let i = 0; i < results.length - 1; i++) {
//             if (results[i].resultCode === ResultCodesEnum.Error) {
//                 resultCodeFinally = ResultCodesEnum.Error;
//                 break
//             }
//         }
//         if (resultCodeFinally === ResultCodesEnum.Success) {
//             // очистка массива выделенных удаленных сообщений
//             dispatch(dialogsAC.cleanSelectedDeletedMessages())
//             // удалить сообщения из массива удаленнных диалогов
//             dispatch(dialogsAC.removeFromDeletedMessages(messages));
//         }
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//     }
// };

// НЕИСПОЛЬЗУЕМЫЕ

// отметить сообщения как спам (при этом удаляется?)
// export const signMessageAsSpam = (messages: Array<MessageType>, dialog: DialogType): ThunkType => async (dispatch) => {
//     try {
//         dispatch(dialogsAC.setMessagesIsDeleting(true));
//
//         const arrayOfRequests = messages
//             .map(el => dialogsAPI.signMessageAsSpam(el.id));
//         const results = await Promise.all(arrayOfRequests);
//
//         let resultCodeFinally: ResultCodesEnum = 0;// определение успеха массива промисов
//         for (let i = 0; i < results.length - 1; i++) {
//             if (results[i].resultCode === ResultCodesEnum.Error) {
//                 resultCodeFinally = ResultCodesEnum.Error;
//                 break
//             }
//         }
//
//         if (resultCodeFinally === ResultCodesEnum.Success) {
//             const data = await dialogsAPI.getMessages(dialog.id);// обновление массива сообщений (запрос)
//             if (data.error === null) {
//                 dispatch(dialogsAC.setMessages(data.items));// обновление массива сообщений (запись в стор)
//                 for (let i = 0; i < messages.length; i++) {// добавление сообщений в массив удаленных
//                     dispatch(dialogsAC.addToSpamMessages(dialog, messages[i]))
//                 }
//                 dispatch(dialogsAC.cleanSelectedMessages()); // очистка массива ид выделенных сообщений
//             }
//         }
//
//     } catch (e) {
//         dispatch(appAC.setLanError(true));
//     } finally {
//         dispatch(dialogsAC.setMessagesIsDeleting(false));
//     }
// };

// ???
// export const startDialog = (userId: number): ThunkType => async (dispatch) => {
//     try {
//         //dispatch(appAC.toggleLoading(true));
//         let data = await dialogsAPI.startDialog(userId);
//         //console.log(data)
//         //dispatch(usersAC.setUsers(data.items));
//         //dispatch(usersAC.setTotalUsersCount(data.totalCount));
//     } catch (e) {
//         //dispatch(appAC.setLanError(true));
//     } finally {
//         //dispatch(appAC.toggleLoading(false));
//     }
// };

// определить, просмотрено ли сообщение
//
//export const getIsMessageViewed = (messageId: string): ThunkType => async (dispatch) => {
//     try {
//         //dispatch(profileAC.toggleStatusLoading(true));
//         const data = await dialogsAPI.getIsMessageViewed(messageId);
//         //console.log(data)
//         // if (data.resultCode === 0) {
//         //     dispatch(profileAC.setStatus(status));
//         // }
//     } catch (e) {
//         //dispatch(appAC.setLanError(true));
//     } finally {
//         //dispatch(profileAC.toggleStatusLoading(false));
//     }
// };

export default dialogsReducer;