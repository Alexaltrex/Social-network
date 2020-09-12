export type PostType = {
    id: number
    message: string
    likeCount: number
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

export type photosType = {
    small: string | null
    large: string | null
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    fullName: string
    contacts: ContactsType
    photos: photosType
    aboutMe: string
    lookingForAJobDescription: string
}

export type userType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}

export type DialogType = {
    id: number
    name: string
}

export type MessageType = {
    id: number
    text: string
}