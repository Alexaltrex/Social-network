import {Link as RouterLink} from "react-router-dom";
import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles, Theme} from "@material-ui/core/styles";
import clsx from "clsx";
import indigo from "@material-ui/core/colors/indigo";
import {useDispatch, useSelector} from "react-redux";
import {profileAC} from "../../redux/profile-reducer";
import {usersAC} from "../../redux/users-reduser";
import {sidebarAC} from "../../redux/sidebar-reducer";
import {getCurrentSidebarItem} from "../../redux/sidebar-selectors";

const SidebarItem: React.FC<PropsTypes> = (props) => {
    const {to, primary, icon, ownIndex} = props;
    const classes = useStyles();
    const currentSidebarItem = useSelector(getCurrentSidebarItem)
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(ownIndex));
        dispatch(profileAC.setEditMode(false));
        dispatch(usersAC.setShowUsersFrom('all'));
        dispatch(usersAC.setCurrentPage(1));
        dispatch(usersAC.setSearchFriendsParams({term: ''}));
        dispatch(usersAC.setCurrentFriendsSidebarItem(0));
    };


    return (
        <li>
            <ListItem
                onClick={onClick}
                selected={ownIndex === currentSidebarItem}
                button
                component={RouterLink}
                to={to}>
                {
                    icon
                        ? <ListItemIcon className={clsx(ownIndex === currentSidebarItem && classes.icon)}>
                            {icon}
                        </ListItemIcon>
                        : null
                }
                <ListItemText primary={primary} className={clsx(ownIndex === currentSidebarItem && classes.text)}/>
            </ListItem>
        </li>
    )
};

export default SidebarItem;

//============================== TYPES ==================================
type PropsTypes = {
    to: string
    primary: string
    icon?: React.ReactElement
    ownIndex: number
}

//============================== STYLES ===================================
const useStyles = makeStyles((theme: Theme) => ({
    icon: {
        color: indigo[500]
    },
    text: {
        color: indigo[600],
        fontWeight: 900
    }
}));