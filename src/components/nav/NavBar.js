import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom"
import './NavBar.css'
import auth0Client from '../auth/Auth';

class NavBar extends Component {

  handleLogout = () => {
    auth0Client.signOut();
    this.props.history.replace('/');
  }

  render() {
    return (
      <header>
        <h1 className="site-title">Student Kennels<br />
          <small>Loving care when you're not there.</small>
        </h1>
        <nav>
          <ul className="container">
            <li><Link className="nav-link" to="/">Home</Link></li>
            <li>Locations</li>
            {auth0Client.isAuthenticated() &&
              <>
                <li><Link className="nav-link" to="/animals">Animals</Link></li>
                <li><Link className="nav-link" to="/employees">Employees</Link></li>
                <li>Owners</li>
                <li>
                  <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                </li>
                <li>
                  <button className="btn btn-dark" onClick={() => { this.handleLogout() }}>Sign Out</button>
                </li>
              </>
            }
            {!auth0Client.isAuthenticated() &&
              <button className="btn btn-dark" onClick={auth0Client.signIn}>Sign In</button>

            }

          </ul>
        </nav>
      </header>
    )
  }
}

export default withRouter(NavBar);
