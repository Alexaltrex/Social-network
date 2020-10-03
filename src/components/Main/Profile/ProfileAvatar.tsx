import React, {ChangeEvent, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {profileAC, savePhoto} from "../../../redux/profile-reducer";
import {
    getAvatarIsLoading,
    getEditMode,
} from "../../../redux/profile-selectors";
import Avatar from '@material-ui/core/Avatar';
import {makeStyles} from "@material-ui/core/styles";
import {Card, CircularProgress} from "@material-ui/core";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Fade from "@material-ui/core/Fade";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import {getFollowingInProgress, getIsFollowing} from "../../../redux/users-selectors";
import {getFollow, getUnfollow} from "../../../redux/users-reduser";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import {ProfileType} from "../../../types/types";
import CircularPreloader from "../../common/CircularPreloader";
import SendIcon from '@material-ui/icons/Send';
import SendMessageForm from "../../common/SendMessageForm";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";
import {getDialogs} from "../../../redux/dialogs-reducer";

const ProfileAvatar: React.FC<PropsType> = (props) => {
    const {isOwner, userId, profile, followed} = props;
    const classes = useStyles();
    const [onAvatarHover, setOnAvatarHover] = useState(false);
    const [openSendMessageForm, setOpenSendMessageForm] = React.useState(false);
    const avatarIsLoading = useSelector(getAvatarIsLoading);
    const isFollowing = useSelector(getIsFollowing);
    const editMode = useSelector(getEditMode);
    const followingInProgress = useSelector(getFollowingInProgress);
    const dialogs = useSelector(getDialogsSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!isOwner) {
            //dispatch(getFollowed(userId));
        }
    }, [userId]);

    useEffect(() => {
        dispatch(getDialogs());
    }, []);

    const onPhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (e.target.files.length) {
                dispatch(savePhoto(e.target.files[0]));
            }
        }
    };

    const onAvatarDelete = () => {
        dispatch(profileAC.setPhotos({small: null, large: null}));
    };

    const onMouseAvatarEnter = () => {
        setOnAvatarHover(true)
    };

    const onMouseAvatarLeave = () => {
        setOnAvatarHover(false)
    };

    const onEditProfileClick = () => {
        dispatch(profileAC.setEditMode(true));
    };

    const onFollowUnfollowClick = () => {
        if (followed) {
            dispatch(getUnfollow(userId));
            dispatch(profileAC.setFollowed(false));
        } else {
            dispatch(getFollow(userId));
            dispatch(profileAC.setFollowed(true));
        }
    };

    const onOpenSendMessageFormHandle = () => {
        setOpenSendMessageForm(true)
    };

    const buttonLabel = followed ? 'unfollow' : 'follow';
    const startIcon = followed ? <PersonAddDisabledIcon/> : <GroupAddIcon/>;
    const src = ((profile && profile.photos.small) ? profile.photos.small : undefined) as string | undefined;

    return (
        <>
            {profile &&
            <Card className={classes.card} elevation={6}>
                <CardMedia>
                    <div className={classes.avatarWrapper}>
                        {!avatarIsLoading
                            ? <Avatar className={classes.avatar}
                                      onMouseEnter={onMouseAvatarEnter}
                                      onMouseLeave={onMouseAvatarLeave}
                                      src={profile.photos.large ? profile.photos.large : undefined}
                                      variant="rounded"/>
                            : <div className={classes.circular}>
                                <CircularProgress size={100} color={'secondary'}/>
                            </div>
                        }
                        {isOwner && profile.photos &&
                        <Fade in={onAvatarHover} timeout={100}>
                            <Tooltip title="Delete avatar" placement="bottom-start">
                                <div className={classes.avatarButtonUpperPanel}>
                                    <IconButton disableFocusRipple={true}
                                                disableRipple={true}
                                                onMouseEnter={onMouseAvatarEnter}
                                                onMouseLeave={onMouseAvatarLeave}
                                                onClick={onAvatarDelete}
                                                size='small'
                                                aria-label="delete avatar">
                                        <HighlightOffIcon className={classes.avatarIconDelete}/>
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </Fade>}

                        {isOwner && <Fade in={onAvatarHover} timeout={100}>
                            <div className={classes.avatarBottomPanel}
                                 onMouseEnter={onMouseAvatarEnter}
                                 onMouseLeave={onMouseAvatarLeave}>
                                <input
                                    accept="image/*"
                                    onChange={onPhotoSelected}
                                    className={classes.input}
                                    id="12345"
                                    multiple
                                    type="file"
                                />
                                <label htmlFor="12345">
                                    <IconButton className={classes.buttonIcon}
                                                size='small'
                                                aria-label="upload picture"
                                                component="span">
                                        <PhotoCamera className={classes.buttonIconInner}/>
                                        <Typography variant='body2'>
                                            Change photo
                                        </Typography>
                                    </IconButton>
                                </label>
                            </div>
                        </Fade>}

                    </div>
                </CardMedia>


                <CardActions className={classes.cardActions}>
                    {isOwner
                        ? <div className={classes.buttons}>
                            <Button variant='outlined'
                                    color="primary"
                                    onClick={onEditProfileClick}
                                    disableElevation
                                    disabled={editMode}
                                    size='small'
                                    fullWidth={true}
                                    className={classes.button}>
                                Edit profile
                            </Button>
                        </div>
                        : <div className={classes.buttons}>

                            {followed !== null &&
                            <div className={classes.buttonWrapper}>
                                <Button
                                    className={classes.button}
                                    variant='outlined'
                                    color="primary"
                                    size='small'
                                    fullWidth
                                    disabled={followingInProgress.some(item => item === userId)}
                                    onClick={onFollowUnfollowClick}
                                    startIcon={startIcon}
                                >
                                    {buttonLabel}
                                </Button>
                                {
                                    isFollowing
                                    && followingInProgress.some(item => item === userId)
                                    &&
                                    <CircularPreloader size={20} style={'absolute'}/>
                                }
                            </div>
                            }

                            <div className={classes.buttonWrapper}>
                                <Button
                                    className={classes.button}
                                    variant='outlined'
                                    color="primary"
                                    size='small'
                                    fullWidth
                                    onClick={onOpenSendMessageFormHandle}
                                    startIcon={<SendIcon/>}
                                >
                                    Send message
                                </Button>
                            </div>

                            <SendMessageForm open={openSendMessageForm}
                                             onClose={setOpenSendMessageForm}
                                             id={profile.userId}
                                             name={profile.fullName}
                                             src={src}
                                             dialogs={dialogs}
                            />


                        </div>

                    }
                </CardActions>


            </Card>
            }
        </>
    )
};

export default ProfileAvatar;

//========================== TYPES =================================================
type PropsType = {
    isOwner: boolean
    userId: number
    profile: ProfileType
    followed: boolean | null
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    avatar: {
        width: 200,
        height: 200,
    },
    card: {
        padding: 15,
        paddingBottom: 10,
        marginBottom: 15
    },
    avatarWrapper: {
        position: 'relative',
        overflow: 'hidden'
    },
    avatarButtonUpperPanel: {
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '0 4px 0 4px'
    },
    avatarBottomPanel: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: '0 0 4px 4px'
    },
    changePhotoButton: {
        color: 'white',
    },
    buttonIcon: {
        color: 'white',
        paddingLeft: 10,
        marginRight: 10
    },
    buttonIconInner: {
        marginRight: 10
    },
    input: {
        display: 'none',
    },
    avatarIconDelete: {
        color: 'white'
    },
    circular: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 200,
    },
    buttons: {
        width: '100%',
        marginTop: 10
    },
    button: {
        textTransform: 'none',
    },
    buttonWrapper: {
        width: '100%',
        position: 'relative',
        marginBottom: 5
    },
    cardActions: {
        padding: 0
    }
});



