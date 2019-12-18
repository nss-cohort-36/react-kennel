import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import AnimalList from './animal/AnimalList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import AnimalEditForm from './animal/AnimalEditForm'
import EmployeeList from './employee/EmployeeList'
import EmployeeWithAnimals from './employee/EmployeeWithAnimals'
import Callback from './auth/Callback'
import auth0Client from "./auth/Auth";

class ApplicationViews extends Component {
  render() {
    return (
      <React.Fragment>
        <Route exact path='/callback' component={Callback} />
        <Route exact path="/" render={(props) => {
          return <Home />
        }} />
        <Route exact path="/employees" render={props => {
          if (auth0Client.isAuthenticated()) {
            return <EmployeeList {...props} />
          } else {
            auth0Client.signIn();
            return <></>;
          }
        }} />
        <Route path="/employees/:employeeId(\d+)/details" render={(props) => {
          return <EmployeeWithAnimals {...props} />
        }} />
        {/* Make sure you add the `exact` attribute here */}
        <Route exact path="/animals" render={props => {
          if (auth0Client.isAuthenticated()) {
            return <AnimalList {...props} />
          } else {
            auth0Client.signIn();
            return <></>;
          }
        }} />
        {/*
  This is a new route to handle a URL with the following pattern:
  http://localhost:3000/animals/1

  It will not handle the following URL because the `(\d+)`
  matches only numbers after the final slash in the URL
  http://localhost:3000/animals/jack
*/}
        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          console.log("Props from react-router-dom", props)
          console.log("This component's props", this.props)
          // Pass the animalId to the AnimalDetailComponent
          return <AnimalDetail
            animalId={parseInt(props.match.params.animalId)}
            // history={props.history}
            // match={props.match}
            // location={props.location}
            {...props}
          />
        }} />
        <Route path="/animals/:animalId(\d+)/edit" render={props => {
          return <AnimalEditForm {...props} />
        }}
        />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props} />
        }} />
      </React.Fragment>
    )
  }
}

export default ApplicationViews
