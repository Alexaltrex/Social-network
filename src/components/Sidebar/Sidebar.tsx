import React from 'react';
import {makeStyles, Theme} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import {IconButton} from "@material-ui/core";
import useTheme from "@material-ui/core/styles/useTheme";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from "@material-ui/core/Divider";
import {drawerWidth} from "../../const/const";
import {useDispatch, useSelector} from "react-redux";
import {getSidebarIsOpen} from "../../redux/sidebar-selectors";
import {sidebarAC} from "../../redux/sidebar-reducer";
import indigo from "@material-ui/core/colors/indigo";
import SidebarItem from "./SidebarItem";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

const Sidebar: React.FC = () => {
    const classes = useStyles();
    const theme = useTheme();

    const sidebarIsOpen = useSelector(getSidebarIsOpen);
    const dispatch = useDispatch();

    const handleDrawerClose = () => {
        dispatch(sidebarAC.setSidebarIsOpen(false));
    };

    return (
        <Drawer
            className={classes.drawer}
            classes={{
                root: classes.root,
                paperAnchorDockedLeft: classes.paperAnchorDockedLeft,
                paper: classes.drawerPaper,
            }}
            variant="persistent"
            anchor="left"
            open={sidebarIsOpen}
        >
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon/> : <ChevronRightIcon/>}
                </IconButton>
            </div>
            <Divider/>
            <List>
                <SidebarItem ownIndex={1} to={"/profile"} primary={'My profile'} icon={<HomeIcon/>}/>
                <SidebarItem ownIndex={2} to={"/dialogs"} primary={'Dialogs'} icon={<ChatIcon/>}/>
                <SidebarItem ownIndex={3} to={"/users"} primary={'Users'} icon={<SupervisedUserCircleIcon/>}/>
                <SidebarItem ownIndex={4} to={"/friends"} primary={'Friends'} icon={<AccountCircleIcon/>}/>
                <SidebarItem ownIndex={5} to={"/settings"} primary={'Settings'} icon={<SettingsIcon/>}/>
            </List>
        </Drawer>
    );
};

export default Sidebar;

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    root: {

    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,

    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: indigo[50],
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    paperAnchorDockedLeft: {
        border: 0
    }
}));