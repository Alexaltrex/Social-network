import {BaseThunkType, GetActionsType} from "./redux-store";
import {appAC, AppActionsType} from "./app-reducer";
import {dialogsAPI, DialogType, MessageType} from "../DAL/dialogs-api";

let initialState = {
    dialogs: null as null | Array<DialogType>,
    currentDialogsListItem: 0,
    currentFriendsId: null as null | number,
    messages: null as null | Array<MessageType>,
    selectedMessagesId: [] as Array<string>,
    dialogsIsLoading: false, // диалоги загружаются
    messagesIsLoading: false, // сообщения загружаются?
    deleteAndSpamMessagesId: [] as Array<string>,
    messageIsSending: false, // используется для всплывающего сообщения об отправке сообщения
    recipientName: null as null |string // имя получателя, используется для всплывающего сообщения об отправке сообщения
};

export type initialStateType = typeof initialState;
type DialogsActionsType = GetActionsType<typeof dialogsAC>
type ThunkType = BaseThunkType<DialogsActionsType | AppActionsType>

const dialogsReducer = (state = initialState, action: DialogsActionsType): initialStateType => {
    switch (action.type) {
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
        case 'dialogs/CLEAN_SELECTED_ID': {
            return {...state, selectedMessagesId: []}
        }
        case 'dialogs/REMOVE_SELECTED_ID': {
            return {...state, selectedMessagesId: state.selectedMessagesId.filter(el => el !== action.id)}
        }
        case 'dialogs/ADD_SELECTED_ID': {
            return {...state, selectedMessagesId: [...state.selectedMessagesId, action.id]}
        }
        case 'dialogs/SET_MESSAGES': {
            return {...state, messages: action.messages}
        }
        case 'dialogs/SET_CURRENT_FRIEND_ID': {
            return {...state, currentFriendsId: action.currentFriendsId}
        }
        case 'dialogs/SET_DIALOGS': {
            return {...state, dialogs: action.dialogs}
        }
        case 'dialogs/SET_CURRENT_DIALOGS_LIST_ITEM': {
            return {...state, currentDialogsListItem: action.currentDialogsListItem}
        }
        default:
            return state;
    }
};

export const dialogsAC = {
    setMessagesIsLoading: (messagesIsLoading: boolean) => ({type: 'dialogs/SET_MESSAGES_IS_LOADING', messagesIsLoading} as const),
    setRecipientName: (recipientName: null | string) => ({type: 'dialogs/SET_RECIPIENT_NAME', recipientName} as const),
    setMessageIsSending: (messageIsSending: boolean) => ({type: 'dialogs/SET_MESSAGE_IS_SENDING', messageIsSending} as const),
    toggleDialogsIsLoading: (dialogsIsLoading: boolean) => ({type: 'dialogs/TOGGLE_DIALOGS_IS_LOADING', dialogsIsLoading} as const),
    cleanSelectedId: () => ({type: 'dialogs/CLEAN_SELECTED_ID'} as const),
    addSelectedId: (id: string) => ({type: 'dialogs/ADD_SELECTED_ID', id} as const),
    removeSelectedId: (id: string) => ({type: 'dialogs/REMOVE_SELECTED_ID', id} as const),
    setMessages: (messages: Array<MessageType>) => ({type: 'dialogs/SET_MESSAGES', messages} as const),
    setCurrentFriendsId: (currentFriendsId: number) => ({
        type: 'dialogs/SET_CURRENT_FRIEND_ID',
        currentFriendsId
    } as const),
    setDialogs: (dialogs: Array<DialogType>) => ({type: 'dialogs/SET_DIALOGS', dialogs} as const),
    setCurrentDialogsListItem: (currentDialogsListItem: number) => ({
        type: 'dialogs/SET_CURRENT_DIALOGS_LIST_ITEM',
        currentDialogsListItem
    } as const)
};

// получить массив пользователей с кем ведется диалог
export const getDialogs = (): ThunkType => async (dispatch) => {
    try {
        dispatch(dialogsAC.toggleDialogsIsLoading(true));
        let data = await dialogsAPI.getDialogs();
        dispatch(dialogsAC.setDialogs(data));
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(dialogsAC.toggleDialogsIsLoading(false));
    }
};

// ???
export const startDialog = (userId: number): ThunkType => async (dispatch) => {
    try {
        //dispatch(appAC.toggleLoading(true));
        let data = await dialogsAPI.startDialog(userId);
        console.log(data)
        //dispatch(usersAC.setUsers(data.items));
        //dispatch(usersAC.setTotalUsersCount(data.totalCount));
    } catch (e) {
        //dispatch(appAC.setLanError(true));
    } finally {
        //dispatch(appAC.toggleLoading(false));
    }
};

// послать сообщение пользователю
export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
    try {
        dispatch(dialogsAC.setMessageIsSending(true)); // сообщение отправляется
        const data = await dialogsAPI.sendMessage(userId, message);// post-запрос на сервер
        if (data.resultCode === 0) { // если запрос удачный
            dispatch(dialogsAC.setRecipientName(data.data.message.recipientName)); // установить имя адресата сообщения
            await dispatch(getMessages(userId)); // обновить список сообщения - послать get-запрос
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(dialogsAC.setMessageIsSending(false));
    }
};

// получить массив сообщений из диалога с определенный пользователем
export const getMessages = (userId: number): ThunkType => async (dispatch) => {
    try {
        dispatch(dialogsAC.setMessagesIsLoading(true));
        const data = await dialogsAPI.getMessages(userId);
        if (data.error === null) {
            dispatch(dialogsAC.setMessages(data.items));
        }
    } catch (e) {
        dispatch(appAC.setLanError(true));
    } finally {
        dispatch(dialogsAC.setMessagesIsLoading(false));
    }
};

export const getIsMessageViewed = (messageId: string): ThunkType => async (dispatch) => {
    try {
        //dispatch(profileAC.toggleStatusLoading(true));
        const data = await dialogsAPI.getIsMessageViewed(messageId);
        console.log(data)
        // if (data.resultCode === 0) {
        //     dispatch(profileAC.setStatus(status));
        // }
    } catch (e) {
        //dispatch(appAC.setLanError(true));
    } finally {
        //dispatch(profileAC.toggleStatusLoading(false));
    }
};

export const signMessageAsSpam = (messageId: string): ThunkType => async (dispatch) => {
    try {
        //dispatch(profileAC.toggleStatusLoading(true));
        const data = await dialogsAPI.signMessageAsSpam(messageId);
        console.log(data)
        // if (data.resultCode === 0) {
        //     dispatch(profileAC.setStatus(status));
        // }
    } catch (e) {
        //dispatch(appAC.setLanError(true));
    } finally {
        //dispatch(profileAC.toggleStatusLoading(false));
    }
};



export const deleteMessages = (arrayOfMessagesId: Array<string>, userId: number): ThunkType => async (dispatch) => {
    try {
        //dispatch(profileAC.toggleStatusLoading(true));
        const arrayOfRequests = arrayOfMessagesId
            .map(id => dialogsAPI.deleteMessage(id));
        const results = await Promise.all(arrayOfRequests);

        let resultCodeFinally = 0;
        for (let i = 0; i < results.length - 1; i++) {
            if (results[i].resultCode === 1) {
                resultCodeFinally = 1;
                break
            }
        }

        if (resultCodeFinally === 0) {
            dispatch(dialogsAC.cleanSelectedId()); // очистка массива ид на удаление
            await dispatch(getMessages(userId)); // обновление массива сообщений
        }

        console.log(results)
        // if (data.resultCode === 0) {
        //     dispatch(profileAC.setStatus(status));
        // }
    } catch (e) {
        //dispatch(appAC.setLanError(true));
    } finally {
        //dispatch(profileAC.toggleStatusLoading(false));
    }
};


export default dialogsReducer;