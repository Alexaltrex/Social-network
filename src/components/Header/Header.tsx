import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import {Link as RouterLink} from 'react-router-dom';
import Avatar from "@material-ui/core/Avatar";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
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
import {getId, getIsAuth, getLogin} from "../../redux/selectors/auth-selectors";
import {getProfileSelector} from "../../redux/selectors/profile-selectors";
import {logout} from "../../redux/auth-reducer";
import {getProfile} from "../../redux/profile-reducer";
import HeaderSearch from "./HeaderSearch";
import {getTheme} from "../../redux/selectors/settings-selectors";
import HeaderLang from "./HeaderLang";
import {getLang} from "../../redux/selectors/app-selectors";
import {translate} from "../../const/lang";

//================= CUSTOM HOOK =========================
const useHeader = () => {
    const classes = useStyles();
    const isAuth = useSelector(getIsAuth);
    const login = useSelector(getLogin);
    const profile = useSelector(getProfileSelector);
    const id = useSelector(getId);
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(getProfile(id))
        }
    }, [id, dispatch]);
    //===================================================================================
    const [open, setOpen] = useState(false);
    const icon = open ? <ExpandLessIcon className={classes.icon}/> : <ExpandMoreIcon className={classes.icon}/>
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
    useEffect(() => {
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
    const theme = useSelector(getTheme);
    const useStylesSettings = makeStyles({
        wrapper: {
            backgroundColor: theme.menuBackgroundColor,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10
        }
    });
    const classesSettings = useStylesSettings();
    const lang = useSelector(getLang);
    const logo = translate(lang, 'Social Network');
    const settingsLabel = translate(lang, 'Settings');
    const logoutLabel = translate(lang, 'Logout');
    const loginLabel = translate(lang, 'Login')

    return {
        classes, isAuth, login, profile, open, icon, anchorRef,
        handleToggle, handleClose, handleListKeyDown, onSettingsClick,
        onLogoutClick, classesSettings, logo, settingsLabel,
        logoutLabel, loginLabel
    }
};

//======================= COMPONENT ===============================
const Header: React.FC = () => {
    const {
        classes, isAuth, login, profile, open, icon, anchorRef,
        handleToggle, handleClose, handleListKeyDown, onSettingsClick,
        onLogoutClick, classesSettings, logo, settingsLabel,
        logoutLabel, loginLabel
    } = useHeader();

    return (
        <div className={classesSettings.wrapper}>
            <Toolbar className={classes.toolBar}>
                <Typography variant="h6" noWrap className={classes.logo}>
                    {logo}
                </Typography>

                <HeaderSearch/>

                <HeaderLang/>

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
                                {icon}
                            </Button>
                            <Popper open={open}
                                    className={classes.popper}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
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
                                                    <MenuItem onClick={onLogoutClick}>
                                                        <ListItemIcon>
                                                            <ExitToAppIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={logoutLabel}/>
                                                    </MenuItem>
                                                    <MenuItem onClick={onSettingsClick}
                                                              component={RouterLink}
                                                              to='/settings'
                                                    >
                                                        <ListItemIcon>
                                                            <SettingsIcon/>
                                                        </ListItemIcon>
                                                        <ListItemText primary={settingsLabel}/>
                                                    </MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </>
                        : <Button color="inherit"
                                  className={classes.login}
                                  component={RouterLink}
                                  to='/login'>
                            {loginLabel}
                        </Button>
                }

            </Toolbar>
        </div>

    );
};

export default Header;

//================================ STYLES =======================================
const useStyles = makeStyles({
    wrapper: {},
    toolBar: {
        maxWidth: 1000,
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
        padding: '0 0 0 10px',
    },
    logo: {
        flexGrow: 1,
        color: 'white'
    },
    login: {
        color: 'white'
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
        margin: '0 10px'
    },
    icon: {
        color: 'white'
    },
    popper: {
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)'
    }
});


