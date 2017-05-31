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
import CurrencySelection from './CurrencySelection';

export default class ProfileScreen extends React.Component {
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
            <Image source={images.avatar} style={{width: 113, height: 113}} />
          </View>
          <View style={styles.userInfoContainer}>
            <Text style={{fontSize: 24, color: '#D8D8D8'}}>John Smith</Text>
            <Text style={{fontSize: 12, color: '#D8D8D8'}}>johnsmith@gmail.com</Text>
          </View>

        </View>
        <View style={styles.ballanceContainer}>
          <Text style={{fontSize: 26, color: '#312F32'}}>Balance</Text>
          <Text style={{fontSize: 22, color: '#2FBC22'}}>$1,000</Text>
        </View>
        <View style={styles.selectionContainer}>
        <CurrencySelection/>
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
    marginTop: 30,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  userInfoContainer: {
    height:'40%',
    alignItems: 'center'
  },
});