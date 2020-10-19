import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {UserType} from "../../../types/types";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import {sidebarAC} from "../../../redux/sidebar-reducer";
import {useDispatch} from "react-redux";
import {Typography} from "@material-ui/core";

//===================== CUSTOM HOOK ===========================
const useProfileFriendsItem = ({friend}: PropsType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const src = friend.photos.small;
    const indexBeforeWhiteSpace = friend.name.search(/[\s_]/);
    let shortName = (indexBeforeWhiteSpace > 0) ?  friend.name.slice(0, indexBeforeWhiteSpace) : friend.name;
    if (shortName.length > 10 ) {
        shortName = shortName.slice(0,9) + '...';
    }
    const onListItemClick = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(3));
    };

    return {
        classes, src, shortName, onListItemClick
    }
};

//====================== COMPONENT ============================
const ProfileFriendsItem: React.FC<PropsType> = ({friend}) => {
    const {
        classes, src, shortName, onListItemClick
    } = useProfileFriendsItem({friend});

    return (
        <Grid item xs={4} className={classes.item}>
                <Avatar className={classes.avatar}
                        src={src ? src : undefined}
                />
            <Link component={RouterLink} to={`/users/${friend.id}`} onClick={onListItemClick}>

                <Typography variant="caption" align='center'>
                    {shortName}
                </Typography>
            </Link>
        </Grid>
    )
};

export default ProfileFriendsItem;
//========================== TYPES =================================================
type PropsType = {
    friend: UserType
}

//========================== STYLES ================================================
const useStyles = makeStyles({
    item: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    avatar: {
        width: 50,
        height: 50
    }
});