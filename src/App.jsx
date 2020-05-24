import React from 'react';
import { Counter } from './features/counter/Counter';
import { UserList } from './features/userList/UserList';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <Counter />
                <UserList />
            </header>
        </div>
    );
}

export default App;
