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
} from "../../../redux/users-selectors";
import {getIsLoading, getLang} from "../../../redux/app-selectors";
import {getUsers, searchUsers, usersAC} from "../../../redux/users-reduser";
import Badge from "@material-ui/core/Badge";
import PeopleIcon from '@material-ui/icons/People';
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import UsersSearch from "./UsersSearch";
import {getDialogs} from "../../../redux/dialogs-reducer";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";
import ViewSwitcher from "../../common/ViewSwitcher";
import UsersList from "./UsersList";
import {ViewType} from "../../../types/types";
import {translate} from "../../../const/lang";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

//======================== CUSTOM HOOK =========================
const useUsers = () => {
    const classes = useStyles();
    const users = useSelector(getUsersSelector);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const isLoading = useSelector(getIsLoading);
    const searchUsersParams = useSelector(getSearchUsersParams);
    const showUsersFrom = useSelector(getShowUsersFrom);
    const dialogs = useSelector(getDialogsSelector);
    const valueFromHeaderSearch = useSelector(getValueFromHeaderSearch);
    const lang = useSelector(getLang);
    const dispatch = useDispatch();
    const [searchPanelIsOpen, setSearchPanelIsOpen] = useState(false);
    const [view, setView] = useState<ViewType>('block')
    useEffect(() => {
        dispatch(getDialogs());
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
    const portionNumber = useSelector(getPortionNumber);
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
    useAuthRedirect();
    const {
        classes, users, totalUsersCount, pageSize, currentPage,
        isLoading, showUsersFrom, dialogs, searchPanelIsOpen,
        view, setView, onPageChanged, onSearchCharactersClick,
        onShowAllClick, countTitle, closeSearchLabel, openSearchLabel,
        showAllLabel, portionNumber, setPortionNumber
    } = useUsers();

    return (
        <div className={classes.root}>

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
    root: {
        //padding: 15,
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
