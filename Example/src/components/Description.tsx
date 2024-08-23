import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles';

type DescriptionProps = {
  text: string;
  children: React.ReactNode;
};

const Description = ({text, children}: DescriptionProps) => (
  <View style={styles.scrollViewElement}>
    <Text style={styles.text}>{text}</Text>
    {children}
  </View>
);
export default Description;
