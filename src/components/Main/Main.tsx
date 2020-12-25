import React, {ReactElement, Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import CircularPreloader from "../common/CircularPreloader";
import Login from "../Login/Login";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {getIsInitializedSelector} from "../../redux/selectors/app-selectors";
import Users from "./Users/Users";
import Friends from "./Friends/Friends";
import Settings from "./Settings/Settings";
import PageNotFound from "../common/PageNotFound";

const Profile = React.lazy(() => import('./Profile/Profile'));
const Dialogs = React.lazy(() => import('./Dialogs/Dialogs'));

//======================== CUSTOM HOOK =========================
const useMain = () => {
    const classes = useStyles();
    const isInitialized = useSelector(getIsInitializedSelector);
    return {classes, isInitialized}
}


//======================= COMPONENT ===============================
const Main: React.FC = (): ReactElement => {
    const {classes, isInitialized} = useMain();

    if (!isInitialized) {
        return <CircularPreloader/>
    }

    return (
        <main className={classes.main}>
            <Suspense fallback={<CircularPreloader/>}>
                <Switch>
                    <Route exact path='/' render={() => <Profile/>}/>
                    <Route path='/dialogs/:userId?' render={() => <Dialogs/>}/>
                    <Route path='/profile' render={() => <Profile/>}/>
                    <Route exact path='/users' render={() => <Users/>}/>
                    <Route path='/users/:userId' render={() => <Profile/>}/>
                    <Route path='/friends' render={() => <Friends/>}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/settings' render={() => <Settings/>}/>
                    <Route path='*' render={() => <PageNotFound/>}/>
                </Switch>
            </Suspense>
        </main>
    );
};

export default Main;

//========================== STYLES ================================================
const useStyles = makeStyles({
    main: {
        flexGrow: 1,
        padding: 10
    }
});
