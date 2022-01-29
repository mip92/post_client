import React from 'react';
import {useInput} from "../hooks/useInput";
import {useFetching} from "../hooks/useFetching";
import axios from "axios";

const Registration = () => {
    const name = useInput('')
    const password = useInput('')
    const email = useInput('')
    const [registration, isLoading, error] = useFetching(async () => {
        console.log(process.env.REACT_APP_SERVER_URL)
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/login/registration`, {
            email: email.value,
            name: name.value,
            password: password.value
        })
    })
    if (isLoading) return <div>Загрузка</div>
    return (
        <div>
            <input {...name} placeholder='name'/>
            <input {...password} placeholder='password'/>
            <input {...email} placeholder='email'/>
            <button onClick={() => registration()}>Регистрация</button>
            {error && <div>{error}</div>}
        </div>
    );
};

export default Registration;