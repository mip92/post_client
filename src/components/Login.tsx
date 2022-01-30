import React, {FC, useContext} from 'react';
import {useInput} from "../hooks/useInput";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Header from "./Header";

const Login:FC = () => {
    const password = useInput('')
    const email = useInput('')
    const {login}=useContext(Context)

    if (login.loading) return <div>Загрузка</div>
    return (
        <Header>
            <input {...email} placeholder='email' type='email'/>
            <input {...password} placeholder='password' type='password'/>
            <button onClick={() => login.login(email.value, password.value)}>Войти</button>
            {login.error && <div>{login.error}</div>}
        </Header>
    );
};

export default observer(Login);