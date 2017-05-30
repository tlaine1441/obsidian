import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './App/Components/common';
import LoginForm from './App/Components/LoginForm';
import ProfileScreen from './App/Components/ProfileScreen';
import Home from './App/Components/Home';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      router: null
    };
    this.toProfile = this.toProfile.bind(this);
    this.toHome = this.toHome.bind(this);
  }

  toProfile(){
  	this.setState({router: 'ProfileScreen'});
  }
  toHome(){
  	this.setState({router: 'loggedInHome'});
  }

  componentWillMount() {
	  firebase.initializeApp({
	    apiKey: "AIzaSyA9W-y3LEHDnkWyGZ_ynmnWkLS2XiD0t9I",
	    authDomain: "obsidian-a9f75.firebaseapp.com",
	    databaseURL: "https://obsidian-a9f75.firebaseio.com", 
	    storageBucket: "obsidian-a9f75.appspot.com",
	    messagingSenderId: "38380095952"
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
        <Home toProfile={this.toProfile}/>
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

AppRegistry.registerComponent('Obsidian', () => App);
