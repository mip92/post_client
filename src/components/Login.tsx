import React, {FC} from 'react';
import {useInput} from "../hooks/useInput";
import {useFetching} from "../hooks/useFetching";
import axios from "axios";

const Login:FC = () => {
    const password = useInput('')
    const email = useInput('')
    const [login, isLoading, error] = useFetching(async () => {
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/login`, {
            email: email.value,
            password: password.value
        })
    })
    if (isLoading) return <div>Загрузка</div>
    return (
        <div>
            <input {...email} placeholder='email' type='email'/>
            <input {...password} placeholder='password' type='password'/>
            <button onClick={() => login()}>Войти</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Login;