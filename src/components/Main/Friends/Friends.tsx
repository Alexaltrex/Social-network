import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import FriendsList from "./FriendsList";
import FriendsSidebar from "./FriendsSidebar";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentFriendsPage,
    getCurrentFriendsSidebarItem,
    getPortionNumber, getSearchFriendsParams
} from "../../../redux/selectors/users-selectors";
import FriendsSomethingElse from "./FriendsSomethingElse";
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import {NumberParam, StringParam, useQueryParam} from "use-query-params";
import {usersAC} from "../../../redux/reducers/users-reduser";
import {getLang} from "../../../redux/selectors/app-selectors";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";

//================= CUSTOM HOOK =========================
const useFriends = () => {
    useAuthRedirect();
    useCommonQueryParams();

    const classes = useStyles();
    const currentFriendsSidebarItem = useSelector(getCurrentFriendsSidebarItem);
    const dispatch = useDispatch();

    const currentFriendsPage = useSelector(getCurrentFriendsPage);
    const portionNumber = useSelector(getPortionNumber);
    const searchFriendsParams = useSelector(getSearchFriendsParams);
    const lang = useSelector(getLang);

    const [friendsPageQuery, setFriendsPageQuery] = useQueryParam('page', NumberParam);
    const [portionNumberQuery, setPortionNumberQuery] = useQueryParam('portion', NumberParam);
    const [searchFriendsTermQuery, setSearchFriendsTermQuery] = useQueryParam('term', StringParam);

    // URL => STATE
    useEffect(() => {
        dispatch(usersAC.setCurrentFriendsPage(friendsPageQuery ? friendsPageQuery : currentFriendsPage));
        dispatch(usersAC.setPortionNumber(portionNumberQuery ? portionNumberQuery : portionNumber));
        dispatch(usersAC.setSearchFriendsParams(searchFriendsTermQuery ? {term: searchFriendsTermQuery} : searchFriendsParams));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setFriendsPageQuery(currentFriendsPage !== 1 ? currentFriendsPage : undefined);
        setPortionNumberQuery(portionNumber !== 1 ? portionNumber : undefined);
        setSearchFriendsTermQuery(searchFriendsParams.term !== '' ? searchFriendsParams.term : undefined);
    }, [
        currentFriendsPage,
        portionNumber,
        searchFriendsParams,
        lang,
    ]);

    return {
        classes, currentFriendsSidebarItem
    }
};

//======================= COMPONENT ===============================
const Friends: React.FC = () => {
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