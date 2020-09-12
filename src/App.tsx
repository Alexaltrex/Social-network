import React, {Component, Suspense} from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {Route, Switch} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import UsersContainer from "./components/Users/UsersContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import LoginContainer from "./components/Login/Login";
import Preloader from "./components/common/Preloader/Preloader";
import {AppPropsType} from "./AppContainer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component<AppPropsType & OwnPropsType, LocalStateType> {

    catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(e);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener('unhandledrejection', this.catchAllUnhandledErrors);
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <div className='app-wrapper'>
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-content'>
                    <Suspense fallback={<div>Загрузка...</div>}>
                        <Switch>
                            <Route exact path='/' render={() => <ProfileContainer/>}/>
                            <Route path='/news' render={() => <News/>}/>
                            <Route path='/music' component={Music}/>
                            <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                            <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                            {/*<Route path='/users' render={() => <UsersContainer pageTitle={'Пользователи'}/>}/>*/}
                            <Route path='/users' render={() => <UsersContainer/>}/>
                            <Route path='/login' render={() => <LoginContainer/>}/>
                            <Route path='*' render={() => <div>404 Page not found</div>}/>
                        </Switch>
                    </Suspense>
                </div>
            </div>
        );
    };
};

export default App;

type OwnPropsType = {
    //pageTitle: string
}

type PropsType = {
    initializeApp: () => void
    initialized: boolean
}

type LocalStateType = {}