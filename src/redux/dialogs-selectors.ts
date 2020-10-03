import {StateType} from "./redux-store";

export const getDialogsSelector = (state: StateType) => state.dialogs.dialogs;
export const getMessagesSelector = (state: StateType) => state.dialogs.messages;
export const getCurrentDialogsListItem = (state: StateType) => state.dialogs.currentDialogsListItem;
export const getCurrentFriendsId = (state: StateType) => state.dialogs.currentFriendsId;
export const getSelectedMessagesId = (state: StateType) => state.dialogs.selectedMessagesId;
export const getDialogsIsLoading = (state: StateType) => state.dialogs.dialogsIsLoading;
export const getMessageIsSending = (state: StateType) => state.dialogs.messageIsSending;
export const getRecipientName = (state: StateType) => state.dialogs.recipientName;
export const getMessagesIsLoading = (state: StateType) => state.dialogs.messagesIsLoading;




