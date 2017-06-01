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

import axios from 'axios';


// Create Main App Component
export default class App extends Component {

  // Base constructor to set state and bind functions
  constructor(props) {
    super(props);
    this.state = {
      router: null,

    };

    // bindings
    this.toProfile = this.toProfile.bind(this);
    this.toHome = this.toHome.bind(this);
    this.holdState = this.holdState.bind(this);
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
  console.disableYellowBox = true;
    // Initialize FireBase
    firebase.initializeApp({
      apiKey: config.apiKey,
      authDomain: config.authDomain,
      databaseURL: config.databaseURL, 
      storageBucket: config.storageBucket,
      messagingSenderId: config.messagingSenderId
    });

    // Check if user is authorizied and change state accoridingly
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ router: 'loggedInHome' });
      } else {
        this.setState({ router: 'loggedOut' });
      }
    });
    //https://obsidianapi.herokuapp.com/api/
     axios.get('http://localhost:3000')
       .then(res => {
        //console.log(res.data);
         const currencies = res.data;
         this.setState({ info: currencies });
         console.log(this.state.info);
      }); 
  }

  holdState(data) {
    const { currentUser } = firebase.auth();
      const self = this;
      firebase.database().ref().child('users').child(`${currentUser.uid}`).on('value', function(snapshot) {
      //console.log(snapshot.val());
      let data = snapshot.val();
      self.setState({userData: data});
      //console.log(self.state.userTracking);
    });
  }

  // render diffrent sceens depended on state
  renderContent() {
    switch (this.state.router) {
      case 'loggedInHome':
      return (
        <HomeScreen apiData = {this.state.info} toProfile={this.toProfile}/>
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

  // render content from whatever gets called in renderconent()
  render() {
    return (
      <View>
        {this.renderContent()}
      </View>
    );
  }
}