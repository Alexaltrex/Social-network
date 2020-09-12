import {connect} from "react-redux";
import {profileAC} from "../../../redux/profile-reducer";
import MyPostMemo from "./MyPosts";
import {StateType} from "../../../redux/redux-store";
import {PostType} from "../../../types/types";


let mapStateToProps = (state: StateType) => ({
    posts: state.profilePage.posts,
});

const addPost = profileAC.addPost;

const MyPostsContainer = connect<MapStatePropsType,
    MapDispatchPropsType,
    OwnPropsType,
    StateType>(mapStateToProps, {addPost})(MyPostMemo);

export default MyPostsContainer;

type MapStatePropsType = {
    posts: Array<PostType>
}

type MapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

type OwnPropsType = {}
