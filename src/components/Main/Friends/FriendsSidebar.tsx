import React, {useEffect} from "react";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import indigo from "@material-ui/core/colors/indigo";
import SearchIcon from '@material-ui/icons/Search';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tab from "@material-ui/core/Tab";
import GroupIcon from '@material-ui/icons/Group';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFriendsSidebarItem} from "../../../redux/users-selectors";
import {usersAC} from "../../../redux/users-reduser";


const FriendsSidebar = () => {
    const classes = useStyles();
    const currentFriendsSidebarItem = useSelector(getCurrentFriendsSidebarItem);
    const dispatch = useDispatch();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        dispatch(usersAC.setCurrentFriendsSidebarItem(newValue));
    };

    return (
        <Card className={classes.card} elevation={6}>
            <Tabs
                classes={{
                    indicator: classes.indicator
                }}
                orientation="vertical"
                value={currentFriendsSidebarItem}
                onChange={handleChange}
                className={classes.tabs}
            >

                <Tab label="Friends" icon={<GroupIcon className={classes.icon}/>} classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                    root: classes.tabRoot,
                    labelIcon: classes.labelIcon
                }}/>

                <Tab label="Request for friendship" icon={<PersonAddIcon className={classes.icon}/>} classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                    root: classes.tabRoot,
                    labelIcon: classes.labelIcon
                }}/>

                <Tab label="Something else" icon={<HelpOutlineIcon className={classes.icon}/>} classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                    root: classes.tabRoot,
                    labelIcon: classes.labelIcon
                }}/>

                <Tab label="Something else" icon={<HelpOutlineIcon className={classes.icon}/>} classes={{
                    wrapper: classes.wrapper,
                    selected: classes.selected,
                    root: classes.tabRoot,
                    labelIcon: classes.labelIcon
                }}/>


            </Tabs>
        </Card>
    )
};

export default FriendsSidebar;

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
        padding: 5,
    },
    tabs: {
        borderLeft: `3px solid #ccc`,
    },
    indicator: {
        width: 2,
        left: 0,
        right: 'auto'
    },
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        textTransform: 'none'
    },
    icon: {
        marginRight: 15,
        marginLeft: 15
    },
    selected: {
        color: indigo[500],
        backgroundColor: '#eee'
    },
    tabRoot: {
        padding: 0
    },
    labelIcon: {
        minHeight: 50
    }
});