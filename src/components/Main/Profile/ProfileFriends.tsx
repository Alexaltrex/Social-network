import React from "react";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProfileFriendsItem from "./ProfileFriendsItem";
import Grid from "@material-ui/core/Grid";
import {SidebarItemEnum, UserType} from "../../../types/types";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch, useSelector} from "react-redux";
import {sidebarAC} from "../../../redux/reducers/sidebar-reducer";
import Typography from "@material-ui/core/Typography";
import {getLang} from "../../../redux/selectors/app-selectors";
import {translate} from "../../../const/lang";

//===================== CUSTOM HOOK ===========================
const useProfileFriends = ({friends}: UseProfileFriendsType) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const FriendsElements = friends
        && friends
            .map((el, i) => <ProfileFriendsItem key={i} friend={el}/>)
            .slice(0, Math.min(9, friends.length));
    const onClickHandler = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(SidebarItemEnum.friends))
    };
    const lang = useSelector(getLang);
    const title = translate(lang, 'Friends');
    return {
        classes, FriendsElements, onClickHandler, title
    }
};

//====================== COMPONENT ============================
const ProfileFriends: React.FC<PropsType> = ({friends, totalFriendsCount}) => {
    const {
        classes, FriendsElements, onClickHandler, title
    } = useProfileFriends({friends});

    return (
        <Card className={classes.card} elevation={6}>
            { friends && friends.length
                ? <>
                <div className={classes.title}>
                    <Link component={RouterLink} to={'/friends'} className={classes.link} onClick={onClickHandler}>
                        {title}
                    </Link>
                    <Badge badgeContent={totalFriendsCount} color="primary" max={99999} showZero>
                        <AccountCircleIcon/>
                    </Badge>

                </div>

                <Grid container alignContent='stretch' justify='space-between' wrap='wrap' spacing={1}>
                    {FriendsElements}
                </Grid>
            </>
                : <Typography>
                    No friends
                </Typography>
            }
        </Card>
    )
};

export default ProfileFriends;

//========================== TYPES ==============================================
type PropsType = {
    friends: Array<UserType> | null
    totalFriendsCount: number
}
type UseProfileFriendsType = {
    friends: Array<UserType> | null
}
//========================== STYLES =============================================
const useStyles = makeStyles({
    card: {
        padding: '15px 10px 10px',
    },
    title: {
        marginBottom: 5
    },
    link: {
        marginRight: 5
    }
});