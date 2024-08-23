import React from 'react';
import {ScrollView, Text, SafeAreaView} from 'react-native';
import styles from './styles';
import Description from './components/Description';
import QRCode from 'react-native-qrcode-svg';

const googleUrl = 'https://www.google.com/';
const qrCodeSize = 200;
const logoSize = 100;

const defaultQRCode = (
  <Description text="Default QR code">
    <QRCode />
  </Description>
);

const colorfulQRCODe = (
  <Description text="QR code with changed colors">
    <QRCode
      value="Some colorful qr code"
      size={qrCodeSize}
      color="darkblue"
      backgroundColor="lightblue"
    />
  </Description>
);

const urlPngQRCode = (
  <Description text="QR code with PNG from url avatar">
    <QRCode
      value={googleUrl}
      size={qrCodeSize}
      logo="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
      logoSize={logoSize}
      logoBorderRadius={200}
    />
  </Description>
);

const localPngQRCode = (
  <Description text="QR code with local PNG avatar">
    <QRCode
      value={googleUrl}
      size={qrCodeSize}
      logo={require('./assets/google.png')}
      logoSize={logoSize}
    />
  </Description>
);

const localPngBackgroundColorQRCode = (
  <Description text="QR code with local PNG with background color avatar">
    <QRCode
      value={googleUrl}
      size={qrCodeSize}
      logo={require('./assets/google.png')}
      logoBackgroundColor="pink"
      logoSize={logoSize}
    />
  </Description>
);

const App = () => {
  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Example usages of QRCode component</Text>
        {defaultQRCode}
        {colorfulQRCODe}
        {urlPngQRCode}
        {localPngQRCode}
        {localPngBackgroundColorQRCode}
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
