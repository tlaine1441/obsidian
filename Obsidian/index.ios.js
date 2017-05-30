import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList, 
  ScrollView
} from 'react-native';
import TopBar from './App/Components/TopBar';
import images from './App/Config/images';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './App/Components/common';
import LoginForm from './App/Components/LoginForm';

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

class Home extends Component {
   constructor(props) {
    super(props);
    this.state = {value: ''};
  }

  componentDidMount() {
    var self = this;
    const { currentUser } = firebase.auth();

    sendMessage = () => {
       console.log('sendMessage.');
       const { currentUser } = firebase.auth();
       var updates = {};
       updates[`users/${currentUser.uid}/`] =
        {'test': ["1",2,5]}
       firebase.database().ref().update(updates);
    }

    firebase.database().ref().child('users').child(`${currentUser.uid}`).child('test').on('value', function(snapshot) {
	    console.log(snapshot.val());
	    let value = snapshot.val();
	    self.setState({value: value});
    });
  }

  render() {
    return (
      <View style={styles.background}>
        <TopBar />
        <View style={styles.nav}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight onPress={this.props.toProfile} >
              <Image source={images.person} style={{width: 25, height: 25, marginLeft: 10}} />
              </TouchableHighlight>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
            <Image source={images.logo} style={{ width: 35, height: 25}}/>
            </View>
            <View style={{flex: 1}}/>
          </View>
        </View>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return (
      <View>
      <TopBar />
      <View style={styles.nav}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight onPress={this.props.toHome} >
              <Image source={images.back} style={{width: 25, height: 25, marginLeft: 10}} />
              </TouchableHighlight>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
            <Image source={images.logo} style={{ width: 35, height: 25}}/>
            </View>
            <View style={{flex: 1}}/>
          </View>
        </View>
        <View style={{marginTop: 200}}>
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    margin: 10,
    backgroundColor: '#312F32',
  },
  background: {
    height: '100%',
    backgroundColor: '#1F2223',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
   nav: {
    backgroundColor: '#DC6464',
    height: 50,
    paddingTop: 15,
  },
});

AppRegistry.registerComponent('Obsidian', () => App);
