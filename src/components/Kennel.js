import React, { Component } from 'react'
import './Kennel.css'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';

class Kennel extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default Kennel
