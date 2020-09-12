import React from 'react';
import style from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostFormRedux, {AddPostFormValuesType} from "./AddPostFormRedux/AddPostFormRedux";
import {PostType} from "../../../types/types";

type PropsType = {
    posts: Array<PostType>
    addPost: (newPostText: string) => void
}

const MyPosts: React.FC<PropsType> = (props) => {
    const {posts, addPost} = props;
    let postsElements = posts.map(post =>
        <Post key={post.id} message={post.message} likeCount={post.likeCount}/>
    );

    let addPostLocale = (values: AddPostFormValuesType) => {
        addPost(values.newPostText);
    };

    return (
        <div className={style.myPosts}>
            <h3>My posts</h3>
            <AddPostFormRedux onSubmit={addPostLocale}/>
            <div className={style.posts}>
                {postsElements}
            </div>
        </div>
    );
}

const MyPostMemo = React.memo(MyPosts)

export default MyPostMemo;
