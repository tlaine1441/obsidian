import React from 'react';
import { TextInput, Text, View } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;
  return (
    <View style={containerStyle}>
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
  );
};

const styles = {
  inputStyle: {
    height: 40,
    color: 'rgba(216,216,216,0.4)'
  },
  containerStyle: {
    borderBottomColor: '#979797',
    borderBottomWidth: 1
  }
};

export { Input };