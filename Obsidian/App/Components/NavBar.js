import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

import images from '../Config/images';


import { StackNavigator } from 'react-navigation';

export default class Navbar extends Component {
  render() {
    return(
    <View style={styles.nav}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <TouchableHighlight onPress={() => navigate('Chat')} >
          <Image source={images.person} style={{width: 25, height: 25, marginLeft: 10}} />
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
      	<Image source={images.logo} style={{ width: 35, height: 25}}/>
        </View>
        <View style={{flex: 1}}/>
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
});