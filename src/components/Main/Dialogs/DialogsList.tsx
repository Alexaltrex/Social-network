import {makeStyles} from "@material-ui/core/styles";
import {Card} from "@material-ui/core";
import React from "react";
import {DialogType} from "../../../DAL/dialogs-api";
import List from "@material-ui/core/List";
import DialogsListItem from "./DialogsListItem";
import {Skeleton} from "@material-ui/lab";
import {useSelector} from "react-redux";
import {
    getCurrentDialogsSidebarItem,
    getDeletedMessages,
    getDialogsIsLoading,
    getSpamMessages
} from "../../../redux/dialogs-selectors";
import Typography from "@material-ui/core/Typography";
import {DialogsSidebarItemEnum} from "../../../types/types";
import {translate} from "../../../const/lang";
import {getLang} from "../../../redux/app-selectors";

//================= CUSTOM HOOK =========================
const useSkeletonListItem = () => {
    const classes = useStyles();
    return {classes}
}

//======================= COMPONENT ===============================
const SkeletonListItem = () => {
    const {classes} = useSkeletonListItem();
    return (
        <div className={classes.skeletonWrapper}>
            <Skeleton variant="circle" width={40} height={40} className={classes.avatar}/>
            <Skeleton variant="rect" width={200} height={45}/>
        </div>
    )
};

//================= CUSTOM HOOK =========================
const useDialogsList = ({dialogs}: PropsType) => {
    const classes = useStyles();
    const dialogsIsLoading = useSelector(getDialogsIsLoading);
    const currentDialogsSidebarItem = useSelector(getCurrentDialogsSidebarItem);
    const deletedMessages = useSelector(getDeletedMessages);
    const spamMessages = useSelector(getSpamMessages);
    const lang = useSelector(getLang);
    const dialogsElements = dialogs && dialogs
        .map(item => <DialogsListItem key={item.id}
                                      dialog={item}/>);
    const dialogsDeletedElements = deletedMessages
        .map(item => <DialogsListItem key={item.dialog.id}
                                      dialog={item.dialog}/>);
    const dialogsSpamElements = spamMessages
        .map(item => <DialogsListItem key={item.dialog.id}
                                      dialog={item.dialog}/>);
    const skeletonElements = [] as Array<React.ReactElement>;
    for (let i = 0; i < 9; i++) {
        skeletonElements.push(<SkeletonListItem key={i}/>)
    }
    const thereAreNoDeletedDialogs = translate(lang, 'There are no deleted dialogs')

    return {classes, dialogsIsLoading, currentDialogsSidebarItem,
        deletedMessages, spamMessages, dialogsElements,
        dialogsDeletedElements, dialogsSpamElements, skeletonElements,
        thereAreNoDeletedDialogs
    }
};

//======================= COMPONENT ===============================
const DialogsList: React.FC<PropsType> = ({dialogs}) => {
    const {classes, dialogsIsLoading, currentDialogsSidebarItem,
        deletedMessages, spamMessages, dialogsElements,
        dialogsDeletedElements, dialogsSpamElements, skeletonElements,
        thereAreNoDeletedDialogs
    } = useDialogsList({dialogs});

    return (
        <Card className={classes.card} elevation={6}>
            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.all &&
                <>
                    {dialogsIsLoading
                        ? <div>
                            {skeletonElements}
                        </div>
                        : <List disablePadding>
                            {dialogsElements}
                        </List>
                    }
                </>
            }

            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted &&
                <>
                    {deletedMessages.length === 0
                        ? <div className={classes.emptyDialogs}>
                            <Typography variant='subtitle1' color='primary'>
                                {thereAreNoDeletedDialogs}
                            </Typography>

                        </div>
                        : <List disablePadding>
                            {dialogsDeletedElements}
                        </List>
                    }
                </>
            }

            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.spam &&
                <>
                    {spamMessages.length === 0
                        ? <div className={classes.emptyDialogs}>
                            <Typography variant='subtitle1' color='primary'>
                                There are no spam dialogs
                            </Typography>

                        </div>
                        : <List disablePadding>
                            {dialogsSpamElements}
                        </List>
                    }
                </>
            }

        </Card>
    )
};

export default DialogsList;

//============================ TYPE ================================================
type PropsType = {
    dialogs: null | Array<DialogType>
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {},
    avatar: {
        marginRight: 10
    },
    btnWrapper: {
        marginBottom: 10
    },
    skeletonWrapper: {
        padding: '0 16px',
        height: 72,
        display: 'flex',
        alignItems: 'center'
    },
    emptyDialogs: {
        padding: '8px 16px'
    }
});