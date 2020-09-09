import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
// import { Counter } from './features/counter/Counter';
import { UserList } from './features/user/list/user_list.tsx';
import { UserDetail } from './features/user/detail/user_detail.tsx';
import { Post_Detail } from './features/post/detail/post_detail';
import { Post_List } from './features/post/list/post_list';
import { Album_Detail } from './features/album/detail/album_detail';
import { AlbumList } from './features/album/list/album_list';
import WhereIAm from './components/where_i_am.tsx';
import Navbar from './components/Navbar.tsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <WhereIAm />
          <Switch>
            <Route exact path="/user" component={UserList} />
            <Route exact path="/user/:id" component={UserDetail} />
            <Route exact path="/album/" component={AlbumList} />
            <Route exact path="/album/:id" component={Album_Detail} />
            <Route exact path="/post/:id" component={Post_Detail} />
            <Route exact path="/post/" component={Post_List} />
            <Route exact path="/">
              <UserList />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>

    </div>
  );
}

export default App;
