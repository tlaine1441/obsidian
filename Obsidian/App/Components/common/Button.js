import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Text style={textStyle}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    color: '#312F32',
    fontSize: 26,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    fontFamily: 'System',
    fontWeight: 'normal'
  },
  buttonStyle: {
    justifyContent: 'center', 
    alignItems: 'center',
    height: 59,
    backgroundColor: '#E2F8FD',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 20,
    marginBottom: 10
  }
};

export { Button };