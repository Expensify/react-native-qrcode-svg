import QRCode, {QRCodeProps} from 'react-native-qrcode-svg';
import {Text, View} from 'react-native';
import React from 'react';
import styles from '../styles';

type QRCodeWithDescriptionProps = {
  text: string;
  qrCode: QRCodeProps;
};

const QRCodeWithDescription = ({text, qrCode}: QRCodeWithDescriptionProps) => (
  <View style={styles.scrollViewElement}>
    <Text style={styles.text}>{text}</Text>
    <QRCode {...qrCode} />
  </View>
);
export default QRCodeWithDescription;
