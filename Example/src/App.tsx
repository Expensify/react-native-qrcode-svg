import React from 'react';
import {SafeAreaView, ScrollView, Text} from 'react-native';
import SVG from './assets/ruby.svg';
import Description from './components/Description';
import QRCode from 'react-native-qrcode-svg';
import styles from './styles';

const rubyUrl = 'https://www.ruby-lang.org/';
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

const urlSvgQRCode = (
  <Description text="QR code with SVG from url avatar">
    <QRCode
      value={rubyUrl}
      size={qrCodeSize}
      logoSVG="https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/ruby.svg"
      logoSize={logoSize}
    />
  </Description>
);

const xml = `
  <svg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'>
    <path d='M20,100l74-5l6-75zM61,35l37-2l-29-24z' fill='#b11' fill-rule='evenodd'/>
    <path d='M21,100l74-5l-47-4zM98,33c4-12,5-29-14-33l-15,9l29,24z' fill='#811' fill-rule='evenodd'/>
    <path d='M7,67l14,33l11-38z' fill='#d44' fill-rule='evenodd'/>
    <path d='M29,61l42,13l-10-42zM56,0h28l-16,10zM1,51l-1,29l7-13z' fill='#c22' fill-rule='evenodd'/>
    <path d='M32,61l39,13c-14,13-30,24-50,26z' fill='#a00' fill-rule='evenodd'/>
    <path d='M61,35l10,39l17-23zM32,61l16,30c9-5,16-11,23-17l-39-13z' fill='#900' fill-rule='evenodd'/>
    <path d='M61,35l27,17l10-20l-37,3z' fill='#800' fill-rule='evenodd'/>
    <path d='M71,74l23,21l-6-44zM0,80c1,19,15,20,21,20l-14-33l-7,13zM7,67l-2,26c4,6,9,7,15,6c-4-11-13-32-13-32zM69,9l30,4c-1-7-6-11-15-13l-15,9z' fill='#911' fill-rule='evenodd'/>
    <path d='M1,51l6,16l25-5l29-27l8-26l-13-9l-22,8c-6,7-20,19-20,19c-1,1-9,16-13,24z' fill='#ebb' fill-rule='evenodd'/>
    <path d='M21,21c15-14,34-23,42-16c7,8-1,26-16,40c-14,15-33,24-41,17c-7-7,1-26,15-41z' fill='#b11' fill-rule='evenodd'/>
  </svg>
`;

const stringSvgQRCode = (
  <Description text="QR code with raw SVG (string) avatar">
    <QRCode
      value={rubyUrl}
      size={qrCodeSize}
      logoSVG={xml}
      logoSize={logoSize}
    />
  </Description>
);

const localSvgQRCode = (
  <Description text="QR code with local SVG avatar">
    <QRCode
      value={rubyUrl}
      size={qrCodeSize}
      logoSVG={SVG}
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
        {urlSvgQRCode}
        {stringSvgQRCode}
        {localSvgQRCode}
      </ScrollView>
    </SafeAreaView>
  );
};
export default App;
