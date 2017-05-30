import React, { Component } from 'react';
import { Text, StyleSheet, View, Image, } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
import images from '../Config/images';

class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };

  onButtonPress() {
    const { email, password } = this.state;

    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
          });
  }

  onLoginFail() {
    this.setState({ error: 'Authentication Failed.', loading: false });
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }


    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log In
      </Button>
    );
  }

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.logoContainer}>
          <Image source={images.login_logo} style={{ width: 95, height: 75}}/>

        </View>
        <View style={styles.inputContainer} >
        <Input 
            placeholder="user@email.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
          />

           <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  },
   background: {
    height: '100%',
    backgroundColor: '#1F2223',
  },
  logoContainer: {
    paddingTop: 100,
    height: 200, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  inputContainer: {
    padding: 40,
    height: '60%',
  },
});

export default LoginForm;