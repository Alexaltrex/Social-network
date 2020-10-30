import React, {useEffect} from 'react';
import {makeStyles} from "@material-ui/core/styles";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {getMessageIsSending, getRecipientName} from "./redux/selectors/dialogs-selectors";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";
import {getIsInitialized} from "./redux/app-reducer";
import indigo from "@material-ui/core/colors/indigo";
import {getTheme} from "./redux/selectors/settings-selectors";

//======================== CUSTOM HOOK =========================
const useApp = () => {
    const classes = useStyles();
    const messageIsSending = useSelector(getMessageIsSending);
    const recipientName = useSelector(getRecipientName);
    const [showAlert, setShowAlert] = React.useState(false);
    const dispatch = useDispatch();
    const catchAllUnhandledErrors = (e: PromiseRejectionEvent) => {
        alert(e);
    };
    useEffect(() => {
        dispatch(getIsInitialized())
        window.addEventListener('unhandledrejection', catchAllUnhandledErrors);
        return () => {
            window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
        }
    }, [dispatch]);
    useEffect(() => {
        if (!messageIsSending && recipientName) {
            setShowAlert(true);
        }
    }, [messageIsSending, recipientName])
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };
    const theme = useSelector(getTheme);
    const useStylesSettings = makeStyles({
        root: {
            backgroundColor: theme.displayBackgroundColor,
            position: 'relative'
        }
    });
    const classesSettings = useStylesSettings();
    return {
        classes, recipientName, showAlert,
        handleClose, classesSettings
    }
};

//======================= COMPONENT ===============================
const App: React.FC = () => {
    const {
        classes, recipientName, showAlert,
        handleClose, classesSettings
    } = useApp();

    return (
        <div className={classesSettings.root}>
            <Header/>
            <div className={classes.wrapper}>
                <Sidebar/>
                <Main/>
            </div>

            <Snackbar open={showAlert}
                      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose}
                       variant='filled'
                       severity="success">
                    <Typography component='span'>Message to </Typography>
                    <Typography component='span' color='primary'>{recipientName}</Typography>
                    <Typography component='span'> is sent!</Typography>
                </Alert>
            </Snackbar>

        </div>
    );
};

export default withRouter(App);

//============================= STYLE ==========================
const useStyles = makeStyles({
    root: {
        backgroundColor: indigo[50],
        position: 'relative'
    },
    wrapper: {
        maxWidth: 1000,
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        boxSizing: 'border-box',
        paddingTop: 64,
        minHeight: '100vh',
    },

});

