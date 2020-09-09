import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/">Navbar</a>
            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item active">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/user">User</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/post">Post</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/comment">comment</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/album">album</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/photo">photo</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/todo">todo</Link>
                    </li>
                    
                </ul>
            </div>
        </nav>
    )
}
