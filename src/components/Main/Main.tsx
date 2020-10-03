import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import CircularPreloader from "../common/CircularPreloader";
import Login from "../Login/Login";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {drawerWidth} from "../../const/const";
import clsx from "clsx";
import {useSelector} from "react-redux";
import {getIsInitializedSelector} from "../../redux/app-selectors";
import indigo from "@material-ui/core/colors/indigo";
import Users from "./Users/Users";
import {getSidebarIsOpen} from "../../redux/sidebar-selectors";
import Friends from "./Friends/Friends";
import Settings from "./Settings/Settings";

const Dialogs = React.lazy(() => import('./Dialogs/Dialogs'));
const Profile = React.lazy(() => import('./Profile/Profile'));

const Main: React.FC = () => {

    const classes = useStyles();

    const isInitialized = useSelector(getIsInitializedSelector);
    const sidebarIsOpen = useSelector(getSidebarIsOpen);

    if (!isInitialized) {
        return <CircularPreloader/>
    }

    return (
        <main className={clsx(classes.content, {
            [classes.contentShift]: sidebarIsOpen,
        })}>
            <div className={classes.drawerHeader}/>
            <Suspense fallback={<CircularPreloader/>}>
                <Switch>
                    <Route exact path='/' render={() => <Profile/>}/>
                    {/*<Route path='/dialogs' render={() => <Dialogs/>}/>*/}
                    <Route path='/dialogs/:userId?' render={() => <Dialogs/>}/>

                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route exact path='/users' render={() => <Users/>}/>
                    <Route path='/users/:userId' render={() => <Profile/>}/>
                    <Route path='/friends' render={() => <Friends/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='*' render={() => <div>404 Page not found</div>}/>
                </Switch>
            </Suspense>
        </main>
    );
};

export default Main;

//========================== STYLES ================================================
const useStyles = makeStyles((theme: Theme) => ({
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        backgroundColor: indigo[50],
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
        minHeight: '100vh',
        padding: 15
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));
