import React from "react";
import {Card} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import ProfileFriendsItem from "./ProfileFriendsItem";
import Grid from "@material-ui/core/Grid";
import {UserType} from "../../../types/types";
import Link from "@material-ui/core/Link";
import {Link as RouterLink} from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useDispatch} from "react-redux";
import {sidebarAC} from "../../../redux/sidebar-reducer";

const ProfileFriends: React.FC<PropsType> = ({friends, totalFriendsCount}) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const FriendsElements = friends
        && friends
            .map((el, i) => <ProfileFriendsItem key={i} friend={el}/>)
            .slice(0,6);

    const onClickHandler = () => {
        dispatch(sidebarAC.setCurrentSidebarItem(4))
    }

    return (
        <Card className={classes.card} elevation={6}>
            <div className={classes.title}>
                <Link component={RouterLink} to={'/friends'} className={classes.link} onClick={onClickHandler}>
                    Friends
                </Link>
                <Badge badgeContent={totalFriendsCount} color="primary" max={99999} showZero>
                    <AccountCircleIcon/>
                </Badge>

            </div>

            <Grid container alignContent='stretch' justify='space-between' wrap='wrap' spacing={1}>
                {FriendsElements}
            </Grid>
        </Card>
    )
};

export default ProfileFriends;

//========================== TYPES ==============================================
type PropsType = {
    friends: Array<UserType> | null
    totalFriendsCount: number
}

//========================== STYLES =============================================
const useStyles = makeStyles({
    card: {
        padding: 15,
    },
    title: {
    marginBottom: 5
    },
    link: {
        marginRight: 5
    }
});