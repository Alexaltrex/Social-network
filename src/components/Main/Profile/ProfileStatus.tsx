import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatusIsLoading, getStatusSelector} from "../../../redux/selectors/profile-selectors";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles} from "@material-ui/core/styles";
import ProfileStatusForm from "./ProfileStatusForm";
import LinearPreloader from "../../common/LinearPreloader";
import Typography from "@material-ui/core/Typography";
import {getStatus} from "../../../redux/reducers/profile-reducer";
import Fade from '@material-ui/core/Fade';
import useOutsideClick from "../../../hooks/useOutsideClick";

//======================== CUSTOM HOOK ===========================
const useProfileStatus = (userId: number) => {
    const classes = useStyles();
    const status = useSelector(getStatusSelector);
    const statusIsLoading = useSelector(getStatusIsLoading);
    const dispatch = useDispatch();
    const [showForm, setShowForm] = useState(false);
    useEffect(() => {
        dispatch(getStatus(userId));
    }, [userId, dispatch]);
    const handleClick = () => {
        setShowForm(true);
    };
    const handleClose = () => {
        setShowForm(false);
    };
    const wrapperRef = useRef(null);
    return {
        classes, status, statusIsLoading, showForm,
        handleClick, handleClose, wrapperRef
    }
}


//========================= COMPONENT ============================
const ProfileStatus: React.FC<PropsType> = ({isOwner, userId}): ReactElement => {
    const {
        classes, status, statusIsLoading, showForm,
        handleClick, handleClose, wrapperRef
    } = useProfileStatus(userId);
    useOutsideClick(wrapperRef, handleClose);

    return (
        <div>

            {isOwner //если свой профиль - кнопка с текстом статуса и вплывающая форма замены статуса
                ? !statusIsLoading && status !== null
                    ? <div className={classes.profileStatusFormWrapper}>
                        <ListItem button
                                  onClick={handleClick}
                                  classes={{
                                      root: classes.listItem,
                                      gutters: classes.gutters
                                  }}
                        >
                            {status !== '' ?
                                <Typography variant='body2'>{status}</Typography>
                                : <Typography variant='body2' color='textSecondary'>change status</Typography>
                            }
                        </ListItem>

                        <Fade in={showForm}>
                            <div className={classes.profileStatusForm}
                                 ref={wrapperRef}
                            >
                                <ProfileStatusForm onClose={handleClose} />
                            </div>
                        </Fade>

                    </div>

                    : <LinearPreloader/>

                //если чужой профиль - просто текст статуса (ничего, если его нет)
                : <>
                    {
                        !statusIsLoading
                            ? <>
                                {status && <ListItem classes={{
                                    gutters: classes.gutters
                                }}
                                >
                                    {status}
                                </ListItem>}
                            </>
                            : <LinearPreloader/>
                    }

                </>
            }


        </div>
    );
};

export default ProfileStatus;
//========================== STYLES ================================================
const useStyles = makeStyles({
    card: {
        marginTop: 15
    },
    gutters: {
        paddingLeft: 11
    },
    listItem: {
        paddingTop: 9,
        paddingBottom: 9
    },
    profileStatusFormWrapper: {
        position: 'relative'
    },
    profileStatusForm: {
        position: 'absolute',
        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#e8eaf6',
        zIndex: 10
    }
});
//========================== TYPES =================================================
type PropsType = {
    isOwner: boolean
    userId: number
}