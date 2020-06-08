import React from 'react';
import { Counter } from './features/counter/Counter';
import { UserList } from './features/user/user_list/user_list';
// import './App.css';

function App() {
    return (
        <div className="container">
            <div className="App">
                <header className="App-header">
                    <Counter />
                </header>
            </div>
            <div>
                <UserList />
            </div>
        </div>
    );
}

export default App;
