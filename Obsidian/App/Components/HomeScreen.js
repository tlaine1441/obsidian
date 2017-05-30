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
import axios from 'axios';
import CurrencyBlock from './CurrencyBlock';

export default class HomeScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      info: []
    };
  }

  componentDidMount() {
     axios.get('http:/localhost:3000/')
       .then(res => {
        //console.log(res.data);
         const currencies = res.data;
         this.setState({ info: currencies });
         console.log(this.state.info);
       });
   }

   _keyExtractor = (item, index) => item.data.id;

   renderItem = ({item}) => {
    console.log(item);
    return (
      <CurrencyBlock key={item.data.id} name = {item.name} amount={item.data.last} shares={item.shares}/>
    )
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

        <View style={styles.container}>
          <View style={{flex: 1, flexDirection: 'column',}}>
            <FlatList
              data={this.state.info}
              renderItem={this.renderItem}
              keyExtractor={this._keyExtractor}
            />
          </View>
        </View>
      </View>
    );
  }
}

// Create styles
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