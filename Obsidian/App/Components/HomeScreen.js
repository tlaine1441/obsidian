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
import TopBar from './TopBar';
import images from '../Config/images';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';
import ProfileScreen from './ProfileScreen';


export default class HomeScreen extends Component {
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