import React, {useEffect, useRef} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getId} from "../../../redux/auth-selectors";
import {getIsLoading} from "../../../redux/app-selectors";
import CircularPreloader from "../../common/CircularPreloader";
import {getCurrentUserProfile, getFollowed, getProfile} from "../../../redux/profile-reducer";

import {makeStyles} from "@material-ui/core/styles";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileInfoFormSidebar from "./ProfileInfoFormSidebar";
import {
    getCurrentUserProfileSelector,
    getEditMode, getFollowedSelector, getPosts,
    getProfileSelector,
} from "../../../redux/profile-selectors";
import {withAuthRedirect} from "../../../hoc/withAuthRedirect";
import ProfileFriends from "./ProfileFriends";
import {
    getCurrentPage,
    getFriendsSelector,
    getPageSize,
    getTotalFriendsCount
} from "../../../redux/users-selectors";
import {searchFriends} from "../../../redux/users-reduser";
import MyPosts from "./MyPosts";
import MyPost from "./MyPost";
import useOutsideAlerter from "../../../hooks/hooks";

const Profile: React.FC = () => {
    const classes = useStyles();
    const authorizedUserId = useSelector(getId);
    const isLoading = useSelector(getIsLoading);
    const editMode = useSelector(getEditMode);
    const currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const friends = useSelector(getFriendsSelector);
    const totalFriendsCount = useSelector(getTotalFriendsCount);
    const followed = useSelector(getFollowedSelector);
    const posts = useSelector(getPosts);
    const dispatch = useDispatch();


    let {userId} = useParams();
    const isOwner = userId ? false : true;
    if (!userId) {
        userId = authorizedUserId;
    }

    const profileSelector = isOwner ? getProfileSelector : getCurrentUserProfileSelector;
    const profile = useSelector(profileSelector);

    useEffect(() => {
        if (isOwner) {
            dispatch(getProfile(userId));
            dispatch(searchFriends(currentPage, pageSize, ''));
        } else {
            dispatch(getCurrentUserProfile(userId));
            dispatch(getFollowed(userId));
        }
    }, [userId]);

    const MyPostsItemElements = posts
        .map(el => <MyPost key={el.id} post={el} profile={profile}/>);

    if (isLoading || !profile) return <CircularPreloader/>

    return (
        <div className={classes.root}>

            <div className={classes.firstColumn}>
                <ProfileAvatar isOwner={isOwner}
                               userId={userId}
                               profile={profile}
                               followed={followed}
                />
                {isOwner && <ProfileFriends friends={friends} totalFriendsCount={totalFriendsCount}/>}
            </div>

            <div className={classes.middleColumn}>
                {!editMode
                    ? <>
                        <ProfileInfo isOwner={isOwner} userId={userId} profile={profile}/>
                        {
                            isOwner &&
                            <>
                                <MyPosts profile={profile}/>
                                {MyPostsItemElements}
                            </>
                        }
                    </>
                    : <ProfileInfoForm/>
                }
            </div>

            {
                editMode &&
                <div className={classes.lastColumn}>
                    {<ProfileInfoFormSidebar/>}
                </div>

            }

        </div>
    );
};

export default withAuthRedirect(Profile);

//========================== STYLES ================================================
const useStyles = makeStyles({
    root: {
        display: "flex"
    },
    firstColumn: {
        flexBasis: 230,
        marginRight: 15,
    },
    middleColumn: {
        flexGrow: 1,
        marginRight: 15
    },
    lastColumn: {
        width: 160,
    }
});
