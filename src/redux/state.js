// let postsData = [
//     {id: '1', message: 'Первое сообщение', likeCount: '11'},
//     {id: '2', message: 'Второе сообщение', likeCount: '22'},
//     {id: '3', message: 'Третье сообщение', likeCount: '33'},
//     {id: '3', message: 'Четвертое сообщение', likeCount: '55'}
// ];
//
// let dialogsItemsData = [
//     {id: '1', name: 'Dimka'},
//     {id: '2', name: 'Alex'},
//     {id: '3', name: 'John'},
//     {id: '4', name: 'Tony'},
// ];
//
// let messagesData = [
//     {id: '1', text: 'Hei-Hei'},
//     {id: '2', text: 'Hello'},
//     {id: '3', text: 'Yow'}
// ];
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";

// перенесено в creator'ы
// const ADD_POST = 'ADD-POST';
// const ADD_TALK = 'ADD-TALK';
// const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
// const UPDATE_NEW_TALK_TEXT = 'UPDATE-NEW-TALK-TEXT';


let store = {

    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Первое сообщение', likeCount: '11'},
                {id: '2', message: 'Второе сообщение', likeCount: '22'},
                {id: '3', message: 'Третье сообщение', likeCount: '33'},
                {id: '3', message: 'Четвертое сообщение', likeCount: '55'}
            ],
            newPostText: 'test'
        },
        dialogsPage: {
            dialogs: [
                {id: '1', name: 'Dimka'},
                {id: '2', name: 'Alex'},
                {id: '3', name: 'John'},
                {id: '4', name: 'Tony'},
            ],
            messages: [
                {id: '1', text: 'Hei-Hei'},
                {id: '2', text: 'Hello'},
                {id: '3', text: 'Yow'}
            ],
            talks: [
                {id: '1', text: 'talk about theme 1'},
                {id: '2', text: 'talk about theme 1'},
                {id: '3', text: 'talk about theme 1'}
            ],
            newTalkText: 'add talk'

        },

        dialogs2Page: {
            dialogs2: [
                {id: '1', name: 'Name1'},
                {id: '2', name: 'Name2'},
                {id: '3', name: 'Name3'}
            ]
        },

        SidebarFriends: [
            {id: '1', name: 'Andrew'},
            {id: '2', name: 'Sasha'},
            {id: '3', name: 'Sveta'}
        ]
    },

    _callSubscriber() {
        console.log('State changed');
    },

    getState() {
        return this._state;
    },

    subscribe(observer) {
        this._callSubscriber = observer;
    },


    // addPost() {//postMessage
    //     let newPost = {
    //         id: '5',
    //         message: this._state.profilePage.newPostText,
    //         likeCount: '0'
    //     };
    //     this._state.profilePage.posts.push(newPost);
    //     this._state.profilePage.newPostText = '';
    //     this._callSubscriber(this._state);
    // },

    // updateNewPostText(newText) {
    //     this._state.profilePage.newPostText = newText;
    //     this._callSubscriber(this._state);
    // },

    // методы, которые меняют state

    dispatch(action) {
        // if (action.type === 'ADD-POST') {
        //     let newPost = {
        //         id: '5',
        //         message: this._state.profilePage.newPostText,
        //         likeCount: '0'
        //     };
        //     this._state.profilePage.posts.push(newPost);
        //     this._state.profilePage.newPostText = '';
        //     this._callSubscriber(this._state);
        // } else if (action.type === 'UPDATE-NEW-POST-TEXT') {
        //     this._state.profilePage.newPostText = action.newText;
        //     this._callSubscriber(this._state);
        // }

        this._state.profilePage = profileReducer(this._state.profilePage, action);
        this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
        this._state.SidebarFriends = sidebarReducer(this._state.SidebarFriends, action);
        this._callSubscriber(this._state);


        // switch (action.type) {
        //     case 'ADD-POST': {
        //         let newPost = {
        //             id: '5',
        //             message: this._state.profilePage.newPostText,
        //             likeCount: '0'
        //         };
        //         this._state.profilePage.posts.push(newPost);
        //         this._state.profilePage.newPostText = '';
        //         this._callSubscriber(this._state);
        //         break;
        //     }
        //
        //     case 'ADD-TALK': {
        //         let newTalk = {
        //             id: '4',
        //             text: this._state.dialogsPage.newTalkText
        //         };
        //         this._state.dialogsPage.talks.push(newTalk);
        //         this._state.dialogsPage.newTalkText = '';
        //         this._callSubscriber(this._state);
        //         break;
        //     }
        //
        //     case 'UPDATE-NEW-POST-TEXT': {
        //         this._state.profilePage.newPostText = action.newText;
        //         this._callSubscriber(this._state);
        //         break;
        //     }
        //
        //     case 'UPDATE-NEW-TALK-TEXT': {
        //         this._state.dialogsPage.newTalkText = action.newText;
        //         this._callSubscriber(this._state);
        //         break;
        //     }
        //
        // }

    }

// при вызове subscribe в index.js в rerenderEntireTree(state.js)
// будет присвоено значение rerenderEntireTree из index.js
}

export default store;
window.store = store;




