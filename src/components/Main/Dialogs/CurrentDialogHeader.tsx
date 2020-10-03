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
import {getSelectedMessagesId} from "../../../redux/dialogs-selectors";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import {deleteMessages, dialogsAC} from "../../../redux/dialogs-reducer";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";

const CurrentDialogHeader: React.FC<PropsType> = ({currentDialog, userId, isLoading}) => {
    const classes = useStyles();
    const selectedMessagesId = useSelector(getSelectedMessagesId);
    const src = currentDialog && currentDialog.photos.small ? currentDialog.photos.small : undefined
    const dispatch = useDispatch();

    const onCleanArrayHandler = () => {
        dispatch(dialogsAC.cleanSelectedId())
    }

    const onDeleteHandler = () => {
        if (userId) {
            dispatch(deleteMessages(selectedMessagesId, userId));
        }
    }

    return (
        <div className={classes.headerWrapper}>
            {isLoading
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
                                  to={`/users/${currentDialog.id}`}
                                  variant='subtitle2'>
                                {currentDialog.userName}
                            </Link>

                            {
                                selectedMessagesId.length !== 0 &&
                                <>
                                    <div className={classes.messagesCount}>
                                        <Typography variant='body2' color='textPrimary'>
                                            {selectedMessagesId.length} messages
                                        </Typography>
                                        <IconButton onClick={onCleanArrayHandler} className={classes.iconClean}>
                                            <CloseIcon/>
                                        </IconButton>
                                    </div>

                                    <div>
                                        <Tooltip title="Delete" TransitionComponent={Zoom} arrow={true}>
                                            <IconButton onClick={onDeleteHandler} className={classes.iconClean}>
                                                <DeleteForeverIcon/>
                                            </IconButton>
                                        </Tooltip>

                                    </div>

                                </>
                            }

                        </>
                        : <Typography variant='h6'>
                            Messages
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
    isLoading: boolean
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
        borderBottom: '1px solid #ccc'
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
});