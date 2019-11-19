import React, { Component } from 'react'
import './Kennel.css'
import NavBar from './nav/NavBar'
import ApplicationViews from './ApplicationViews';

class Kennel extends Component {
  render() {
    return (
      <>
        <NavBar />
        <ApplicationViews />
      </>
    );
  }
}

export default Kennel
