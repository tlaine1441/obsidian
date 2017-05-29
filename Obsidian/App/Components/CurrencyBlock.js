import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class Currency extends Component {
  render() {
    return(
      <View style={styles.wrapper}>
        <Text style={styles.name}>{this.props.name}</Text>
        <Text style={styles.amount}>${this.props.amount}</Text>
        <View style={styles.inBudgetCol}>
          <Text style={styles.shares}>{this.props.shares}</Text>
          <Text style={styles.inBudgetText}>in budget</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row', 
    height: 70
  },
  name: {
    flex: 1, 
    color: '#fff',
    fontSize: 22, 
    paddingTop: 25, 
    paddingLeft: 15
  },
  amount: {
    flex: 1, 
    color: '#2FBC22', 
    fontSize: 16, 
    paddingTop: 28,
    textAlign: 'center'
  },
  inBudgetCol: {
    flex: 1, 
    flexDirection: 'column'
  },
  shares: {
    flex: 2, 
    color: '#fff', 
    fontSize: 22, 
    paddingTop: 25,
    paddingBottom: 5,
    textAlign: 'center'

  },
  inBudgetText: {
    flex: 2, 
    fontSize: 12,
    textAlign: 'center', 
    color: '#9B9B9B'
  },
});