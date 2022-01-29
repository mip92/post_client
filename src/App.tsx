import React from 'react';
import Login from "./components/Login";
import Registration from "./components/Registration";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    interface MyRoute {
        exact: boolean;
        path: string;
        component: JSX.Element
    }
    const routes:MyRoute[] = [
        {exact: true, path: "/registration", component: <Registration/>},
        {exact: false, path: "/login", component: <Login/>}
    ]
    // @ts-ignore
    return (
        <div className="App">
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

export default App;
