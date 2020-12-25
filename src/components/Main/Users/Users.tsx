import React, {ReactElement, useEffect, useState} from 'react';
import Paginator from '../../common/Paginator';
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getPageSize, getPortionNumber,
    getSearchUsersParams, getShowUsersFrom,
    getTotalUsersCount,
    getUsersSelector, getValueFromHeaderSearch
} from "../../../redux/selectors/users-selectors";
import {getIsLoading, getLang} from "../../../redux/selectors/app-selectors";
import {getUsers, searchUsers, usersAC} from "../../../redux/reducers/users-reduser";
import Badge from "@material-ui/core/Badge";
import PeopleIcon from '@material-ui/icons/People';
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import UsersSearch from "./UsersSearch";
import {dialogsSagaAC} from "../../../redux/reducers/dialogs-reducer";
import {getDialogsSelector} from "../../../redux/selectors/dialogs-selectors";
import ViewSwitcher from "../../common/ViewSwitcher";
import UsersList from "./UsersList";
import {FriendsValuesType, ShowUsersFromType, ViewType} from "../../../types/types";
import {translate} from "../../../const/lang";
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import {BooleanParam, NumberParam, StringParam, useQueryParam} from "use-query-params";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";

//======================== CUSTOM HOOK =========================
const useUsers = () => {
    useAuthRedirect();
    useCommonQueryParams();

    const classes = useStyles();
    const dispatch = useDispatch();
    const lang = useSelector(getLang);
    const users = useSelector(getUsersSelector);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const isLoading = useSelector(getIsLoading);
    const searchUsersParams = useSelector(getSearchUsersParams);
    const showUsersFrom = useSelector(getShowUsersFrom);
    const dialogs = useSelector(getDialogsSelector);
    const valueFromHeaderSearch = useSelector(getValueFromHeaderSearch);
    const portionNumber = useSelector(getPortionNumber);
    const [searchPanelIsOpen, setSearchPanelIsOpen] = useState(false);
    const [view, setView] = useState<ViewType>('block');

    const [currentPageQuery, setCurrentPageQuery] = useQueryParam('page', NumberParam);
    const [portionNumberQuery, setPortionNumberQuery] = useQueryParam('portion', NumberParam);
    const [viewQuery, setViewQuery] = useQueryParam('view', StringParam);
    const [searchPanelIsOpenQuery, setSearchPanelIsOpenQuery] = useQueryParam('searchPanelIsOpen', BooleanParam);
    const [showUsersFromQuery, setShowUsersFromQuery] = useQueryParam('showFrom', StringParam);
    const [termQuery, setTermQuery] = useQueryParam('term', StringParam);
    const [friendQuery, setFriendQuery] = useQueryParam('friend', StringParam);

    // URL => STATE
    useEffect(() => {
        dispatch(usersAC.setCurrentPage(currentPageQuery ? currentPageQuery : currentPage));
        dispatch(usersAC.setPortionNumber(portionNumberQuery ? portionNumberQuery : portionNumber));
        setView(viewQuery ? viewQuery as ViewType : view);
        setSearchPanelIsOpen(searchPanelIsOpenQuery ? searchPanelIsOpenQuery : searchPanelIsOpen);
        dispatch(usersAC.setShowUsersFrom(showUsersFromQuery ? showUsersFromQuery as ShowUsersFromType : showUsersFrom));
        dispatch(usersAC.setSearchUsersParams({
            term: termQuery ? termQuery : searchUsersParams.term,
            friend: friendQuery ? friendQuery as  FriendsValuesType : searchUsersParams.friend
        }));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setCurrentPageQuery(currentPage !== 1 ? currentPage : undefined);
        setPortionNumberQuery(portionNumber !== 1 ? portionNumber : undefined);
        setViewQuery(view !== 'block' ? view : undefined);
        setSearchPanelIsOpenQuery(searchPanelIsOpen ? searchPanelIsOpen : undefined);
        setShowUsersFromQuery(showUsersFrom !== 'all' ? showUsersFrom : undefined);
        setTermQuery(searchUsersParams.term !== '' ? searchUsersParams.term : undefined);
        setFriendQuery(searchUsersParams.friend !== 'all' ? searchUsersParams.friend : undefined);
    }, [
        currentPage,
        portionNumber,
        view,
        searchPanelIsOpen,
        showUsersFrom,
        searchUsersParams,
    ]);

    useEffect(() => {
       dispatch(dialogsSagaAC.getDialogs());
    }, [dispatch]);
    useEffect(() => {
        if (showUsersFrom === 'all') {
            dispatch(getUsers(currentPage, pageSize));
        } else if (showUsersFrom === 'search') {
            dispatch(searchUsers(currentPage, pageSize, searchUsersParams.term, searchUsersParams.friend));
        }
    }, [currentPage, pageSize, showUsersFrom, searchUsersParams.term, searchUsersParams.friend, dispatch]);
    const onPageChanged = (pageNumber: number) => {
        dispatch(usersAC.setCurrentPage(pageNumber));
    };
    const onSearchCharactersClick = () => {
        setSearchPanelIsOpen(!searchPanelIsOpen);
    };
    const onShowAllClick = () => {
        dispatch(usersAC.setShowUsersFrom('all'));
        dispatch(usersAC.setSearchUsersParams({term: '', friend: 'all'}));
        dispatch(usersAC.setCurrentPage(1));
    };
    const countTitle = showUsersFrom === 'all'
        ? translate(lang, 'Total all users count:') :
        translate(lang, 'Total users count from search:')
    useEffect(() => {
        if (valueFromHeaderSearch) {
            setSearchPanelIsOpen(true)
        }
    }, [valueFromHeaderSearch]);

    const closeSearchLabel = translate(lang, 'Close search');
    const openSearchLabel = translate(lang, 'Open search');
    const showAllLabel = translate(lang, 'Show all');

    const setPortionNumber = (portionNumber: number) => {
        dispatch(usersAC.setPortionNumber(portionNumber))
    };

    return {
        classes, users, totalUsersCount, pageSize, currentPage,
        isLoading, showUsersFrom, dialogs, searchPanelIsOpen,
        view, setView, onPageChanged, onSearchCharactersClick,
        onShowAllClick, countTitle, closeSearchLabel, openSearchLabel,
        showAllLabel, portionNumber, setPortionNumber
    }
}

//======================= COMPONENT ===============================
const Users: React.FC = (): ReactElement => {
    const {
        classes, users, totalUsersCount, pageSize, currentPage,
        isLoading, showUsersFrom, dialogs, searchPanelIsOpen,
        view, setView, onPageChanged, onSearchCharactersClick,
        onShowAllClick, countTitle, closeSearchLabel, openSearchLabel,
        showAllLabel, portionNumber, setPortionNumber
    } = useUsers();

    return (
        <div className={classes.users}>

            <Collapse in={searchPanelIsOpen} timeout="auto" unmountOnExit>
                <UsersSearch/>
            </Collapse>

            <div className={classes.topPanel}>
                <Button onClick={onSearchCharactersClick}
                        size='small'
                        className={classes.button}
                        color='primary'
                        startIcon={searchPanelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        variant='contained'>
                    {
                        searchPanelIsOpen
                            ? closeSearchLabel
                            : openSearchLabel
                    }
                </Button>
                <Button onClick={onShowAllClick}
                        size='small'
                        color='primary'
                        disabled={showUsersFrom === 'all'}
                        className={classes.button}
                        variant='contained'>
                    {showAllLabel}
                </Button>

                <Typography color='primary'
                            variant='subtitle2'
                            className={classes.countTitle}
                >
                    {countTitle}
                </Typography>

                <Badge badgeContent={totalUsersCount} color="primary" max={99999} showZero>
                    <PeopleIcon/>
                </Badge>
            </div>


            {
                totalUsersCount !== 0 && totalUsersCount && pageSize && currentPage &&
                <div className={classes.paginatorTopWrapper}>
                    <div className={classes.paginator}>
                        <Paginator totalItemsCount={totalUsersCount}
                                   pageSize={pageSize}
                                   currentPage={currentPage}
                                   onPageChanged={onPageChanged}
                                   portionNumber={portionNumber}
                                   setPortionNumber={setPortionNumber}
                        />
                    </div>

                    <ViewSwitcher view={view} setView={setView}/>
                </div>

            }

            <UsersList isLoading={isLoading}
                       users={users}
                       dialogs={dialogs}
                       view={view}
                       pageSize={pageSize}
            />

            {
                totalUsersCount !== 0 && totalUsersCount && pageSize && currentPage &&
                <div className={classes.paginatorBottomWrapper}>
                    <div className={classes.paginator}>
                        <Paginator totalItemsCount={totalUsersCount}
                                   pageSize={pageSize}
                                   currentPage={currentPage}
                                   onPageChanged={onPageChanged}
                                   portionNumber={portionNumber}
                                   setPortionNumber={setPortionNumber}
                        />
                    </div>
                    <ViewSwitcher view={view} setView={setView}/>
                </div>
            }

        </div>
    )
};

export default Users;

//========================== STYLES ================================================
const useStyles = makeStyles({
    users: {
        minHeight: '100vh'
    },
    topPanel: {
        display: 'flex',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    countTitle: {
        marginRight: 10
    },
    button: {
        marginRight: 10,
        textTransform: 'none'
    },
    paginatorTopWrapper: {
        marginBottom: 10,
        display: 'flex',
        alignItems: 'center'
    },
    paginatorBottomWrapper: {
        marginTop: 10,
        display: 'flex',
        alignItems: 'center'
    },
    paginator: {
        marginRight: 20
    },
});

