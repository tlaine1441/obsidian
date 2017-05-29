import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Image,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import NavBar from './App/Components/NavBar';
import TopBar from './App/Components/TopBar';
import CurrencyBlock from './App/Components/CurrencyBlock';
import images from './App/Config/images';

export default class Obsidian extends Component {
  //  static navigationOptions = {
  //   title: <Image source={images.logo} style={{ width: 35, height: 25}}/>,
  //   headerRight: <Button color={screenProps.tintColor} {...} />,
  // };
  static navigationOptions = {
    header: null,
  };

  render() {
    const { navigate } = this.props.navigation;
    let names=[{name: 'Ethereums', amount: 65.72, shares: 32}, {name: 'Bitcoin',  amount: 125.32, shares: 42}, {name: 'NXT', amount: 140.52, shares: 25}];
    let nameList = names.map(function(currencies, index) {
      return <CurrencyBlock key={index} name = {currencies.name} amount={currencies.amount} shares={currencies.shares}/>
    });
    return (
      <View style={styles.background}>
        <TopBar />
        <View style={styles.nav}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight onPress={() => navigate('Profile')} >
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
          <View style={{
            flex: 1,
            flexDirection: 'column',
          }}>{nameList}</View>
        </View>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  static navigationOptions = {
    header: null
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
      <TopBar />
      <View style={styles.nav}>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <TouchableHighlight onPress={() => navigate('Home')} >
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
  Home: { screen: Obsidian },
  Profile: { screen: ProfileScreen },
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

AppRegistry.registerComponent('Obsidian', () => ObsidianApp);
