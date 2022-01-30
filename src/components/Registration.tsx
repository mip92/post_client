import React, {useContext} from 'react';
import {useInput} from "../hooks/useInput";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Header from "./Header";

const Registration = () => {
    const name = useInput('')
    const password = useInput('')
    const email = useInput('')
    const {login}=useContext(Context)

    if (login.loading) return <div>Загрузка</div>
    return (
        <div>
            <input {...name} placeholder='name'/>
            <input {...password} placeholder='password'/>
            <input {...email} placeholder='email'/>
            <button onClick={() => login.registration(name.value,email.value,password.value)}>Регистрация</button>
            {login.error && <div>{login.error}</div>}
        </div>
    );
};

export default observer(Registration);