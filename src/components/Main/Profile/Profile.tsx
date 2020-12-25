import React, {ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getId} from "../../../redux/selectors/auth-selectors";
import {getIsLoading} from "../../../redux/selectors/app-selectors";
import {getCurrentUserProfile, getFollowed, getProfile, profileAC} from "../../../redux/reducers/profile-reducer";
import {makeStyles} from "@material-ui/core/styles";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ProfileInfoForm from "./ProfileInfoForm";
import ProfileInfoFormSidebar from "./ProfileInfoFormSidebar";
import {
    getCurrentInfoFormSidebarItem,
    getCurrentUserProfileSelector,
    getEditMode, getFollowedSelector, getPosts,
    getProfileSelector,
} from "../../../redux/selectors/profile-selectors";
import ProfileFriends from "./ProfileFriends";
import {
    getCurrentPage,
    getFriendsSelector,
    getPageSize,
    getTotalFriendsCount
} from "../../../redux/selectors/users-selectors";
import {searchFriends} from "../../../redux/reducers/users-reduser";
import ProfilePostForm from "./ProfilePostForm";
import ProfilePost from "./ProfilePost";
import {Skeleton} from "@material-ui/lab";
import {UseParamsType} from "../../../types/types";
import useAuthRedirect from "../../../hooks/useAuthRedirect";
import {BooleanParam, NumberParam, useQueryParam} from "use-query-params";
import useCommonQueryParams from "../../../hooks/useCommonQueryParams";

//===================== CUSTOM HOOK ===========================
const useProfile = () => {
    useAuthRedirect();
    useCommonQueryParams();

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
    const currentInfoFormSidebarItem = useSelector(getCurrentInfoFormSidebarItem);
    const dispatch = useDispatch();
    let {userId} = useParams<UseParamsType>();
    const isOwner = userId ? false : true;
    const userIdFinal = (userId ? +userId : authorizedUserId) as number;
    const profileSelector = isOwner ? getProfileSelector : getCurrentUserProfileSelector;
    const profile = useSelector(profileSelector);

    const [editModeQuery, setEditModeQuery] = useQueryParam('profileEdit', BooleanParam);
    const [currentInfoFormSidebarItemQuery, setCurrentInfoFormSidebarItemQuery] = useQueryParam('profileTab', NumberParam);

    // URL => STATE
    useEffect(() => {
        dispatch(profileAC.setEditMode(editModeQuery ? editModeQuery : editMode));
        dispatch(profileAC.setCurrentInfoFormSidebarItem(currentInfoFormSidebarItemQuery ? currentInfoFormSidebarItemQuery : currentInfoFormSidebarItem));
    }, [dispatch]);
    // STATE => URL
    useEffect(() => {
        setEditModeQuery(editMode ? editMode : undefined);
        setCurrentInfoFormSidebarItemQuery(currentInfoFormSidebarItem !== 0 ? currentInfoFormSidebarItem : undefined);
    }, [
        editMode,
        currentInfoFormSidebarItem,
    ]);

    useEffect(() => {
        if (isOwner) {
            dispatch(getProfile(userIdFinal));
            dispatch(searchFriends(currentPage, pageSize, ''));
        } else {
            dispatch(getCurrentUserProfile(userIdFinal));
            dispatch(getFollowed(userIdFinal));
        }
    }, [userIdFinal, dispatch, currentPage, pageSize, isOwner]);

    const MyPostsItemElements = posts
        .map(el => <ProfilePost key={el.id} post={el} profile={profile}/>);

    return {
        classes, isLoading, editMode,
        friends, totalFriendsCount,
        followed, isOwner, userIdFinal,
        profile, MyPostsItemElements
    }
};

//====================== COMPONENT ============================
const Profile: React.FC = (): ReactElement => {
    const {
        classes, isLoading, editMode,
        friends, totalFriendsCount,
        followed, isOwner, userIdFinal,
        profile, MyPostsItemElements
    } = useProfile();
    return (
        <div className={classes.root}>

            <div className={classes.firstColumn}>

                {
                    !isLoading && profile

                        ? <ProfileAvatar isOwner={isOwner}
                                         userId={userIdFinal}
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
                                : <Skeleton variant="rect" width={230} height={282} className={classes.profileFriends}/>
                        }
                    </>
                }

            </div>

            <div className={classes.middleColumn}>
                {!editMode
                    ? <>

                        {
                            !isLoading && profile
                                ? <ProfileInfo isOwner={isOwner} userId={userIdFinal} profile={profile}/>
                                : <Skeleton variant="rect" width='100%' height={151} className={classes.profileInfo}/>
                        }

                        {
                            isOwner &&
                            <>
                                {
                                    !isLoading && profile
                                        ? <ProfilePostForm profile={profile}/>
                                        :
                                        <Skeleton variant="rect" width='100%' height={54} className={classes.myPosts}/>
                                }

                                {
                                    !isLoading && profile

                                        ? <>
                                            {MyPostsItemElements}
                                        </>
                                        :
                                        <Skeleton variant="rect" width='100%' height={200} className={classes.myPost}/>
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

export default Profile;

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
