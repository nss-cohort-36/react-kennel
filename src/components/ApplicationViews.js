import { Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react'
import Home from './home/Home'
import AnimalList from './animal/AnimalList'
import AnimalDetail from './animal/AnimalDetail'
import AnimalForm from './animal/AnimalForm'
import Login from './auth/Login'
import AnimalEditForm from './animal/AnimalEditForm'
//only include these once they are built - previous practice exercise
// import LocationCard from './location/LocationCard'
// import EmployeeCard from './employee/EmployeeCard'
// import OwnerCard from './owner/OwnerCard'


class ApplicationViews extends Component {

  // Check if credentials are in local storage
  //returns true/false
  isAuthenticated = () => localStorage.getItem("credentials") !== null

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={(props) => {
          return <Home />
        }} />
        {/* Make sure you add the `exact` attribute here */}
        <Route exact path="/animals" render={props => {
          if (this.isAuthenticated()) {
            return <AnimalList {...props} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
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
        <Route path="/login" component={Login} />
        {/*
  This is a new route to handle a URL with the following pattern:
  http://localhost:3000/animals/1

  It will not handle the following URL because the `(\d+)`
  matches only numbers after the final slash in the URL
  http://localhost:3000/animals/jack
*/}
      </React.Fragment>
    )
  }
}

export default ApplicationViews
