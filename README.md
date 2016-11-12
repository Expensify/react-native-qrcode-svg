# react-native-qrcode-svg
A QR Code generator for React Native based on react-native-svg and javascript-qrcode.

[![NPM](https://nodei.co/npm/react-native-qrcode-svg.png)](https://npmjs.org/package/react-native-qrcode-svg)
![circleci](https://circleci.com/gh/awesomejerry/react-native-qrcode-svg.svg?style=shield&circle-token=185bdd4fed561139178638f5b9f9c48ddefc9288)

![screenshot](./screenshot-android.png=300px)
![screenshot](./screenshot-ios.png =300px)

Please install react-native-svg first.
```
npm install react-native-svg --save
react-native link react-native-svg
npm install react-native-qrcode-svg --save
```
```
...
import QRCode from 'react-native-qrcode-svg';
...
render() {
  ...
  return (
    ...
    <QRCode
      size={300}
      value="this is a qr code."
      color="blue"
      backgroundColor="red"
    />
    ...
  );
  ...
};
...
```
[react-native-svg](https://github.com/magicismight/react-native-svg)

[javascript-qrcode](https://github.com/siciarek/javascript-qrcode)
