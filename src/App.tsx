import React, {useContext, useEffect} from 'react';
import Login from "./components/Login";
import Registration from "./components/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Context} from "./index";
import {observer} from "mobx-react-lite";
import Users from "./components/Users";
import CreatePost from "./components/CreatePost";

function App() {
    const {login} = useContext(Context)

    interface MyRoute {
        exact: boolean;
        path: string;
        component: JSX.Element
    }

    const routes: MyRoute[] = [
        {exact: true, path: "/registration", component: <Registration/>},
        {exact: false, path: "/login", component: <Login/>},
        {exact: false, path: "/users", component: <Users/>},
        {exact: false, path: "/createPost", component: <CreatePost/>}
    ]
    useEffect(() => {
       if(localStorage.getItem('token')) login.checkAuth()
    }, [])
    return (
        <div className="App">
            <h1>{login.isAuth ? `${login.user.email}` : 'Авторизуйтесь'}</h1>
            <BrowserRouter>
                <Routes>
                    {routes.map((r, key) => <Route key={key}
                                                   path={r.path}
                                                   element={r.component}
                        />
                    )}
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default observer(App);
