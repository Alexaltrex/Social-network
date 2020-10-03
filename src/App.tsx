import React, {useEffect} from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Header from "./Components/Header/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Main from "./Components/Main/Main";
import {useDispatch, useSelector} from "react-redux";
import {getMessageIsSending, getRecipientName} from "./redux/dialogs-selectors";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {dialogsAC} from "./redux/dialogs-reducer";
import Typography from "@material-ui/core/Typography";
import {withRouter} from "react-router-dom";
import {getIsInitialized} from "./redux/app-reducer";

const App: React.FC = () => {
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
    }, []);

    useEffect(() => {
        console.log(`messageIsSending - ${messageIsSending}`);
        console.log(`recipientName - ${recipientName}`);
        if (!messageIsSending && recipientName) {
            setShowAlert(true);
        }
        return () => {
            //dispatch(dialogsAC.setRecipientName(null))
        }
    }, [messageIsSending])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowAlert(false);
    };

    return (
        <div className={classes.root}>
            <Header/>
            <Sidebar/>
            <Main/>

            <Snackbar open={showAlert}
                      //anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
                      autoHideDuration={6000}
                      onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
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
const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            // maxWidth: 800,
            // width: '100%',
            // margin: '0 auto'
        }
    }),
);

