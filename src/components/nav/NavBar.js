import React, { Component } from 'react';
import { Link } from "react-router-dom"
import './NavBar.css'

class NavBar extends Component {

  render(){

    return (
      <header>
        <h1 className="site-title">Student Kennels<br />
          <small>Loving care when you're not there.</small>
        </h1>
        <nav>
          <ul className="container">
            <li><Link className="nav-link" to="/">Home</Link></li>
            {(this.props.user) ? <li><Link className="nav-link" to="/animals">Animals</Link></li> : null }
            <li>Locations</li>
            {(this.props.user) ? <li><Link className="nav-link" to="/employees">Employees</Link></li> : null }
            <li>Owners</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default NavBar;
