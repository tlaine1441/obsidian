import React from 'react';
import { TextInput, Text, View, Image } from 'react-native';

import images from '../../Config/images';

const EmailInput = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image source={images.mail} style={{width: 25, height: 25, marginRight: 10}} />
    </View>
    <View style={{width: '100%'}}>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholderTextColor='rgba(216,216,216,0.4)'
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
      </View>
    </View>
  );
};

const styles = {
  inputStyle: {
    height: 40,
    width: '80%',
    color: 'rgba(216,216,216,0.4)'
  },
  containerStyle: {
    flexDirection: 'row',
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
  }
};

export { EmailInput };