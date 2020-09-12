import React from 'react';
import s from './Friends.module.css';
//import {NavLink} from "react-router-dom";
import Friend from "./Friend/Friend";

const Friends = (props) => {
    // let friends = [
    //     //     {id: '1', name: 'Andrew'},
    //     //     {id: '2', name: 'Sasha'},
    //     //     {id: '3', name: 'Sveta'}
    //     // ];

    let friendsElements = props.friends.map( friend =>
        <Friend id={friend.id} name={friend.name}/>);

    return (
        <nav className={s.friends}>
           <h2>Friends</h2>
            {friendsElements}
            {/*<Friend id={friendsData[0].id} name={friendsData[0].name}/>*/}
            {/*<Friend id={friendsData[1].id} name={friendsData[1].name}/>*/}
            {/*<Friend id={friendsData[2].id} name={friendsData[2].name}/>*/}
        </nav>
    );
}

export default Friends;
