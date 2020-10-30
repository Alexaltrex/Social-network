import {DialogType, MessageType} from "../DAL/dialogs-api";
import {DeletedMessagesType, DialogsSidebarItemEnum, PhotosType} from "../types/types";
import dialogsReducer, {dialogsAC} from "../redux/dialogs-reducer";

const dialog1 = {
    id: 111,
    userName: 'Sol',
    hasNewMessages: false,
    lastDialogActivityDate: "2020-10-09T21:36:26.82",
    lastUserActivityDate: "2019-10-29T00:05:15.107",
    newMessagesCount: 0,
    photos: {
        small: "https://social-network.samuraijs.com/activecontent/images/users/11/user-small.jpg?v=1",
        large: "https://social-network.samuraijs.com/activecontent/images/users/11/user.jpg?v=1"
    }
};
const dialog2 = {
    id: 222,
    userName: 'Nick',
    hasNewMessages: false,
    lastDialogActivityDate: "2020-10-09T21:36:26.82",
    lastUserActivityDate: "2019-10-29T00:05:15.107",
    newMessagesCount: 0,
    photos: {
        small: "https://social-network.samuraijs.com/activecontent/images/users/11/user-small.jpg?v=1",
        large: "https://social-network.samuraijs.com/activecontent/images/users/11/user.jpg?v=1"
    }
};
const dialog3 = {
    id: 333,
    userName: 'Nick',
    hasNewMessages: false,
    lastDialogActivityDate: "2020-10-09T21:36:26.82",
    lastUserActivityDate: "2019-10-29T00:05:15.107",
    newMessagesCount: 0,
    photos: {
        small: "https://social-network.samuraijs.com/activecontent/images/users/11/user-small.jpg?v=1",
        large: "https://social-network.samuraijs.com/activecontent/images/users/11/user.jpg?v=1"
    }
};
const message1 = {
    id: "aaaa",
    body: "777",
    translatedBody: null,
    addedAt: "2020-10-09T21:36:26.82",
    senderId: 8559,
    senderName: "AlexAltrex",
    recipientId: 11,
    viewed: false,
    recipientName: 'string'
};
const message2 = {
    id: "bbb",
    body: "666",
    translatedBody: null,
    addedAt: "2020-10-09T21:36:26.82",
    senderId: 8559,
    senderName: "AlexAltrex",
    recipientId: 11,
    viewed: false,
    recipientName: 'string'
};
const message3 = {
    id: "cccccc",
    body: "777",
    translatedBody: null,
    addedAt: "2020-10-09T21:36:26.82",
    senderId: 8559,
    senderName: "AlexAltrex",
    recipientId: 11,
    viewed: false,
    recipientName: 'string'
};
const message4 = {
    id: "ddddddd",
    body: "666",
    translatedBody: null,
    addedAt: "2020-10-09T21:36:26.82",
    senderId: 8559,
    senderName: "AlexAltrex",
    recipientId: 11,
    viewed: false,
    recipientName: 'string'
};
const message5 = {
    id: "eeeee",
    body: "999",
    translatedBody: null,
    addedAt: "2020-10-09T21:36:26.82",
    senderId: 8559,
    senderName: "AlexAltrex",
    recipientId: 11,
    viewed: false,
    recipientName: 'string'
};

const initialState = {
    dialogs: [dialog1],
    messages: [message1, message2],
    selectedMessages: [message1, message2, message3] as Array<MessageType>, // массив выделенных сообщений
    selectedDeletedMessages: [message1, message2, message3] as Array<MessageType>, // массив выделенных удаленных сообщений
    selectedSpamMessages: [] as Array<MessageType>, // массив выделенных spam сообщений
    dialogsIsLoading: false, // диалоги загружаются
    messagesIsLoading: false, // сообщения загружаются?
    messagesIsDeleting: false, // сообщения удаляются (или отправляются в спам)?
    messageIsSending: false, // используется для всплывающего сообщения об отправке сообщения
    recipientName: null as null | string, // имя получателя, используется для всплывающего сообщения об отправке сообщения
    currentDialogsSidebarItem: 0 as DialogsSidebarItemEnum, // текущий элмемент бокового меню
    deletedMessages: [
        {
            dialog: dialog1,
            messages: [
                message1,
                message2,
            ]
        },
        {
            dialog: dialog2,
            messages: [
                message3,
                message4,
            ]
        }
    ],
    spamMessages: [] as DeletedMessagesType, // массив диалогов отмеченных как spam [{dialog: DialogType, messages: Array<MessageType>}, ...]
};

describe('dialogs-reducer', () => {

    it('dialogs/REMOVE_FROM_DELETED_MESSAGES - не все сообщения из диалоага', () => {
        const action = dialogsAC.removeFromDeletedMessages([message1]);
        const newState = dialogsReducer(initialState, action);
        expect(newState.deletedMessages[0].messages).not.toContain(message1)
    })

    it('dialogs/REMOVE_FROM_DELETED_MESSAGES - все сообщения из диалоага', () => {
        const deletedMessageItem = {
            dialog: dialog1,
            messages: [
                message1,
                message2,
            ]
        };
        const action = dialogsAC.removeFromDeletedMessages([message1, message2]);
        const newState = dialogsReducer(initialState, action);
        expect(newState.deletedMessages).not.toContain(deletedMessageItem)
    })

    it('dialogs/ADD_TO_DELETED_MESSAGES - к уже существующему', () => {
        const action = dialogsAC.addToDeletedMessages(dialog1, message5)
        const newState = dialogsReducer(initialState, action);
        expect(newState.deletedMessages[0].messages).toContain(message5);
    })

    it('dialogs/ADD_TO_DELETED_MESSAGES - к еще не созданному', () => {
        const action = dialogsAC.addToDeletedMessages(dialog3, message5)
        const newState = dialogsReducer(initialState, action);
        // expect(newState.deletedMessages).toContain({
        //     dialog: dialog3,
        //     messages: [message5]
        // });
        expect(newState.deletedMessages.length).toBe(3);
        expect(newState.deletedMessages[2].dialog).toBe(dialog3);
        expect(newState.deletedMessages[2].messages).toContain(message5);
    })

    it('dialogs/SET_CURRENT_DIALOGS_SIDEBAR_ITEM', () => {
        const currentDialogsSidebarItem = 5;
        const action = dialogsAC.setCurrentDialogsSidebarItem(currentDialogsSidebarItem);
        const newState = dialogsReducer(initialState, action);
        expect(newState.currentDialogsSidebarItem).toEqual(currentDialogsSidebarItem);
    })

    it('dialogs/SET_MESSAGES_IS_DELETING', () => {
        const messagesIsDeleting = true;
        const action = dialogsAC.setMessagesIsDeleting(messagesIsDeleting);
        const newState = dialogsReducer(initialState, action);
        expect(newState.messagesIsDeleting).toEqual(messagesIsDeleting);
    });

    it('dialogs/SET_MESSAGES_IS_LOADING', () => {
        const messagesIsLoading = true;
        const action = dialogsAC.setMessagesIsLoading(messagesIsLoading);
        const newState = dialogsReducer(initialState, action);
        expect(newState.messagesIsLoading).toEqual(messagesIsLoading);
    });

    it('dialogs/SET_RECIPIENT_NAME', () => {
        const recipientName = 'recipientName';
        const action = dialogsAC.setRecipientName(recipientName);
        const newState = dialogsReducer(initialState, action);
        expect(newState.messagesIsLoading).toEqual(recipientName);
    })

    it('dialogs/SET_MESSAGE_IS_SENDING', () => {
        const messageIsSending = true;
        const action = dialogsAC.setMessageIsSending(messageIsSending);
        const newState = dialogsReducer(initialState, action);
        expect(newState.messageIsSending).toEqual(messageIsSending);
    });

    it('dialogs/TOGGLE_DIALOGS_IS_LOADING', () => {
        const dialogsIsLoading = true;
        const action = dialogsAC.toggleDialogsIsLoading(dialogsIsLoading);
        const newState = dialogsReducer(initialState, action);
        expect(newState.dialogsIsLoading).toEqual(dialogsIsLoading);
    });

    it('dialogs/CLEAN_SELECTED_MESSAGES', () => {
        const action = dialogsAC.cleanSelectedMessages();
        const newState = dialogsReducer(initialState, action);
        expect(newState.selectedMessages.length).toEqual(0);
    });

    it('dialogs/CLEAN_DELETED_SELECTED_MESSAGES', () => {
        const action = dialogsAC.cleanSelectedDeletedMessages();
        const newState = dialogsReducer(initialState, action);
        expect(newState.selectedDeletedMessages.length).toEqual(0);
    });

    it('dialogs/REMOVE_FROM_SELECTED_MASSAGES', () => {
        const action = dialogsAC.removeFromSelectedMessages(message1);
        const newState = dialogsReducer(initialState, action);
        expect(newState.selectedMessages).not.toContain(message1)
    });

    it('dialogs/REMOVE_FROM_DELETED_SELECTED_MASSAGES', () => {
        const action = dialogsAC.removeFromSelectedDeletedMessages(message2);
        const newState = dialogsReducer(initialState, action);
        expect(newState.selectedDeletedMessages).not.toContain(message2)
    });

    it('dialogs/SET_MESSAGES', () => {
        const action = dialogsAC.setMessages([message3, message4]);
        const newState = dialogsReducer(initialState, action);
        expect(newState.messages).toContain(message3);
        expect(newState.messages).toContain(message4);
    });

    it('dialogs/SET_DIALOGS', () => {
        const action = dialogsAC.setDialogs([dialog2]);
        const newState = dialogsReducer(initialState, action);
        expect(newState.dialogs).toContain(dialog2);
    });

})

