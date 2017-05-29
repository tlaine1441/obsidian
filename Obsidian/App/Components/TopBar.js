import React, { Component } from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

export default class TopBar extends Component {
  render() {
    return(
   		<View style={styles.topBar}></View>
    );
  }
}

const styles = StyleSheet.create({
	topBar: {
		height: 22,
		backgroundColor: '#D74242',
	},
});