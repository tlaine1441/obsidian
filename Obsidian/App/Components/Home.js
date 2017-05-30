import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList, 
  ScrollView
} from 'react-native';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';
import TopBar from './TopBar';
import images from '../Config/images';
import { StackNavigator } from 'react-navigation';

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
        <View style={{marginTop: 200}}>
        <Text>{this.state.value}</Text>
          <CardSection>
            <Button onPress={() => sendMessage()}>
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

export default Home;