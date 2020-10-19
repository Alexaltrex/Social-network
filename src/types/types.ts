import {DialogType, MessageType} from "../DAL/dialogs-api";

export type PostType = {
    id: number
    message: string
    likeCount: number
    likeMe: boolean
    time: Date
}

export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type PhotosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    fullName: string
    contacts: ContactsType
    photos: PhotosType
    aboutMe: string
    lookingForAJobDescription: string
}

export type UserType = {
    id: number
    name: string
    status: string
    photos: PhotosType
    followed: boolean
}

export type FriendsValuesType = 'all' | 'true' | 'false';

export type SearchUsersParamsType = {
    term: string
    friend: FriendsValuesType
}

export type SearchFriendsParamsType = {
    term: string
}

export type ViewType = 'list' | 'block'

export type DeletedMessagesType = Array<DeletedMessagesItem>

export type DeletedMessagesItem = {
    dialog: DialogType
    messages: Array<MessageType>
}

export enum DialogsSidebarItemEnum {
    all = 0,
    deleted = 1,
    spam = 2
}

export enum ProfileSidebarItemEnum {
    main = 0,
    job = 1,
    contacts = 2
}

export enum SidebarItemEnum {
    myProfile = 1,
    dialogs = 2,
    users = 3,
    friends = 4,
    settings = 5
}

export type LangType = 'eng' | 'rus'

export type UseParamsType = {
    userId: string | undefined
}