import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from "./store/login";
import Users from "./store/users";
import Posts from "./store/posts";

interface ISrore {
    login: Login,
    users: Users,
    posts:Posts
}
const login = new Login()
const users =new Users()
const posts = new Posts()
export const Context = createContext<ISrore>({
    login,
    users,
    posts
})
ReactDOM.render(
  <React.StrictMode>
      <Context.Provider value={{login, users, posts}}>
          <App />
      </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

