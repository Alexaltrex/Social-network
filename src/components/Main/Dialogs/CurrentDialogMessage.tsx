import {MessageType} from "../../../DAL/dialogs-api";
import {ListItem} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Avatar from "@material-ui/core/Avatar";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import {useDispatch, useSelector} from "react-redux";
import {getId} from "../../../redux/auth-selectors";
import {getProfileSelector} from "../../../redux/profile-selectors";
import Typography from "@material-ui/core/Typography";
import {DATE} from "../../../utilities/date";
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Icon from "@material-ui/core/Icon";
import {dialogsAC} from "../../../redux/dialogs-reducer";
import {getSelectedMessagesId} from "../../../redux/dialogs-selectors";

const CurrentDialogMessage: React.FC<PropsType> = ({message, src}) => {
    const classes = useStyles();
    const [hover, setHover] = useState(false);
    const myId = useSelector(getId);
    const profile = useSelector(getProfileSelector);
    const selectedMessagesId = useSelector(getSelectedMessagesId);
    const dispatch = useDispatch();
    const selected = selectedMessagesId.includes(message.id)
    const onClickHandle = () => {
        if (!selected) {
            dispatch(dialogsAC.addSelectedId(message.id))
        } else {
            dispatch(dialogsAC.removeSelectedId(message.id))
        }
    };
    const onMouseEnterHandler = () => {
        setHover(true)
    };
    const onMouseLeaveHandler = () => {
        setHover(false)
    };
    useEffect(() => {
        dispatch(dialogsAC.cleanSelectedId())
    }, [message]);

    const srcFinally = (profile
        ? (message.senderId === myId) ? profile.photos.small : src
        : undefined) as string | undefined

    const to = (message.senderId === myId) ? '/profile' : `/users/${message.senderId}`;

    const icon = message.senderId === myId ? <ArrowForwardIcon/> : <ArrowBackIcon/>

    return (
        <ListItem button
                  onClick={onClickHandle}
                  selected={selected}
                  className={classes.listItem}
                  classes={{
                      selected: classes.selected
                  }}
                  onMouseEnter={onMouseEnterHandler}
                  onMouseLeave={onMouseLeaveHandler}
        >
            {((hover && !selected) || selected) && <CheckCircleIcon className={classes.checkedIcon}
                                                                  color={selected ? 'inherit' : 'disabled'}
                                                                  fontSize='small'/>}
            <Avatar src={srcFinally} className={classes.avatar}/>
            <div className={classes.messageBlock}>
                <div className={classes.title}>
                    <Link component={RouterLink}
                          className={classes.link}
                          to={to}
                          variant='subtitle2'>
                        {message.senderName}
                    </Link>
                    <Typography variant='subtitle2'
                                color='textSecondary'
                    >
                        {DATE.dateTranslateFromAPI(message.addedAt)}
                    </Typography>
                </div>
                <div>{message.body}</div>
            </div>

            <Icon className={classes.icon}>{icon}</Icon>


        </ListItem>
    )
};

export default CurrentDialogMessage;

//========================== TYPE ============================
type PropsType = {
    message: MessageType
    src: string | undefined
}
//========================= STYLES ===========================
const useStyles = makeStyles({
    listItem: {
        boxSizing: 'border-box',
        margin: '2px 0px',
        padding: 8,
        paddingLeft: 40,
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-start'
    },
    checkedIcon: {
        position: 'absolute',
        top: '50%',
        left: 5,
        transform: 'translate(0, -50%)'
    },
    selected: {
        backgroundColor: 'red'
    },
    avatar: {
        marginRight: 10
    },
    title: {
        display: 'flex'
    },
    link: {
        marginRight: 10
    },
    messageBlock: {
        flexGrow: 1
    },
    icon: {
        marginRight: 10
    }
});