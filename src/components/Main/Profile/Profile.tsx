import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getId} from "../../../redux/auth-selectors";
import {getIsLoading} from "../../../redux/app-selectors";
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
import {Skeleton} from "@material-ui/lab";

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

    return (
        <div className={classes.root}>

            <div className={classes.firstColumn}>

                {
                    !isLoading && profile

                    ? <ProfileAvatar isOwner={isOwner}
                                     userId={userId}
                                     profile={profile}
                                     followed={followed}
                    />
                    : <Skeleton variant="rect" width={230} height={266} className={classes.avatar}/>
                }

                {
                    isOwner &&
                    <>
                        {
                            !isLoading && friends
                                ? <ProfileFriends friends={friends}
                                                  totalFriendsCount={totalFriendsCount}
                                />
                                : <Skeleton variant="rect" width={230} height={282} className={classes.profileFriends} />
                        }
                    </>
                }

            </div>

            <div className={classes.middleColumn}>
                {!editMode
                    ? <>

                        {
                            !isLoading && profile
                                ? <ProfileInfo isOwner={isOwner} userId={userId} profile={profile}/>
                                : <Skeleton variant="rect" width='100%' height={151} className={classes.profileInfo}/>
                        }

                        {
                            isOwner &&
                            <>
                                {
                                    !isLoading && profile
                                        ? <MyPosts profile={profile}/>
                                        : <Skeleton variant="rect" width='100%' height={54} className={classes.myPosts}/>
                                }

                                {
                                    !isLoading && profile

                                        ? <>
                                            {MyPostsItemElements}
                                        </>
                                        : <Skeleton variant="rect" width='100%' height={200} className={classes.myPost}/>
                                }

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
        marginRight: 10,
    },
    middleColumn: {
        flexGrow: 1,

    },
    lastColumn: {
        width: 130,
        marginLeft: 10
    },
    avatar: {
        marginBottom: 10,
        borderRadius: 4
    },
    profileFriends: {
        borderRadius: 4
    },
    profileInfo: {
        marginBottom: 10,
        borderRadius: 4
    },
    myPosts: {
        marginBottom: 10,
        borderRadius: 4
    },
    myPost: {
        marginBottom: 10,
        borderRadius: 4
    }
});
