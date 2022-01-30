import React, {createContext} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from "./store/login";
import Users from "./store/users";
import NewPost from "./store/newPost";

interface ISrore {
    login: Login,
    users: Users,
    newPost: NewPost
}
const login = new Login()
const users =new Users()
const newPost = new NewPost()
export const Context = createContext<ISrore>({
    login,
    users,
    newPost
})
ReactDOM.render(
  <React.StrictMode>
      <Context.Provider value={{login, users, newPost}}>
          <App />
      </Context.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

