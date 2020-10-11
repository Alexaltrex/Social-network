import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentFriendsPage,
    getCurrentPage, getFriendIdToRemove,
    getFriendsSelector,
    getNeedToChangeListOfFriends,
    getPageSize, getSearchFriendsParams, getTotalFriendsCount
} from "../../../redux/users-selectors";
import FriendsListItem from "./FriendsListItem";
import React, {useEffect} from "react";
import {searchFriends, removeAndUpdateFriends, usersAC} from "../../../redux/users-reduser";
import {Card} from "@material-ui/core";
import List from "@material-ui/core/List";
import {makeStyles} from "@material-ui/core/styles";
import FriendsSearch from "./FriendsSearch";
import Typography from "@material-ui/core/Typography";
import Paginator from "../../common/Paginator";
import {getDialogs} from "../../../redux/dialogs-reducer";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";
import Divider from "@material-ui/core/Divider";

const FriendsList: React.FC = () => {
    const classes = useStyles();

    const friends = useSelector(getFriendsSelector);
    const currentPage = useSelector(getCurrentPage);
    const currentFriendsPage = useSelector(getCurrentFriendsPage);
    const pageSize = useSelector(getPageSize);
    const needToChangeListOfFriends = useSelector(getNeedToChangeListOfFriends);
    const friendIdToRemove = useSelector(getFriendIdToRemove);
    const searchFriendsParams = useSelector(getSearchFriendsParams);
    const totalFriendsCount = useSelector(getTotalFriendsCount);
    const dialogs = useSelector(getDialogsSelector);

    const dispatch = useDispatch();

    const FriendsListElements = friends
        && friends.map(el => <FriendsListItem key={el.id} friend={el} dialogs={dialogs}/>);


    useEffect(() => {
        dispatch(searchFriends(currentFriendsPage, pageSize, searchFriendsParams.term));
    }, [searchFriendsParams.term, currentFriendsPage]);

    useEffect(() => {
        if (needToChangeListOfFriends && friendIdToRemove) {
            dispatch(removeAndUpdateFriends(currentPage, pageSize, friendIdToRemove));
        }
    }, [needToChangeListOfFriends]);

    useEffect(() => {
        dispatch(getDialogs());
    }, []);

    const onPageChanged = (pageNumber: number) => {
        dispatch(usersAC.setCurrentFriendsPage(pageNumber));
    };

    return (
        <Card className={classes.card} elevation={6}>
            <div className={classes.title}>
                <Typography component='span' color='primary' className={classes.titleLeft}>
                    Friends
                </Typography>
                <Typography component='span' color='textSecondary'>
                    {totalFriendsCount}
                </Typography>
            </div>
            <FriendsSearch/>

            <div className={classes.paginatorTop}>
                <Paginator totalItemsCount={totalFriendsCount}
                           pageSize={pageSize}
                           currentPage={currentFriendsPage}
                           onPageChanged={onPageChanged}
                />
            </div>

            <List>
                {FriendsListElements}
            </List>

            <Divider className={classes.divider}/>

            <div className={classes.paginatorBottom}>
                <Paginator totalItemsCount={totalFriendsCount}
                           pageSize={pageSize}
                           currentPage={currentFriendsPage}
                           onPageChanged={onPageChanged}
                />
            </div>

        </Card>
    )
};

export default FriendsList;

//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
        padding: 5,
    },
    title: {
        padding: '5px 10px 5px 10px'
    },
    titleLeft: {
        marginRight: 5
    },
    paginatorTop: {
        marginLeft: 10,
        marginTop: 5
    },
    paginatorBottom: {
        marginLeft: 10,
        marginBottom: 5,
        marginTop: 10
    },
    divider: {
        margin: '0 10px'
    },
});