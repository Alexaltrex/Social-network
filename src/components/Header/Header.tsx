import React, {useEffect} from 'react';
import {drawerWidth} from "../../const/const";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AppBar} from "@material-ui/core";
import clsx from "clsx";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import Popper from "@material-ui/core/Popper";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import SettingsIcon from '@material-ui/icons/Settings';
import ListItemText from "@material-ui/core/ListItemText";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {useDispatch, useSelector} from "react-redux";
import {getId, getIsAuth, getLogin} from "../../redux/auth-selectors";
import {getSidebarIsOpen} from "../../redux/sidebar-selectors";
import {getProfileSelector} from "../../redux/profile-selectors";
import {logout} from "../../redux/auth-reducer";
import {sidebarAC} from "../../redux/sidebar-reducer";
import {getProfile} from "../../redux/profile-reducer";
import HeaderSearch from "./HeaderSearch";

const Header: React.FC = () => {
    const classes = useStyles();
    const classes2 = useStyles2();
    const isAuth = useSelector(getIsAuth);
    const sidebarIsOpen = useSelector(getSidebarIsOpen);
    const login = useSelector(getLogin);
    const profile = useSelector(getProfileSelector);
    const id = useSelector(getId);
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(getProfile(id))
        }
    }, [id]);

    const handleDrawerOpen = () => {
        dispatch(sidebarAC.setSidebarIsOpen(true));
    };

    //===================================================================================
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
    //=========================================================================
    const onSettingsClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event)
    };
    const onLogoutClick = (event: React.MouseEvent<EventTarget>) => {
        handleClose(event);
        dispatch(logout());
    }
    //==================================================================================


    return (
        <AppBar
            position="fixed"
            classes={{
                root: classes2.paper
            }}
            className={clsx(classes.appBar, {
                [classes.appBarShift]: sidebarIsOpen,
            })}

        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, sidebarIsOpen && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" noWrap className={classes.logo}>
                    Social Network
                </Typography>

                <HeaderSearch/>

                {
                    isAuth
                        ? <>
                            <Button
                                ref={anchorRef}
                                aria-controls={open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={handleToggle}
                                classes={{
                                    root: classes.button,
                                    label: classes.label
                                }}
                                color="inherit">
                                <Typography variant="subtitle1" noWrap className={classes.login}>
                                    {login}
                                </Typography>
                                {profile && profile.photos.small
                                    ? <Avatar src={profile.photos.small} className={classes.avatar}/>
                                    : <Avatar className={classes.avatar}/>}
                                <ExpandMoreIcon/>
                            </Button>
                            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                {({TransitionProps, placement}) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                                    >
                                        <Paper>
                                            <ClickAwayListener onClickAway={handleClose}>

                                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                                          onKeyDown={handleListKeyDown}>
                                                    <MenuItem onClick={onSettingsClick}>
                                                        <ListItemIcon>
                                                            <SettingsIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Settings"/>
                                                    </MenuItem>
                                                    <MenuItem onClick={onLogoutClick}>
                                                        <ListItemIcon>
                                                            <ExitToAppIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary="Logout"/>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </>
                        : <Button color="inherit" component={RouterLink} to='/login'>
                            Войти
                        </Button>
                }

            </Toolbar>
        </AppBar>
    );
};

export default Header;

//================================ STYLES =======================================
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            //backgroundColor: 'darkRed'
        },
        appBarShift: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        hide: {
            display: 'none',
        },
        logo: {
            flexGrow: 1
        },
        login: {
            marginRight: 10
        },
        button: {
            '&:hover': {
                backgroundColor: 'rgba(0,0,0,0.3)',
                borderRadius: 0,
                minHeight: 64
            },
            textTransform: 'none',
            paddingTop: 0,
            paddingBottom: 0
        },
        label: {
            minHeight: 64
        },
        avatar: {
            width: 50,
            height: 50,
            marginRight: 10
        },


    }),
);

const useStyles2 = makeStyles({
    paper: {
        //backgroundColor: 'green'
    }
});
