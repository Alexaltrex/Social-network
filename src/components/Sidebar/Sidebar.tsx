import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ChatIcon from '@material-ui/icons/Chat';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import SidebarItem from "./SidebarItem";
import HomeIcon from '@material-ui/icons/Home';
import SettingsIcon from '@material-ui/icons/Settings';

const Sidebar: React.FC = () => {
    const classes = useStyles();

    return (
        <List className={classes.list}>
            <SidebarItem ownIndex={1} to={"/profile"} primary={'My profile'} icon={<HomeIcon/>}/>
            <SidebarItem ownIndex={2} to={"/dialogs"} primary={'Dialogs'} icon={<ChatIcon/>}/>
            <SidebarItem ownIndex={3} to={"/users"} primary={'Users'} icon={<SupervisedUserCircleIcon/>}/>
            <SidebarItem ownIndex={4} to={"/friends"} primary={'Friends'} icon={<AccountCircleIcon/>}/>
            <SidebarItem ownIndex={5} to={"/settings"} primary={'Settings'} icon={<SettingsIcon/>}/>
        </List>
    );
};

export default Sidebar;

//========================== STYLES ================================================
const useStyles = makeStyles({
    list: {
        minWidth: 140
    }
});