import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import {makeStyles} from '@material-ui/core/styles';
import {Card} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import {PostType, ProfileType} from "../../../types/types";
import BlockTitle from "../../common/BlockTitle";
import {useDispatch} from "react-redux";
import {profileAC} from "../../../redux/profile-reducer";
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

const MyPost: React.FC<PropsType> = ({post, profile}) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);
    //======================================

    const onDeletePostHandle = (e: React.MouseEvent<EventTarget>) => {
        dispatch(profileAC.deletePost(post.id));
        handleClose(e)
    };

    const onLikeHandle = () => {
        dispatch(profileAC.toggleLikeMe(post.id))

    };

    const icon = post.likeMe
        ? <FavoriteIcon className={classes.like}/>
        : <FavoriteBorderIcon/>


    return (
        <div>
            {
                profile &&
                <Card elevation={6} className={classes.card}>
                    <div className={classes.header}>
                        <Avatar className={classes.avatar}
                                src={profile.photos.large ? profile.photos.large : undefined}
                        />
                        <div className={classes.headerInfo}>
                            <Link component={RouterLink} to={'/profile'}>
                                {profile.fullName}
                            </Link>
                            <Typography>
                                {post.time}
                            </Typography>
                        </div>


                        <div>
                            <IconButton
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                            >
                                <KeyboardArrowDownIcon/>
                            </IconButton>
                            <Popper open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                    placement='bottom-end' className={classes.popper}>
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                    >
                                        <Paper className={classes.paper}>
                                            <ClickAwayListener onClickAway={handleClose}>
                                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                                          onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={onDeletePostHandle}>Delete post</MenuItem>
                                                    <MenuItem onClick={handleClose}>Something else</MenuItem>
                                                    <MenuItem onClick={handleClose}>Something else</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>

                    </div>

                    <Typography variant='body1'>
                        {post.message}
                    </Typography>
                    <BlockTitle title=''/>

                    <div className={classes.footer}>
                        <IconButton
                            onClick={onLikeHandle}
                        >
                            {icon}
                        </IconButton>
                        {post.likeCount}
                    </div>

                </Card>
            }
        </div>
    );
}

export default MyPost

//========================== TYPES ==============================================
type PropsType = {
    post: PostType
    profile: ProfileType | null
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
    },
    paper: {
        //marginRight: 10,
        border: '1px solid #ccc'
    },
    card: {
        padding: 15,
        marginTop: 15
    },
    header: {
        display: 'flex',
        marginBottom: 15
    },
    headerInfo: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 15
    },
    popper: {
        zIndex: 1000,
    },
    footer: {
        display: 'flex',
        alignItems: 'center'
    },
    like: {
        color: 'red'
    }
});
