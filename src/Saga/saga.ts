import {takeEvery, call, put, all} from "redux-saga/effects";
import {SagaIterator} from "redux-saga";
import {
    DELETE_MESSAGES, DeleteMessagesACType,
    dialogsAC,
    GET_DIALOGS, GET_MASSAGES, GetMessagesACType, RESTORE_MESSAGES, RestoreMessagesACType,
    SEND_MASSAGE,
    SendMessageACType,
} from "../redux/dialogs-reducer";
import {dialogsAPI, DialogType, GetMessagesType, MessageType, SendMessageType} from "../DAL/dialogs-api";
import {appAC} from "../redux/app-reducer";
import {ResultCodesEnum} from "../DAL/api";

// export const GET_DIALOGS = 'DIALOGS/GET_DIALOGS';
// export const SEND_MASSAGE = 'DIALOGS/SEND_MASSAGE';
// export const GET_MASSAGE = 'DIALOGS/GET_MASSAGE';
// export const DELETE_MESSAGES = 'DIALOGS/DELETE_MESSAGES';


export function* watcherGetDialogs(): SagaIterator {
    yield takeEvery(GET_DIALOGS, workerGetDialogs);
}

export function* watcherSendMessage(): SagaIterator {
    yield takeEvery(SEND_MASSAGE, workerSendMessage);
}

export function* watcherGetMessage(): SagaIterator {
    yield takeEvery(GET_MASSAGES, workerGetMessages);
}

export function* watcherDeleteMessage(): SagaIterator {
    yield takeEvery(DELETE_MESSAGES, workerDeleteMessages);
}

export function* watcherRestoreMessage(): SagaIterator {
    yield takeEvery(RESTORE_MESSAGES, workerRestoreMessages);
}

export function* workerGetDialogs(): SagaIterator {
    try {
        yield put(dialogsAC.toggleDialogsIsLoading(true));
        const data: Array<DialogType> = yield call(dialogsAPI.getDialogs);
        yield put(dialogsAC.setDialogs(data));
    } catch (e) {
        yield put(appAC.setLanError(true))
    } finally {
        yield put(dialogsAC.toggleDialogsIsLoading(false));
    }
}

export function* workerSendMessage(action: SendMessageACType): SagaIterator {
    try {
        yield put(dialogsAC.setMessageIsSending(true));
        const dataSend: SendMessageType = yield call(dialogsAPI.sendMessage, action.userId, action.message);
        if (dataSend.resultCode === ResultCodesEnum.Success) { // если запрос удачный
            yield put(dialogsAC.setRecipientName(dataSend.data.message.recipientName)); // установить имя адресата сообщения
            const data: GetMessagesType = yield call(dialogsAPI.getMessages, action.userId);// обновить список сообщений
            if (data.error === null) {
                yield put(dialogsAC.setMessages(data.items));
            }
        }
    } catch (e) {
        yield put(appAC.setLanError(true))
    } finally {
        yield put(dialogsAC.setMessageIsSending(false));
    }
}

export function* workerGetMessages(action: GetMessagesACType): SagaIterator {
    try {
        yield put(dialogsAC.setMessagesIsLoading(true));
        const data: GetMessagesType = yield call(dialogsAPI.getMessages, action.userId);
        if (data.error === null) {
            yield put(dialogsAC.setMessages(data.items));
        }
    } catch (e) {
        yield put(appAC.setLanError(true))
    } finally {
        yield put(dialogsAC.setMessagesIsLoading(false));
    }
}

export function* workerDeleteMessages(action: DeleteMessagesACType): SagaIterator {
    try {
        yield put(dialogsAC.setMessagesIsDeleting(true));

        const arrayOfRequests = action.messages.map(el => call(dialogsAPI.deleteMessage, el.id));
        const results = yield all(arrayOfRequests);

        let resultCodeFinally: ResultCodesEnum = 0;// определение успеха массива промисов
        for (let i = 0; i < results.length - 1; i++) {
            if (results[i].resultCode === ResultCodesEnum.Error) {
                resultCodeFinally = ResultCodesEnum.Error;
                break
            }
        }
        if (resultCodeFinally === ResultCodesEnum.Success) {
            const data: GetMessagesType = yield call(dialogsAPI.getMessages, action.dialog.id);// обновление массива сообщений
            if (data.error === null) {
                yield put(dialogsAC.setMessages(data.items));
                for (let i = 0; i < action.messages.length; i++) {// добавление сообщений в массив удаленных
                    yield put(dialogsAC.addToDeletedMessages(action.dialog, action.messages[i]))
                }
                yield put(dialogsAC.cleanSelectedMessages()); // очистка массива ид выделенных сообщений
            }
        }
    } catch (e) {
        yield put(appAC.setLanError(true))
    } finally {
        yield put(dialogsAC.setMessagesIsDeleting(false));
    }
}

export function* workerRestoreMessages(action: RestoreMessagesACType): SagaIterator {
    try {
        const arrayOfRequests = action.messages.map(el => call(dialogsAPI.restoreMessage, el.id));
        const results: Array<SendMessageType> = yield all(arrayOfRequests);

        let resultCodeFinally: ResultCodesEnum = 0;
        for (let i = 0; i < results.length - 1; i++) {
            if (results[i].resultCode === ResultCodesEnum.Error) {
                resultCodeFinally = ResultCodesEnum.Error;
                break
            }
        }

        if (resultCodeFinally === ResultCodesEnum.Success) {
            yield put(dialogsAC.cleanSelectedDeletedMessages());// очистка массива выделенных удаленных сообщений
            yield put(dialogsAC.removeFromDeletedMessages(action.messages));// удалить сообщения из массива удаленнных диалогов
        }
    } catch (e) {
        yield put(appAC.setLanError(true))
    }
}

export function* rootSaga(): Generator {
    yield all([
        watcherGetDialogs(),
        watcherSendMessage(),
        watcherGetMessage(),
        watcherDeleteMessage(),
        watcherRestoreMessage()
    ])
}