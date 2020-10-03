import React, {useEffect} from "react";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import {makeStyles} from "@material-ui/core/styles";
import FriendsList from "./FriendsList";
import FriendsSidebar from "./FriendsSidebar";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentFriendsSidebarItem} from "../../../redux/users-selectors";
import FriendsSomethingElse from "./FriendsSomethingElse";
import {usersAC} from "../../../redux/users-reduser";


const Friends = () => {
    const classes = useStyles();
    const currentFriendsSidebarItem = useSelector(getCurrentFriendsSidebarItem);

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

export default withAuthRedirect(Friends);

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
        flexBasis: 240,
    }
});