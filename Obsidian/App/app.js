// Import React and Component from react
import React, { Component } from 'react';

// Import View
import {
  View
} from 'react-native';

// Import firebase
import firebase from 'firebase';

// Import Common Components
import { Button, CardSection, Spinner } from './Components/common';

// Import LoginForm Component
import LoginForm from './Components/LoginForm';

// Import ProfileScreen Component
import ProfileScreen from './Components/ProfileScreen';

// Import HomeScreen Component
import HomeScreen from './Components/HomeScreen';

import config from './Config/config';


// Create Main App Component
export default class App extends Component {

  // Base constructor to set state and bind functions
  constructor(props) {
    super(props);
    this.state = {
      router: null
    };

    // bindings
    this.toProfile = this.toProfile.bind(this);
    this.toHome = this.toHome.bind(this);
  } // end constructor

  // toProfile function sets router state to 'ProfileScreen'
  toProfile(){
    this.setState({router: 'ProfileScreen'});
  }

  // toHome function sets router state to 'HomeScreen'
  toHome(){
    this.setState({router: 'loggedInHome'});
  }

  // Will Mount
  componentWillMount() {

    // Initialize FireBase
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL, 
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ router: 'loggedInHome' });
      } else {
        this.setState({ router: 'loggedOut' });
      }
    });
  }

  renderContent() {
    switch (this.state.router) {
      case 'loggedInHome':
      return (
        <HomeScreen toProfile={this.toProfile}/>
      );
      case 'ProfileScreen':
      return (
        <ProfileScreen toHome={this.toHome} />
      )
      case 'loggedOut':
        return <LoginForm />;
      default:
        return (
          <View alignSelf='center'>
            <Spinner size="large" />
          </View>
        );
    }
  }

  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}