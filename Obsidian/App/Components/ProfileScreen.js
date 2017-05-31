import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  FlatList, 
  ScrollView,
  TextInput
} from 'react-native';
import TopBar from './TopBar';
import images from '../Config/images';
import firebase from 'firebase';
import { Button, CardSection, Spinner } from './common';
import LoginForm from './LoginForm';
import CurrencySelection from './CurrencySelection';
import axios from 'axios';

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: '',
      userEmail: '',
      editing: false,
      newBalance: null
    };
    this.updateTracking = this.updateTracking.bind(this);
  }
  componentDidMount() {
    const { currentUser } = firebase.auth();
    var self = this;
    sendMessage = () => {
       //console.log('sendMessage.');
       var updates = {};
       updates[`users/${currentUser.uid}/`] =
        {
          'name': 'John Smith',
          'tracking': ['Btc'],
          'balance': '1,000'
        }
       firebase.database().ref().update(updates);
       // this.setState({ newMessage: '' });
     }
      firebase.database().ref().child('users').child(`${currentUser.uid}`).on('value', function(snapshot) {
          //console.log(snapshot.val());
          let data = snapshot.val();
          self.setState({userData: data});
          self.setState({userEmail: currentUser.email});
          self.setState({newBalance: data.balance})
          console.log(self.state.newBalance);
      });

     axios.get('http:/localhost:3000/')
     .then(res => {
      //console.log(res.data);
       const currencies = res.data;
       currencies.watching = true;
       this.setState({ info: currencies });
       console.log(this.state.info);
     });
  }

  editState() {
    this.setState({editing: !this.state.editing});
    console.log(this.state.editing);
  }

  submitEdit() {
    let temp = this.state.userData;
    temp.balance = this.state.newBalance;
    const { currentUser } = firebase.auth();
    var updates = {};
    updates[`users/${currentUser.uid}/`] = temp
    firebase.database().ref().update(updates);
    this.setState({editing: false});
  }

  updateTracking(name) {
    console.log(name);
    let temp = this.state.userData;
    console.log(temp);
    temp.tracking.push(name);
    console.log(temp.tracking);

  }

  renderBalance() {
    switch (this.state.editing) {
      case false:
      return (
        <Text style={{fontSize: 22, color: '#2FBC22'}}>${this.state.userData.balance ? this.state.userData.balance : 0 }</Text>
      );
      case true:
      return (
        <View style={{justifyContent: 'center', alignItems: 'center', width: '90%', flexDirection: 'row'}}>
        <View style={{width: '80%', paddingTop: 10}}>
        <TextInput
          placeholderTextColor='#333333'
          placeholder={this.state.userData.balance}
          style={styles.editBalance}
          onChangeText={(text) => this.setState({newBalance: text})}
        />
        </View>
        <View style={{width: '20%'}}>
        <TouchableHighlight onPress={() => this.submitEdit()}style={{alignItems: 'center'}} >
           <Image source={images.check} style={{width: 25, height: 25}} />
        </TouchableHighlight>
        </View>
      
        </View>
      );
      default:
        return (
         <Text style={{fontSize: 22, color: '#2FBC22'}}>${this.state.userData.balance ? this.state.userData.balance : '0'}</Text>
        );
    }
  }

  // Get unique keys from data
   _keyExtractor = (item, index) => item.data.id;

   // Render Currency block factory
   renderItem = ({item}) => {
    console.log(item);
    return (
      <CurrencySelection key={item.data.id} name = {item.name} watching = {item.watching} updateTracking = {this.updateTracking} />
    )
  }
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
            <View style={{flex: 1}}>
            <TouchableHighlight onPress={() => firebase.auth().signOut()} >
              <Text style={{textAlign: 'right', paddingRight: 10}}>Logout</Text>
            </TouchableHighlight>
            </View>
            </View>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.editButtonRow}>
              <TouchableHighlight onPress={() => this.editState()} >
                <Image source={images.edit} style={{width: 20, height: 20}} />
              </TouchableHighlight>
            </View>
            <Image source={images.avatar} style={{width: 113, height: 113}} />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={{fontSize: 24, color: '#D8D8D8'}}>{this.state.userData.name}</Text>
            <Text style={{fontSize: 12, color: '#D8D8D8'}}>{this.state.userEmail}</Text>
          </View>

        </View>
        <View style={styles.ballanceContainer}>
          <Text style={{fontSize: 26, color: '#312F32'}}>Balance</Text>
          {this.renderBalance()}
        </View>
        <View style={styles.selectionContainer}>
        <FlatList
              data={this.state.info}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   nav: {
    backgroundColor: '#DC6464',
    height: 50,
    paddingTop: 15,
  },
  mainContainer: {
    height: 250,
    backgroundColor: '#312F32',
  },
  ballanceContainer: {
    height: 100,
    backgroundColor: '#E2F8FD',
    alignItems: 'center',
    justifyContent: 'center'
  },
  selectionContainer: {
    backgroundColor: '#DC6464',
    height: 300
  },
  avatarContainer: {
    height:'60%',
    marginTop: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  userInfoContainer: {
    height:'40%',
    alignItems: 'center'
  },
  editButtonRow: {
    width: '100%',
    height: 20, 
    paddingRight: 20, 
    alignItems: 'flex-end', 
    marginBottom: 20
  },
  editBalance: {
    height: 30, 
    textAlign: 'center', 
    borderColor: 'skyblue', 
    borderWidth: 2, 
    borderRadius: 18, 
    marginBottom: 10
  },

});