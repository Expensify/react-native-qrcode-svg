import React from 'react';
import { View, Text } from 'react-native';

export default function({ children }) {
  return (
    <View>
      {children}  
    </View>
  );
}

export const Rect = () => {
  return (
    <Text>Rect</Text>
  );
};

export const Path = () => {
  return (
    <Text>Path</Text>
  );
};

