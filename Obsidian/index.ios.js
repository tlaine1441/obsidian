import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './App/Components/common';
import LoginForm from './App/Components/LoginForm';
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
import { StackNavigator } from 'react-navigation';

class App extends Component {
	static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);

    this.state = {
      loggedIn: null
    };

    this.other = this.other.bind(this);
    this.back = this.back.bind(this);
  }

  other(){
  	this.setState({loggedIn: 'other'});
  }
   back(){
  	this.setState({loggedIn: true});
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
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <Home other={this.other}/>
      );
      case 'other':
      return (
      	<ProfileScreen back={this.back} />
      )
      case false:
        return <LoginForm />;
      default:
        return (
          <View alignSelf='center'>
            <Spinner size="large" />
          </View>);
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
  static navigationOptions = {
    header: null,
  };
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
       // this.setState({ newMessage: '' });
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
              <TouchableHighlight onPress={this.props.other} >
              <Image source={images.person} style={{width: 25, height: 25, marginLeft: 10}} />
              </TouchableHighlight>
            </View>
            <View style={{flex: 1, alignItems: 'center'}}>
            <Image source={images.logo} style={{ width: 35, height: 25}}/>
            </View>
            <View style={{flex: 1}}/>
          </View>
        </View>
        <View style={{marginTop: 200}}>
        <Text>{this.state.value}</Text>
          <CardSection>
            <Button onPress={() => sendMessage()}>
              Send
            </Button>
            <Button onPress={this.props.other}>
              Send
            </Button>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
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
              <TouchableHighlight onPress={this.props.back} >
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

const ObsidianApp = StackNavigator({
	Main: { screen: App },
  Home: { screen: Home },
  //Profile: { screen: ProfileScreen },
  });

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
