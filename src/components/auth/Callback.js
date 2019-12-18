import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from './Auth';

class Callback extends Component {
  async componentDidMount() {
    await auth0Client.handleAuthentication();
    // The getProfile method allows you to get information about the logged in user. Use the "aud" or "sub" property to tie the user in your database to the user in Auth). This means you will add a new property for example, called "auth0Id", to your user object.
    console.log(auth0Client.getProfile())

    //Make a fetch call to see if this user exists in your API
    // If they do, put their creds in session/local Storage
    // If they don't, create the user and then put their creds in session/local storage
    this.props.history.replace('/');
  }

  render() {
    return (
      <p>Loading profile...</p>
    );
  }
}

export default withRouter(Callback);
