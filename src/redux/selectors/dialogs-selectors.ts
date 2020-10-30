import {StateType} from "../redux-store";

export const getDialogsSelector = (state: StateType) => state.dialogs.dialogs;
export const getMessagesSelector = (state: StateType) => state.dialogs.messages;
export const getSelectedMessages = (state: StateType) => state.dialogs.selectedMessages;
export const getSelectedDeletedMessages = (state: StateType) => state.dialogs.selectedDeletedMessages;
export const getDialogsIsLoading = (state: StateType) => state.dialogs.dialogsIsLoading;
export const getMessageIsSending = (state: StateType) => state.dialogs.messageIsSending;
export const getRecipientName = (state: StateType) => state.dialogs.recipientName;
export const getMessagesIsLoading = (state: StateType) => state.dialogs.messagesIsLoading;
export const getMessagesIsDeleting = (state: StateType) => state.dialogs.messagesIsDeleting;
export const getCurrentDialogsSidebarItem = (state: StateType) => state.dialogs.currentDialogsSidebarItem;
export const getLoading = (state: StateType) => state.dialogs.messageIsSending ||
    state.dialogs.messagesIsLoading ||
    state.dialogs.messagesIsDeleting;
export const getDeletedMessages = (state: StateType) => state.dialogs.deletedMessages;
export const getSpamMessages = (state: StateType) => state.dialogs.spamMessages;




