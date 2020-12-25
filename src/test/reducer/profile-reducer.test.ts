import {PostType, ProfileSidebarItemEnum, ProfileType} from "../../types/types";
import profileReducer, {profileAC} from "../../redux/reducers/profile-reducer";

const profile0 = {
    userId: 11,
    lookingForAJob: false,
    fullName: 'string',
    contacts: {
        github: 'string',
        vk: 'string',
        facebook: 'string',
        instagram: 'string',
        twitter: 'string',
        website: 'string',
        youtube: 'string',
        mainLink: 'string'
    },
    photos: {
        small: null,
        large: null
    },
    aboutMe: 'string',
    lookingForAJobDescription: 'string'
}
const profile = {
    userId: 1,
    lookingForAJob: true,
    fullName: 'string',
    contacts: {
        github: 'string',
        vk: 'string',
        facebook: 'string',
        instagram: 'string',
        twitter: 'string',
        website: 'string',
        youtube: 'string',
        mainLink: 'string'
    },
    photos: {
        small: null,
        large: null
    },
    aboutMe: 'string',
    lookingForAJobDescription: 'string'
}

const initialState = {
    posts: [
        {id: 1, message: 'Hello, world', likeCount: 4, likeMe: false, time: new Date(2020, 8, 25, 10, 19)},
    ] as Array<PostType>, // массив постов
    profile: profile0,
    currentUserProfile: null as null | ProfileType, // профиль текущего просматриваемого пользователя
    status: null as null | string, // статус
    avatarIsLoading: false, // аватар загружается?
    statusIsLoading: false, //  статус загружается?
    editMode: false, // вкл./выкл. режим редактирования статуса
    currentInfoFormSidebarItem: 0 as ProfileSidebarItemEnum, // текущий элемент бокового меню (все, удаленные, спам)
    followed: null as null | boolean, // пользователь - друг?
    editingPost: false // режим ввода нового поста (false - надпись, true - форма ввода)
};

describe('profile-reducer', () => {

    it('profile/TOGGLE_LIKE_ME', () => {
        const id = 1;
        const action = profileAC.toggleLikeMe(id);
        const newState = profileReducer(initialState, action);
        expect(newState.posts[0].likeMe).not.toEqual(initialState.posts[0].likeMe);
    });

    it('profile/SET_EDITING_POST', () => {
        const editingPost = true;
        const action = profileAC.setEditingPost(editingPost);
        const newState = profileReducer(initialState, action);
        expect(newState.editingPost).toEqual(editingPost);
    });

    it('profile/SET_CURRENT_USER_PROFILE', () => {
        const action = profileAC.setCurrentUserProfile(profile);
        const newState = profileReducer(initialState, action);
        expect(newState.currentUserProfile).toEqual(profile);
    });

    it('profile/SET_FOLLOWED', () => {
        const followed = true;
        const action = profileAC.setFollowed(followed);
        const newState = profileReducer(initialState, action);
        expect(newState.followed).toEqual(followed);
    });

    it('profile/SET_CURRENT_INFO_FORM_SIDEBAR_ITEM', () => {
        const currentInfoFormSidebarItem = 2;
        const action = profileAC.setCurrentInfoFormSidebarItem(currentInfoFormSidebarItem);
        const newState = profileReducer(initialState, action);
        expect(newState.currentInfoFormSidebarItem).toEqual(currentInfoFormSidebarItem);
    });

    it('profile/SET_EDIT_MODE', () => {
        const editMode = true;
        const action = profileAC.setEditMode(editMode);
        const newState = profileReducer(initialState, action);
        expect(newState.editMode).toEqual(editMode);
    });

    it('profile/AVATAR_IS_LOADING', () => {
        const avatarIsLoading = true;
        const action = profileAC.toggleAvatarLoading(avatarIsLoading);
        const newState = profileReducer(initialState, action);
        expect(newState.avatarIsLoading).toEqual(avatarIsLoading);
    });

    it('profile/STATUS_IS_LOADING', () => {
        const statusIsLoading = true;
        const action = profileAC.toggleStatusLoading(statusIsLoading);
        const newState = profileReducer(initialState, action);
        expect(newState.statusIsLoading).toEqual(statusIsLoading);
    });

    it('profile/ADD_POST', () => {
        const post = 'test';
        const action = profileAC.addPost(post, 'rus');
        const newState = profileReducer(initialState, action);
        expect(newState.posts[newState.posts.length - 1].message).toEqual(post);
    });

    it('profile/DELETE_POST', () => {
        const id = 1;
        const action = profileAC.deletePost(id);
        const newState = profileReducer(initialState, action);
        expect(newState.posts.filter(el => el.id === id).length).toBe(0);
    });

    it('profile/SET_USER_PROFILE', () => {
        const action = profileAC.setUserProfile(profile);
        const newState = profileReducer(initialState, action);
        expect(newState.profile).toEqual(profile);
    });

    it('profile/SET_STATUS', () => {
        const status = 'status';
        const action = profileAC.setStatus(status);
        const newState = profileReducer(initialState, action);
        expect(newState.status).toEqual(status);
    });

    it('profile/SET_PHOTOS', () => {
        const photos = {
            small: 'small',
            large: 'large'
        };
        const action = profileAC.setPhotos(photos);
        const newState = profileReducer(initialState, action);
        expect(newState.profile!.photos).toEqual(photos);
    });

})

