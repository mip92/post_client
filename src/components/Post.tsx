import React, {FC, useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {IPost} from '../models/IPost'
import {Box} from "@mui/material";
import {useFetching} from "../hooks/useFetching";
import $api from "../http";
import {User} from "../models/response/UserResponse"
import Button from "@mui/material/Button";
import {useNavigate, useParams} from "react-router-dom";
import {Context} from "../index";

interface PostProps {
    post: IPost,
}

const Post: FC<PostProps> = ({post}) => {
    const params=useParams()
    const {login}=useContext(Context)
    const [isUpdated, setUpdate] = useState<boolean>(false)
    const date = new Date(post.updatedAt)
    const navigate = useNavigate();
    const [author, setAuthor] = useState<User>({} as User)
    const [fetchAuthor, isLoading, error] = useFetching(async () => {
        const res = await $api.get<User>(`${process.env.REACT_APP_SERVER_URL}/api/user/${post.userId}`)
        setAuthor(res.data)
    })
    const goTo = (id: number) => {
        navigate(`/user/${id}`);
    }
    useEffect(() => {
        fetchAuthor()
    }, [post.userId])
    if (isUpdated) return <div>123</div>
    else return (
        <Box>
            <h2>{post.header}</h2>
            <p>{post.text}</p>
            <div>{`Дата: ${date.getFullYear()}:${date.getMonth() + 1}:${date.getDate()} ${date.getHours()}:${date.getMinutes()}`}</div>
            Автор: <Button onClick={() => goTo(post.userId)}>{author.name}</Button>
            {(Number(params.userId) == login.user.id) && <Button onClick={() => setUpdate(true)}>Редактировать</Button>}
            {(Number(params.userId) == login.user.id) && <Button onClick={() => setUpdate(true)}>Удалить</Button>}
        </Box>

    );
};

export default observer(Post);