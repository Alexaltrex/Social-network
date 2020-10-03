import React, {useEffect, useState} from 'react';
import User from "./User";
import CircularPreloader from '../../common/CircularPreloader';
import Paginator from '../../common/Paginator';
import {Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getPageSize,
    getSearchUsersParams, getShowUsersFrom,
    getTotalUsersCount,
    getUsersSelector
} from "../../../redux/users-selectors";
import {getIsLoading} from "../../../redux/app-selectors";
import {getUsers, searchUsers, usersAC} from "../../../redux/users-reduser";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import Badge from "@material-ui/core/Badge";
import PeopleIcon from '@material-ui/icons/People';
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import SearchUsers from "./SearchUsers";
import {getDialogs} from "../../../redux/dialogs-reducer";
import {getDialogsSelector} from "../../../redux/dialogs-selectors";

let Users: React.FC = () => {
    const classes = useStyles();
    const users = useSelector(getUsersSelector);
    const totalUsersCount = useSelector(getTotalUsersCount);
    const pageSize = useSelector(getPageSize);
    const currentPage = useSelector(getCurrentPage);
    const isLoading = useSelector(getIsLoading);
    const searchUsersParams = useSelector(getSearchUsersParams);
    const showUsersFrom = useSelector(getShowUsersFrom);
    const dialogs = useSelector(getDialogsSelector);
    const dispatch = useDispatch();

    const [searchPanelIsOpen, setSearchPanelIsOpen] = useState(false);

    useEffect(() => {
        dispatch(getDialogs());
    }, []);

    useEffect(() => {
        if (showUsersFrom === 'all') {
            dispatch(getUsers(currentPage, pageSize));
        } else if (showUsersFrom === 'search') {
            dispatch(searchUsers(currentPage, pageSize, searchUsersParams.term, searchUsersParams.friend));
        }

    }, [currentPage, pageSize, showUsersFrom, searchUsersParams.term, searchUsersParams.friend]);

    let usersElements = users && users.map(user => <User
        user={user}
        key={user.id}
        dialogs={dialogs}
    />);

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

    const countTitle = showUsersFrom === 'all' ? 'Total all users count:' : 'Total users count from search:'

    return (
        <div className={classes.root}>

            <Collapse in={searchPanelIsOpen} timeout="auto" unmountOnExit>
                <SearchUsers/>
            </Collapse>

            <div className={classes.count}>
                <Button onClick={onSearchCharactersClick}
                        size='small'
                        className={classes.button}
                        color='primary'
                        startIcon={searchPanelIsOpen ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                        variant='contained'>
                    {searchPanelIsOpen ? 'Close search' : 'Open search'}
                </Button>
                <Button onClick={onShowAllClick}
                        size='small'
                        color='primary'
                        disabled={showUsersFrom === 'all'}
                        className={classes.button}
                        variant='contained'>
                    Show all
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
                totalUsersCount !==0 && totalUsersCount && pageSize && currentPage &&
                <div className={classes.paginator}>
                    <Paginator totalItemsCount={totalUsersCount}
                               pageSize={pageSize}
                               currentPage={currentPage}
                               onPageChanged={onPageChanged}

                    />
                </div>

            }

            {isLoading || !users
                ? <CircularPreloader/>
                : <Grid container alignContent='stretch' justify='flex-start' wrap='wrap' spacing={2}>
                    {usersElements}
                </Grid>}
        </div>
    )
};

export default withAuthRedirect(Users);

//========================== STYLES ================================================
const useStyles = makeStyles({
    root: {
        //padding: 15,
        minHeight: '100vh'
    },
    count: {
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
    paginator: {
        marginBottom: 10
    }
});

