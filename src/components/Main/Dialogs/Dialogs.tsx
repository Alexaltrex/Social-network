import React, {useEffect} from "react";
import {makeStyles} from "@material-ui/core/styles";
import DialogsList from "./DialogsList";
import CurrentDialog from "./CurrentDialog";
import {useDispatch, useSelector} from "react-redux";
import {getIsLoading} from "../../../redux/selectors/app-selectors";
import {getDialogsSelector} from "../../../redux/selectors/dialogs-selectors";
import {dialogsAC, dialogsSagaAC} from "../../../redux/dialogs-reducer";
import {DialogType} from "../../../DAL/dialogs-api";
import DialogsSidebar from "./DialogsSidebar";
import { useParams } from "react-router-dom";
import {UseParamsType} from "../../../types/types";
import useAuthRedirect from "../../../hooks/useAuthRedirect";

//================= CUSTOM HOOK =========================
const useDialogs = () => {
    useAuthRedirect();

    const classes = useStyles();
    const dispatch = useDispatch()
    const isLoading = useSelector(getIsLoading);
    const dialogs = useSelector(getDialogsSelector);
    // если userId === undefined, значит диалог не выбран
    let {userId} = useParams<UseParamsType>();
    const userIdNumber: number | undefined = userId ? +userId : undefined;
    useEffect(() => {
        //dispatch(getDialogs())
        dispatch(dialogsSagaAC.getDialogs());
    }, [dispatch]);
    useEffect(() => {
        if (userIdNumber) {
            dispatch(dialogsSagaAC.getMessages(userIdNumber));
        }
        return () => {
            dispatch(dialogsAC.setMessages(null))
        }
    }, [userIdNumber, dispatch]);
    const currentDialog = (dialogs && userIdNumber) ? dialogs.find(el => el.id === userIdNumber) as DialogType : null;
    return {classes, isLoading, dialogs, userIdNumber, currentDialog}
};

//======================= COMPONENT ===============================
const Dialogs: React.FC = () => {
    const {classes, isLoading, dialogs, userIdNumber, currentDialog} = useDialogs();

    return (
        <>
            {
                (!isLoading || dialogs) &&
                <div className={classes.root}>

                    <div className={classes.firstColumn}>
                        <DialogsList dialogs={dialogs}/>
                    </div>

                    <div className={classes.secondColumn}>
                        <CurrentDialog currentDialog={currentDialog}
                                       userId={userIdNumber}
                        />
                    </div>

                    <div className={classes.lastColumn}>
                        <DialogsSidebar/>
                    </div>
                </div>
            }
        </>
    );
};

export default Dialogs;

//========================== STYLES =============================================
const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    firstColumn: {
        flexBasis: 230,
        flexShrink: 0,
        marginRight: 10,
    },
    secondColumn: {
        flexGrow: 1,
        marginRight: 10,
    },
    lastColumn: {
        flexBasis: 140,
        flexShrink: 0,
    },
});