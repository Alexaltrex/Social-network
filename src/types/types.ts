export type PostType = {
    id: number
    message: string
    likeCount: number
    likeMe: boolean
    time: string
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