import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getStatusIsLoading, getStatusSelector} from "../../../redux/profile-selectors";
import ListItem from "@material-ui/core/ListItem";
import {makeStyles} from "@material-ui/core/styles";
import ProfileStatusForm from "./ProfileStatusForm";
import LinearPreloader from "../../common/LinearPreloader";
import Typography from "@material-ui/core/Typography";
import {getStatus} from "../../../redux/profile-reducer";

const ProfileStatus: React.FC<PropsType> = ({isOwner, userId}) => {
    const classes = useStyles();
    const status = useSelector(getStatusSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStatus(userId));
    }, [userId]);

    //=========================
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const statusIsLoading = useSelector(getStatusIsLoading);
    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    //==============================

    return (
        <div>

            {isOwner //если свой профиль - кнопка с текстом статуса и вплывающая форма замены статуса
                ? !statusIsLoading && status !== null
                    ? <div>
                        <ListItem button
                                  aria-describedby={id}
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
                        <ProfileStatusForm
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                        />
                    </div>

                    : <LinearPreloader/>

                //если чужой профиль - просто текст статуса (ничего, если его нет)
                : <>
                    {
                        !statusIsLoading
                            ? <>
                                {status  && <ListItem classes={{
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
    }
});
//========================== TYPES =================================================
type PropsType = {
    isOwner: boolean
    userId: number
}