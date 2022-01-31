import React, {FC, useContext} from 'react';
import {useInput} from "../hooks/useInput";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {IPost} from "../models/IPost";

interface CreatePostProps {
    createPost: (userId: number, header: string, text: string)=> void,
}
const CreatePost:FC<CreatePostProps> = ({createPost}) => {
    const {login}=useContext(Context)
    const header =useInput('')
    const text = useInput('')
    return (
        <div>
            <input {...header} placeholder='header'/>
            <input {...text} placeholder='text'/>
            <button onClick={() =>createPost(login.user.id, header.value, text.value) }>Создать</button>
        </div>
    );
};

export default observer(CreatePost);