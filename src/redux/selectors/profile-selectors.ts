import {StateType} from "../redux-store";

export const getPosts = (state: StateType) => state.profile.posts;
export const getProfileSelector = (state: StateType) => state.profile.profile;
export const getCurrentUserProfileSelector = (state: StateType) => state.profile.currentUserProfile;
export const getStatusSelector = (state: StateType) => state.profile.status;
export const getAvatarIsLoading = (state: StateType) => state.profile.avatarIsLoading;
export const getStatusIsLoading = (state: StateType) => state.profile.statusIsLoading;
export const getEditMode = (state: StateType) => state.profile.editMode;
export const getCurrentInfoFormSidebarItem = (state: StateType) => state.profile.currentInfoFormSidebarItem;
export const getFollowedSelector = (state: StateType) => state.profile.followed;
export const getEditingPost = (state: StateType) => state.profile.editingPost;




