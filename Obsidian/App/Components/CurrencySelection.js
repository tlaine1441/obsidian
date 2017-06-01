import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native';
import firebase from 'firebase';

export default class CurrencySelection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watch: null
    };

    this.trackCurrency = this.trackCurrency.bind(this);
  }

  componentWillMount() { 
    const { currentUser } = firebase.auth();
    const self = this;
    firebase.database().ref().child('users').child(`${currentUser.uid}`).on('value', function(snapshot) {
      let data = snapshot.val();
      if(data.tracking.includes(self.props.name)){
        self.setState({watch: true});
      } else {
        self.setState({watch: false});
      }
    });
  }

  renderButton() {
    switch (this.state.watch) {
      case false:
      return (
        <WatchButton track = {this.trackCurrency}/>
      );
      case true:
      return (
        <UnwatchButton track = {this.trackCurrency} />
      );
      default:
        return (
         <LoadingButton />
        );
    }
  }

  trackCurrency() {
    var temp = this.props.updateTracking(this.props.name);
  }

  render() {
    return(
      <View style={styles.wrapper}>
      <View style={{width: '60%'}}>
        <Text style={styles.name}>{this.props.name}</Text>
        </View>
        
        <View style={styles.buttonCol}>
          {this.renderButton()}
        </View>
      </View>
    );
  }
}

class WatchButton extends Component {
  render() {
    return(
      <TouchableOpacity onPress={this.props.track} style={styles.watchButtonStyle}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>
        <Text style={{height: 20, width: 50, textAlign: 'center', fontSize: 12}}>
          Watch
        </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class UnwatchButton extends Component {
  render() {
    return(
      <TouchableOpacity onPress={this.props.track} style={styles.unwatchButtonStyle}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>
        <Text style={{height: 20, width: 50, textAlign: 'center', fontSize: 12, color: '#ffffff',}}>
          Unwatch
        </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class LoadingButton extends Component {
  render() {
    return(
      <TouchableOpacity onPress={this.props.trackCurrency} style={styles.watchButtonStyle}>
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop: 5}}>
        <Text style={{height: 20, width: 50, textAlign: 'center', fontSize: 12, color: '#333333',}}>
          Loading...
        </Text>
        </View>
      </TouchableOpacity>
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
    fontSize: 20, 
    paddingTop: 25, 
    paddingLeft: 15
  },
  amount: {
    flex: 1, 
    color: '#2FBC22', 
    fontSize: 18, 
    paddingTop: 28,
    textAlign: 'center'
  },
  buttonCol: {
    paddingTop: 25, 
    paddingRight: 15,
    width: '40%',
    alignItems: 'flex-end'
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
  watchButtonStyle: {
    width: 90,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center', 
    alignItems: 'center'
  },
  unwatchButtonStyle: {
    width: 90,
    height: 30,
    borderRadius: 18,
    backgroundColor: '#333333',
    justifyContent: 'center', 
    alignItems: 'center'
  }
});