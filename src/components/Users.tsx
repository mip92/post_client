import React, {useContext, useEffect} from 'react';
import {Context} from "../index";
import Header from "./Header";
import {observer} from "mobx-react-lite";

const Users = () => {
    const {users} = useContext(Context)
    useEffect(() => {
        users.fetchUsers(0,5)
    }, [])
    return (
        <Header>
            {users.users.map((u,key)=><div key={key}>{u.email}</div>)}
        </Header>
    );
};

export default observer(Users);