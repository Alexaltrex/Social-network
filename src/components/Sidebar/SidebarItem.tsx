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
        dispatch(sidebarAC.setCurrentSidebarItem(ownIndex));// установить номер текущего элемнта бокового меню
        dispatch(profileAC.setEditMode(false)); // выключить режим редактирования профиля
        dispatch(usersAC.setShowUsersFrom('all')); // показывать всех пользователей (обнуления поиска)
        dispatch(usersAC.setCurrentPage(1)); // установить текущую страницу пользователей - первую
        dispatch(usersAC.setSearchFriendsParams({term: ''})); // обнуления параметров поиска друзей
        dispatch(usersAC.setCurrentFriendsSidebarItem(0)); // переключение на первый элмемент бокового меню
        dispatch(usersAC.setValueFromHeaderSearch('')); // обнуление строки поиска пользователей из заголовка
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
                        ? <ListItemIcon className={clsx(ownIndex === currentSidebarItem && classes.iconSelected, classes.icon)}>
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
       minWidth: 'inherit',
        marginRight: 10
    },
    iconSelected: {
        color: indigo[500]
    },
    text: {
        color: indigo[600],
        fontWeight: 900
    }
}));