import React, {useContext} from 'react';
import {useInput} from "../hooks/useInput";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const CreatePost = () => {
    const {newPost,login}=useContext(Context)
    const header =useInput('')
    const text = useInput('')
    return (
        <div>
            <input {...header} placeholder='header'/>
            <input {...text} placeholder='text'/>
            <button onClick={() => newPost.createPost(login.user.id,header.value, text.value)}>Создать</button>
        </div>
    );
};

export default observer(CreatePost);