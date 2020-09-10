import React from 'react';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Insights</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={`/customer`} className="nav-link">Customer</Link>
            </li>
            <li className="nav-item">
              <Link to={`/report`} className="nav-link">Report</Link>
            </li>
            <li className="nav-item">
              <Link to={`/user`} className="nav-link">Users</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

// export default Navbar;
