import profileReducer, {addPost, deletePost} from "./profile-reducer";
import React from "react";
// 1. подготовка исходных данных
let state = {
    posts: [
        {id: '0', message: 'Первое сообщение', likeCount: '11'},
        {id: '1', message: 'Второе сообщение', likeCount: '22'},
        {id: '2', message: 'Третье сообщение', likeCount: '33'},
        {id: '3', message: 'Четвертое сообщение', likeCount: '44'}
    ]
};


test('new posts length should be increment', () => {
    let action = addPost('test post');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. проверка того, что ожидаем получить
    expect(newState.posts.length).toBe(5);
});

test('message of the posts should be correct', () => {
    let action = addPost('test post');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. проверка того, что ожидаем получить
    expect(newState.posts[4].message).toBe('test post');
});

test('delete', () => {
    let action = deletePost('1');
    // 2. action
    let newState = profileReducer(state, action);
    // 3. проверка того, что ожидаем получить
    expect(newState.posts.length).toBe(3);
});

test(' no delete if id incorrect', () => {
    let action = deletePost(1000);
    // 2. action
    let newState = profileReducer(state, action);
    // 3. проверка того, что ожидаем получить
    expect(newState.posts.length).toBe(4);
});





