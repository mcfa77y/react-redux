import React from 'react';
import {
  Switch, Route, BrowserRouter,
} from 'react-router-dom';
// import { Counter } from './features/counter/Counter';
import { UserList } from './features/user/list/user_list';
import { Customer_List } from './features/customer/list/customer_list.tsx';
import ReportList from './features/report/list/report_list.tsx';
import ReportDetail from './features/report/detail/report_detail.tsx';
import { Customer_Detail } from './features/customer/detail/customer_detail.tsx';
import { User_Detail } from './features/user/detail/user_detail';
import { Post_Detail } from './features/post/detail/post_detail';
import { Album_Detail } from './features/album/detail/album_detail';
import { Login } from './features/login/login.tsx';
import { Navbar } from './components/navbar.tsx';
import WhereAmI from './components/where_am_i.tsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <div className="App">
          <WhereAmI />
          <Switch>
            <Route exact path="/user/:id" component={User_Detail} />
            <Route exact path="/user/" component={UserList} />
            <Route exact path="/customer/" component={Customer_List} />
            <Route exact path="/customer/:id" component={Customer_Detail} />
            <Route exact path="/report/" component={ReportList} />
            <Route exact path="/report/:id" component={ReportDetail} />
            <Route exact path="/album/:id" component={Album_Detail} />
            <Route exact path="/post/:id" component={Post_Detail} />
            <Route exact path="/">
              <Login />
            </Route>
          </Switch>
        </div>
      </div>
    </BrowserRouter>

  );
}

export default App;
