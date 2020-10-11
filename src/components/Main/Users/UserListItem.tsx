import React from 'react';
import {ListItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import Avatar from "@material-ui/core/Avatar";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgress, getIsFollowing} from "../../../redux/users-selectors";
import {SidebarItemEnum, UserType} from "../../../types/types";
import {getFollow, getUnfollow} from "../../../redux/users-reduser";
import CircularPreloader from "../../common/CircularPreloader";
import SendMessageForm from "../../common/SendMessageForm";
import {DialogType} from "../../../DAL/dialogs-api";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Link from "@material-ui/core/Link";
import {sidebarAC} from "../../../redux/sidebar-reducer";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


const UserListItem: React.FC<PropType> = ({user, dialogs}) => {
    const classes = useStyles();
    const [openSendMessageForm, setOpenSendMessageForm] = React.useState(false);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFollowing = useSelector(getIsFollowing);

    const dispatch = useDispatch();

    const followUnfollowHandle = () => {
        if (user.followed) {
            dispatch(getUnfollow(user.id));
        } else {
            dispatch(getFollow(user.id));
        }
    };

    const onOpenSendMessageFormHandle = () => {
        setOpenSendMessageForm(true)
    };

    const goToUserHandle = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(SidebarItemEnum.users));
    };

    const followLabel = user.followed ? 'UnFollow' : 'Follow';
    const startIcon = user.followed ? <PersonAddDisabledIcon/> : <GroupAddIcon/>;
    const src = ((user && user.photos.small) ? user.photos.small : undefined) as string | undefined;


    return (
        <ListItem className={classes.listItem}>
            <ListItemAvatar>
                <Avatar
                    className={classes.avatar}
                    src={src}
                />
            </ListItemAvatar>
            <div className={classes.text}>
                <Link component={RouterLink} to={`/users/${user.id}`} variant='subtitle2'
                      onClick={goToUserHandle}>
                    <Typography color='textPrimary'>
                        {user.name}
                    </Typography>

                </Link>
                <Link component={RouterLink} to='#' variant='body2' onClick={onOpenSendMessageFormHandle}>
                    Send message
                </Link>
                <div className={classes.buttonWrapper}>
                    <Button className={classes.button}
                            color="primary"
                            size='small'
                            fullWidth
                            disabled={followingInProgress.some(item => item === user.id)}
                            onClick={followUnfollowHandle}
                            startIcon={startIcon}
                    >
                        {followLabel}
                    </Button>

                    {
                        isFollowing
                        && followingInProgress.some(item => item === user.id)
                        &&
                        <CircularPreloader size={20} styleType={'absolute'}/>
                    }

                </div>
            </div>
            <SendMessageForm open={openSendMessageForm}
                             onClose={setOpenSendMessageForm}
                             id={user.id}
                             name={user.name}
                             src={src}
                             dialogs={dialogs}
            />
        </ListItem>
    )
};

export default UserListItem;

//=========================== TYPES =======================================================
type PropType = {
    user: UserType
    dialogs: Array<DialogType> | null
}

//========================== STYLES =============================================================
const useStyles = makeStyles({
    divider: {
        margin: '0 10px'
    },
    listItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 6,
        borderRadius: 6,
        backgroundColor: 'white',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)'
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 15
    },
    text: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start'
    },
    iconButton: {
        marginRight: 0,
        zIndex: 1
    },
    button: {
        textTransform: 'none'
    },
    buttonWrapper: {
        width: '100%',
        position: 'relative',
        marginBottom: 5
    },

    // root: {
    //     width: 150,
    //     padding: 10
    // },
    // media: {
    //     height: 150,
    //     borderRadius: 5
    // },
    // avatar: {
    //     width: 150,
    //     height: 150,
    // },
    // cardContent: {
    //     padding: 5
    // },
    // cardActions: {
    //     padding: 0,
    // },

    // buttons: {
    //     width: '100%',
    //     marginTop: 0
    // },
});