[![NPM](https://nodei.co/npm/react-native-qrcode-svg.png)](https://npmjs.org/package/react-native-qrcode-svg)
![circleci](https://circleci.com/gh/awesomejerry/react-native-qrcode-svg.svg?style=shield&circle-token=185bdd4fed561139178638f5b9f9c48ddefc9288)

# react-native-qrcode-svg

A QR Code generator for React Native based on react-native-svg and javascript-qrcode.

## Features

* Easily render QR code images
* Optionally embed a logotype

<img src="./screenshot-android.png" width="150">
<img src="./screenshot-ios.png" width="150">

## Installation

![screenshot](./screenshot-android.png=300px)
![screenshot](./screenshot-ios.png =300px)

Please install react-native-svg first.
```
npm install react-native-svg --save
react-native link react-native-svg
npm install react-native-qrcode-svg --save
```

### Examples

```
import QRCode from 'react-native-qrcode-svg';

//Simple usage, defaults for all but the value
render() {
  return (
    <QRCode
      value="http://awesome.link.qr"
    />
  );
};

```

```
// 30px logo from base64 string with transparent background
render() {
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  return (
    <QRCode
      value="Just some string value"
      logo={{uri: base64Logo}
      logoSize={30}
      logoBackgroundColor='transparent'
    />
  );
};

```

```
// 20% (default) sized logo from local file string with white logo backdrop
render() {
  let logoFromFile = require('../assets/logo.png');
  return (
    <QRCode
      value="Just some string value"
      logo={logoFromFile}
    />
  );
};

```


### Props

Name            | Default    | Description
----------------|------------|--------------
size            | 100        | Size of rendered image in pixels
value           | 'this is a QR code' | Value of the QR code
color           | 'black'        | Color of the QR code
logo | null        | Image source object. Ex. {uri: 'base64string'} or {require('pathToImage')}
logoSize | 20% of size | Size of the imprinted logo. Bigger logo = less error correction in QR code
logoBackgroundColor | backgroundColor        | The logo gets a filled quadratic background with this color. Use 'transparent' if your logo already has its own backdrop.


### Dependencies

* [react-native-svg](https://github.com/magicismight/react-native-svg)

* [javascript-qrcode](https://github.com/siciarek/javascript-qrcode)
