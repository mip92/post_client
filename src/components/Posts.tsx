import React, {useContext, useEffect} from 'react';
import Header from "./Header";
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useParams} from "react-router-dom";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Posts = () => {
    const params =useParams()
    const {posts, login}=useContext(Context)
    useEffect(()=>{
        posts.fetchPosts(0,5,Number(params.userId))
    },[])
    const createPost=(userId:number, header:string, text:string)=>{
        posts.createPost(userId, header, text)
    }

    if (posts.loading) return <div>Загрузка</div>
    return (
        <Header>
            {posts.posts.map((post,key)=><Post key={key} post={post}/>)}
            {(Number(params.userId) == login.user.id) && <CreatePost createPost={createPost}/>}
        </Header>
    );
};

export default observer(Posts);