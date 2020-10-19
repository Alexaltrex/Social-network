import React, {useEffect} from "react";
import {MessageType} from "../../../DAL/dialogs-api";
import CurrentDialogMessageItem from "./CurrentDialogMessageItem";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentDialogsSidebarItem, getDeletedMessages,
    getMessageIsSending,
    getMessagesIsDeleting,
    getMessagesIsLoading
} from "../../../redux/dialogs-selectors";
import CircularPreloader from "../../common/CircularPreloader";
import {dialogsAC} from "../../../redux/dialogs-reducer";
import {DialogsSidebarItemEnum} from "../../../types/types";

//================= CUSTOM HOOK =========================
const useCurrentDialogMessages = ({messages, src, userId}: PropsType) => {
    const classes = useStyles();
    const messagesIsLoading = useSelector(getMessagesIsLoading);
    const messageIsSending = useSelector(getMessageIsSending);
    const messagesIsDeleting = useSelector(getMessagesIsDeleting);
    const deletedMessages = useSelector(getDeletedMessages);
    const currentDialogsSidebarItem = useSelector(getCurrentDialogsSidebarItem);
    const dispatch = useDispatch();

    // очистка массива выделенных сообщений при первой отрисовке или при изменении диалога
    useEffect(() => {
        dispatch(dialogsAC.cleanSelectedMessages())
    }, [userId, dispatch]);

    const elements = messages && messages
        .map(el => <CurrentDialogMessageItem key={el.id} message={el} src={src}/>);

    const deletedMessagesItem = !!userId && deletedMessages
        .find(el => el.dialog.id === +userId)

    const elementsDeleted = deletedMessagesItem && deletedMessagesItem
        .messages
        .map(el => <CurrentDialogMessageItem key={el.id} message={el} src={src}/>);
    // 1
    // сообщение удаляется - messagesIsDeleting
    // показывать messages
    // в удаляемых сообщениях поверх компонента показать CircularPreloader

    // 2
    // сообщение добавляется - messageIsSending
    // messages есть или нет (если первое сообщение)
    // messages есть - показывать messages, messages нет - ничего не показывать

    // 3
    // все сообщения загружаются или перегружаются (при переключении юзера) - messagesIsLoading
    // загружаются - messages нет, перегружаются - messages есть
    // вместо сообщений показывать CircularPreloader

    // 4
    // остальные случаи, когда ничего не загружается - !messagesIsLoading && !messageIsSending && !messagesIsDeleting
    // messages есть (все загрузилось, удалилось, отправилось) или нет (диалог не выбран)
    // messages есть - показывать messages, messages нет - ничего не показывать

    // во время загрузки, отправки и удаления блокировать форму добавления сообщений и боковую панель
    return {classes, messagesIsLoading, messageIsSending, messagesIsDeleting,
        currentDialogsSidebarItem, elements, deletedMessagesItem,
        elementsDeleted}
};

//======================= COMPONENT ===============================
const CurrentDialogMessages: React.FC<PropsType> = ({messages, src, userId}) => {
    const {classes, messagesIsLoading, messageIsSending, messagesIsDeleting,
        currentDialogsSidebarItem, elements, deletedMessagesItem,
        elementsDeleted} = useCurrentDialogMessages({messages, src, userId});

    return (
        <>
            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.all &&
                <>
                    {
                        messagesIsDeleting &&
                        <>
                            {elements}
                        </>
                    }

                    {
                        messageIsSending &&
                        <>
                            {
                                messages
                                    ? <>
                                        {elements}
                                    </>
                                    : null
                            }
                        </>
                    }

                    {
                        messagesIsLoading &&
                        <div className={classes.circularPreloaderWrapper}>
                            <CircularPreloader size={36}/>
                        </div>
                    }

                    {
                        !messagesIsLoading && !messageIsSending && !messagesIsDeleting &&
                        <>
                            {
                                messages
                                    ? <>
                                        {elements}
                                    </>
                                    : null
                            }
                        </>
                    }

                </>
            }

            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted &&
                deletedMessagesItem &&
                <>
                    {elementsDeleted}
                </>
            }
        </>
    )
};

export default CurrentDialogMessages;

//==================== TYPES ==================
type PropsType = {
    messages: Array<MessageType> | null
    src: string | undefined
    userId: number | undefined
}

//========================== STYLES ===================================================
const useStyles = makeStyles({
    circularPreloaderWrapper: {
        margin: '10px 0'
    },
    emptyMessages: {
        padding: '8px 16px'
    }
});