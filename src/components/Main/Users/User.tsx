import React, {useEffect} from 'react';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Link as RouterLink} from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {useDispatch, useSelector} from "react-redux";
import {getFollowingInProgress, getIsFollowing} from "../../../redux/users-selectors";
import {UserType} from "../../../types/types";
import {getFollow, getUnfollow} from "../../../redux/users-reduser";
import CircularPreloader from "../../common/CircularPreloader";
import SendIcon from "@material-ui/core/SvgIcon/SvgIcon";
import SendMessageForm from "../../common/SendMessageForm";
import {getDialogs} from "../../../redux/dialogs-reducer";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";
import {DialogType} from "../../../DAL/dialogs-api";

const User: React.FC<PropType> = ({user, dialogs}) => {
    const classes = useStyles();
    const [openSendMessageForm, setOpenSendMessageForm] = React.useState(false);
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFollowing = useSelector(getIsFollowing);

    const dispatch = useDispatch();

    const onFollowUnfollowClick = () => {
        if (user.followed) {
            dispatch(getUnfollow(user.id));
        } else {
            dispatch(getFollow(user.id));
        }
    };

    const onOpenSendMessageFormHandle = () => {
        setOpenSendMessageForm(true)
    };

    const buttonLabel = user.followed ? 'UnFollow' : 'Follow';
    const startIcon = user.followed ? <PersonAddDisabledIcon/> : <GroupAddIcon/>;
    const src = ((user && user.photos.small) ? user.photos.small : undefined) as string | undefined;

    return (
        <Grid item>
            <Card elevation={6} className={classes.root}>
                <CardActionArea component={RouterLink}
                                to={`/users/${user.id}`}>
                    <Avatar className={classes.avatar}
                            src={src ? src : undefined}
                            variant="rounded"/>
                </CardActionArea>
                <CardContent className={classes.cardContent}>
                    <Typography color='primary'
                                variant='subtitle2'
                                align='center'>
                        {user.name}
                    </Typography>
                    <Typography //color='primary'
                        variant='body2'
                        align='center'>
                        {user.status}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing className={classes.cardActions}>

                    <div className={classes.buttons}>
                        <div className={classes.buttonWrapper}>
                            <Button className={classes.button}
                                    variant="outlined"
                                    color="primary"
                                    size='small'
                                    fullWidth
                                    disabled={followingInProgress.some(item => item === user.id)}
                                    onClick={onFollowUnfollowClick}
                                    startIcon={startIcon}
                            >
                                {buttonLabel}
                            </Button>

                            {
                                isFollowing
                                && followingInProgress.some(item => item === user.id)
                                &&
                                <CircularPreloader size={20} style={'absolute'}/>
                            }

                        </div>

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
                                         id={user.id}
                                         name={user.name}
                                         src={src}
                                         dialogs={dialogs}
                        />

                    </div>
                </CardActions>

            </Card>
        </Grid>
    )
};

export default User;

//=========================== TYPES =======================================================
type PropType = {
    user: UserType
    dialogs: Array<DialogType> | null
}

//========================== STYLES =============================================================
const useStyles = makeStyles({
    root: {
        width: 150,
        padding: 10
    },
    media: {
        height: 150,
        borderRadius: 5
    },
    avatar: {
        width: 150,
        height: 150,
    },
    cardContent: {
        padding: 5
    },
    cardActions: {
        padding: 0,
    },
    button: {
        textTransform: 'none'
    },
    buttonWrapper: {
        width: '100%',
        position: 'relative',
        marginBottom: 5
    },
    buttons: {
        width: '100%',
        marginTop: 0
    },
});