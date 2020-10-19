import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import FriendsList from "./FriendsList";
import FriendsSidebar from "./FriendsSidebar";
import {useSelector} from "react-redux";
import {getCurrentFriendsSidebarItem} from "../../../redux/users-selectors";
import FriendsSomethingElse from "./FriendsSomethingElse";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

//================= CUSTOM HOOK =========================
const useFriends = () => {
    const classes = useStyles();
    const currentFriendsSidebarItem = useSelector(getCurrentFriendsSidebarItem);
    return {classes, currentFriendsSidebarItem}
};

//======================= COMPONENT ===============================
const Friends: React.FC = () => {
    useAuthRedirect();
    const {classes, currentFriendsSidebarItem} = useFriends();

    return (
        <div className={classes.wrapper}>
            <div className={classes.leftColumn}>
                {
                    currentFriendsSidebarItem === 0
                        ? <FriendsList/>
                        : <FriendsSomethingElse/>
                }
            </div>
            <div className={classes.rightColumn}>
                <FriendsSidebar/>
            </div>
        </div>
    )
};

export default Friends;


//========================== STYLES ================================================
const useStyles = makeStyles({
    wrapper: {
        display: "flex"
    },
    card: {
        padding: 5,
    },
    leftColumn: {
        flexGrow: 1,
        marginRight: 15,
    },
    rightColumn: {
        flexBasis: 220,
    }
});