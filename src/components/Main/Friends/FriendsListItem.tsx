import React, {useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {SidebarItemEnum, UserType} from "../../../types/types";
import {ListItem} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import {Link as RouterLink} from "react-router-dom";
import Link from "@material-ui/core/Link";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {useDispatch, useSelector} from "react-redux";
import {sidebarAC} from "../../../redux/sidebar-reducer";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import {usersAC} from "../../../redux/users-reduser";
import {getFollowingInProgress, getIsFollowing} from "../../../redux/users-selectors";
import CircularPreloader from "../../common/CircularPreloader";
import SendMessageForm from "../../common/SendMessageForm";
import {DialogType} from "../../../DAL/dialogs-api";
import {getLang} from "../../../redux/app-selectors";
import {translate} from "../../../const/lang";

const FriendsListItem: React.FC<PropsTypes> = ({friend, dialogs}) => {
    const classes = useStyles();
    const [openSendMessageForm, setOpenSendMessageForm] = React.useState(false);
    const dispatch = useDispatch();
    const followingInProgress = useSelector(getFollowingInProgress);
    const isFollowing = useSelector(getIsFollowing);
    const lang = useSelector(getLang);

    const onListItemClick = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(SidebarItemEnum.users));
    };

    const onOpenSendMessageFormHandle = (event: React.SyntheticEvent) => {
        event.preventDefault();
        setOpenSendMessageForm(true)
    };

    const src = (friend ? friend.photos.small : undefined) as string | undefined;

    //========================= popper ========================================
    const [open, setOpen] = useState(false);
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
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        prevOpen.current = open;
    }, [open]);

    //============================== IconButton ===================================================
    const removeHandle = () => {
        dispatch(usersAC.setNeedToChangeListOfFriends(true, friend.id))
    };
    const somethingElseHandle = () => {};

    const labels = [
        translate(lang, 'Remove from friends'),
        translate(lang, 'Something else'),
        translate(lang, 'Something else')
    ];
    const callbacks = [removeHandle, somethingElseHandle, somethingElseHandle]
    const menuItemsElements = labels.map((el, i) => {
        const onClickHandle = (event: React.MouseEvent<EventTarget>) => {
            handleClose(event);
            callbacks[i]();
        };
        return (
            <MenuItem key={i}
                      onClick={onClickHandle}
            >
                {labels[i]}
            </MenuItem>
        )
    });
    //===================================================================================

    return (
        <>
            <Divider className={classes.divider}/>
            <ListItem className={classes.listItem}>
                <div className={classes.listItemInner}>
                    <div className={classes.listItemInnerleft}>
                        <ListItemAvatar>
                            <Avatar
                                className={classes.avatar}
                                src={friend.photos.large ? friend.photos.large : undefined}
                            />
                        </ListItemAvatar>
                        <div className={classes.text}>
                            <Link component={RouterLink} to={`/users/${friend.id}`} variant='subtitle2' onClick={onListItemClick}>
                                {friend.name}
                            </Link>
                            <Link component={RouterLink} to='#' variant='body2' onClick={onOpenSendMessageFormHandle}>
                                {translate(lang, 'Send message')}
                            </Link>
                        </div>
                        <SendMessageForm open={openSendMessageForm}
                                         onClose={setOpenSendMessageForm}
                                         id={friend.id}
                                         name={friend.name}
                                         src={src}
                                         dialogs={dialogs}
                        />

                    </div>
                    {/*<IconButtonWithPopper*/}
                    {/*    icon={<MoreVertIcon/>}*/}
                    {/*    classes={classesPopper}*/}
                    {/*    labels={labels}*/}
                    {/*    callbacks={callbacks}*/}
                    {/*/>*/}

                    <div>
                        <IconButton ref={anchorRef}
                                    aria-controls={open ? 'menu-list-grow' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                    edge="end"
                                    aria-label="delete"
                                    className={classes.iconButton}>
                            <MoreVertIcon/>
                        </IconButton>
                        <Popper className={classes.popper}
                                open={open}
                                anchorEl={anchorRef.current}
                                role={undefined}
                                transition
                                placement='bottom-end'
                                disablePortal>
                            {({TransitionProps, placement}) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleClose}>
                                            <MenuList autoFocusItem={open} id="menu-list-grow"
                                                      onKeyDown={handleListKeyDown}>
                                                {menuItemsElements}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </div>
                </div>
                {
                    isFollowing && followingInProgress.some(item => item === friend.id)
                    && <CircularPreloader size={80} styleType={'absolute'}/>
                }
            </ListItem>
        </>
    )
};

export default FriendsListItem;

//========================== TYPES =============================================
type PropsTypes = {
    friend: UserType
    dialogs: Array<DialogType> | null
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    avatar: {
        width: 80,
        height: 80,
        marginRight: 15
    },

    iconButton: {
        marginRight: 0,
        zIndex: 1
    },
    divider: {
        margin: '0 10px'
    },
    popper: {
        zIndex: 1000
    },
    listItemInner: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemInnerleft: {
        display: 'flex',
        alignItems: 'center',
        flexGrow: 1
    },
    listItem: {
        position: 'relative'
    },
    text: {
        display: 'flex',
        flexDirection: 'column'
    }

});

// const useStylesPopper = makeStyles({
//     iconButton: {
//         marginRight: 0,
//         //zIndex: 1
//     },
//     popper: {
//         //zIndex: 1000
//     },
// });