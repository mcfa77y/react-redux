import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
// import { Counter } from './features/counter/Counter';
import { UserList } from './features/user/list/user_list';
import { User_Detail } from './features/user/detail/user_detail';
import { Post_Detail } from './features/post/detail/post_detail';
import { Album_Detail } from './features/album/detail/album_detail';

function App() {
  return (
    <div className="container">
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/user/:id" component={User_Detail} />
            <Route exact path="/album/:id" component={Album_Detail} />
            <Route exact path="/post/:id" component={Post_Detail} />
            <Route exact path="/">
              <UserList />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>

    </div>
  );
}

export default App;
