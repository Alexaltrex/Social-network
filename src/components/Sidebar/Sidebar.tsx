import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SidebarItem from "./SidebarItem";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';
import {getLang} from "../../redux/app-selectors";
import { useSelector } from 'react-redux';
import {Lang} from "../../const/lang";

//======================== CUSTOM HOOK =========================
const useSidebar = () => {
    const classes = useStyles();
    const lang = useSelector(getLang);
    const profileLabel = lang === 'rus' ? Lang['My profile'].rus : Lang['My profile'].eng;
    const profileDialogs = lang === 'rus' ? Lang['Dialogs'].rus : Lang['Dialogs'].eng;
    const profileUsers = lang === 'rus' ? Lang['Users'].rus : Lang['Users'].eng;
    const profileFriends = lang === 'rus' ? Lang['Friends'].rus : Lang['Friends'].eng;
    const profileSettings = lang === 'rus' ? Lang['Settings'].rus : Lang['Settings'].eng;
    return {
        classes, profileLabel, profileDialogs,
        profileUsers, profileFriends, profileSettings
    }
};

//======================= COMPONENT ===============================
const Sidebar: React.FC = () => {
    const {
        classes, profileLabel, profileDialogs,
        profileUsers, profileFriends, profileSettings
    } = useSidebar();

    return (
        <List className={classes.list}>
            <SidebarItem ownIndex={1} to={"/profile"} primary={profileLabel} icon={<HomeIcon/>}/>
            <SidebarItem ownIndex={2} to={"/dialogs"} primary={profileDialogs} icon={<ChatIcon/>}/>
            <SidebarItem ownIndex={3} to={"/users"} primary={profileUsers} icon={<SupervisedUserCircleIcon/>}/>
            <SidebarItem ownIndex={4} to={"/friends"} primary={profileFriends} icon={<AccountCircleIcon/>}/>
            <SidebarItem ownIndex={5} to={"/settings"} primary={profileSettings} icon={<SettingsIcon/>}/>
        </List>
    );
};

export default Sidebar;

//========================== STYLES ================================================
const useStyles = makeStyles({
    list: {
        flexBasis: 160,
        flexShrink: 0,
        padding: '10px 0'
    }
});