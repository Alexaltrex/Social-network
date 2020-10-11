import React from "react";
import {ListSubheader} from "@material-ui/core";
import {DialogType} from "../../../DAL/dialogs-api";
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {Skeleton} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentDialogsSidebarItem,
    getDeletedMessages,
    getDialogsIsLoading, getLoading, getSelectedDeletedMessages, getSelectedMessages,
} from "../../../redux/dialogs-selectors";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {deleteMessages, dialogsAC, restoreMessages, signMessageAsSpam} from "../../../redux/dialogs-reducer";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
//import WarningIcon from '@material-ui/icons/Warning';
import {DialogsSidebarItemEnum} from "../../../types/types";

const CurrentDialogHeader: React.FC<PropsType> = ({currentDialog, userId}) => {
    const classes = useStyles();
    const selectedMessages = useSelector(getSelectedMessages);
    const selectedDeletedMessages = useSelector(getSelectedDeletedMessages);
    const dialogsIsLoading = useSelector(getDialogsIsLoading);
    const loading = useSelector(getLoading);
    const deletedMessages = useSelector(getDeletedMessages);
    const currentDialogsSidebarItem = useSelector(getCurrentDialogsSidebarItem);

    const to = !loading && currentDialog ? `/users/${currentDialog.id}` : '#';
    const deletedMessagesItem = userId && deletedMessages
        .find(el => +el.dialog.id === +userId);
    const currentDeletedDialog = deletedMessagesItem && deletedMessagesItem.dialog;

    let src;
    if (currentDialogsSidebarItem === DialogsSidebarItemEnum.all) {
        src = currentDialog && currentDialog.photos.small ? currentDialog.photos.small : undefined
    } else if (currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted) {
        src = currentDeletedDialog && currentDeletedDialog.photos.small ? currentDeletedDialog.photos.small : undefined
    }

    const dispatch = useDispatch();

    const onCleanArrayHandler = () => {
        if (currentDialogsSidebarItem === DialogsSidebarItemEnum.all) {
            dispatch(dialogsAC.cleanSelectedMessages())
        } else if (currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted) {
            dispatch(dialogsAC.cleanSelectedDeletedMessages())
        }
    };

    const onDeleteHandler = () => {
        if (userId && currentDialog) {
            dispatch(deleteMessages(selectedMessages, currentDialog));
        }
    };

    const onSpamHandler = () => {
        if (userId && currentDialog) {
            dispatch(signMessageAsSpam(selectedMessages, currentDialog));
        }
    };



    const onRestoreHandler = () => {
        if (userId && currentDialog) {
            dispatch(restoreMessages(selectedDeletedMessages));
        }
    };

    return (
        <div className={classes.headerWrapper}>
            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.all &&
                <>
                    {dialogsIsLoading
                        ? <ListSubheader component="div" className={classes.header}>
                            <Skeleton variant="circle" width={40} height={40} className={classes.avatar}/>
                            <Skeleton variant="rect" width={200} height={25}/>
                        </ListSubheader>
                        : <ListSubheader component="div" className={classes.header}>
                            {currentDialog
                                ? <>
                                    <Avatar src={src} className={classes.avatar}/>

                                    <Link component={RouterLink}
                                          className={classes.link}
                                          to={to}
                                          variant='subtitle2'>
                                        {currentDialog.userName}
                                    </Link>

                                    {
                                        selectedMessages.length !== 0 &&
                                        <>
                                            <div className={classes.messagesCount}>
                                                <Typography variant='body2' color='textPrimary'>
                                                    {selectedMessages.length} messages
                                                </Typography>
                                                <IconButton onClick={onCleanArrayHandler}
                                                            className={classes.iconClean}
                                                            disabled={loading}
                                                >
                                                    <CloseIcon/>
                                                </IconButton>
                                            </div>

                                            <div className={classes.iconButtonWrapper}>
                                                <Tooltip title="Delete" TransitionComponent={Zoom} arrow={true}>
                                                    <IconButton onClick={onDeleteHandler}
                                                                className={classes.iconClean}
                                                                disabled={loading}
                                                    >
                                                        <DeleteForeverIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </div>

                                            {/*<div>*/}
                                            {/*    <Tooltip title="Spam" TransitionComponent={Zoom} arrow={true}>*/}
                                            {/*        <IconButton onClick={onSpamHandler}*/}
                                            {/*                    className={classes.iconClean}*/}
                                            {/*                    disabled={loading}*/}
                                            {/*        >*/}
                                            {/*            <WarningIcon/>*/}
                                            {/*        </IconButton>*/}
                                            {/*    </Tooltip>*/}
                                            {/*</div>*/}

                                        </>
                                    }

                                </>
                                : <Typography variant='subtitle1' color='primary'>
                                    Select a dialog
                                </Typography>
                            }
                        </ListSubheader>
                    }
                </>
            }


            {
                currentDialogsSidebarItem === DialogsSidebarItemEnum.deleted &&
                <ListSubheader component="div" className={classes.header}>
                    {
                        userId && currentDeletedDialog
                            ? <>
                                <Avatar src={src} className={classes.avatar}/>

                                <Link component={RouterLink}
                                      className={classes.link}
                                      to={to}
                                      variant='subtitle2'>
                                    {currentDeletedDialog.userName}
                                </Link>

                                {
                                    selectedDeletedMessages.length !== 0 &&
                                    <>
                                        <div className={classes.messagesCount}>
                                            <Typography variant='body2' color='textPrimary'>
                                                {selectedDeletedMessages.length} messages
                                            </Typography>
                                            <IconButton onClick={onCleanArrayHandler}
                                                        className={classes.iconClean}
                                                        disabled={loading}
                                            >
                                                <CloseIcon/>
                                            </IconButton>
                                        </div>

                                        <div className={classes.iconButtonWrapper}>
                                            <Tooltip title="Restore" TransitionComponent={Zoom} arrow={true}>
                                                <IconButton onClick={onRestoreHandler}
                                                            className={classes.iconClean}
                                                            disabled={loading}
                                                >
                                                    <RestoreFromTrashIcon/>
                                                </IconButton>
                                            </Tooltip>
                                        </div>

                                    </>
                                }

                            </>
                            : <Typography variant='subtitle1' color='primary'>
                                Select deleted dialog
                            </Typography>
                    }
                </ListSubheader>
            }
        </div>
    )
};

export default CurrentDialogHeader;

//===================== TYPE =======================
type PropsType = {
    currentDialog: DialogType | null
    userId: number | undefined
}

//===================== STYLE ======================
const useStyles = makeStyles({
    avatar: {
        marginRight: 10
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 50,
    },
    headerWrapper: {
        padding: 5,
        borderBottom: '1px solid #ccc',
        //backgroundColor: indigo[100]
    },
    link: {
        marginRight: 15
    },
    messagesCount: {
        display: 'flex',
        alignItems: 'center',
        marginRight: 30
    },
    iconClean: {
        padding: 5
    },
    iconButtonWrapper: {
        marginRight: 10
    }
});