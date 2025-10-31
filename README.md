
[![NPM](https://nodei.co/npm/react-native-qrcode-svg.png)](https://npmjs.org/package/react-native-qrcode-svg)

# react-native-qrcode-svg

A QR Code generator for React Native based on react-native-svg and javascript-qrcode.

Discussion: https://discord.gg/RvFM97v

## Features

* Easily render QR code images
* Optionally embed a logotype

| Android | iOS |
| - | - |
| <img src="https://raw.githubusercontent.com/awesomejerry/react-native-qrcode-svg/master/screenshot/android.png" width="240"> | <img src="https://raw.githubusercontent.com/awesomejerry/react-native-qrcode-svg/master/screenshot/ios.png" width="240"> |

## Installation

Install dependency packages

```bash
yarn add react-native-svg react-native-qrcode-svg
```
Or
```bash
npm i -S react-native-svg react-native-qrcode-svg
```

If you are using `React Native 0.60.+` go to the folder **your-project/ios** and run `pod install`, and you're done. 

If not, use one of the following method to link.

## Link with `react-native link`

If you are using `React Native <= 0.59.X`, link the native project:

```bash
react-native link react-native-svg
```

## Examples

```jsx
import QRCode from 'react-native-qrcode-svg';

// Simple usage, defaults for all but the value
render() {
  return (
    <QRCode
      value="http://awesome.link.qr"
    />
  );
};
```

```jsx
// 30px logo from base64 string with transparent background
render() {
  let base64Logo = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAA..';
  return (
    <QRCode
      value="Just some string value"
      logo={{uri: base64Logo}}
      logoSize={30}
      logoBackgroundColor='transparent'
    />
  );
};
```

```jsx
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

```jsx
// get base64 string encode of the qrcode (currently logo is not included)
getDataURL() {
  this.svg.toDataURL(this.callback);
}

callback(dataURL) {
  console.log(dataURL);
}

render() {
  return (
    <QRCode
      value="Just some string value"
      getRef={(c) => (this.svg = c)}
    />
  );
}
```

## Props

Name            | Default    | Description
----------------|------------|--------------
size            | 100        | Size of rendered image in pixels
value           | 'this is a QR code' | String Value of the QR code. Can also accept an array of segments as defined in [Manual mode](https://github.com/soldair/node-qrcode#manual-mode). Ex. [{ data: 'ABCDEFG', mode: 'alphanumeric' }, { data: '0123456', mode: 'numeric' }, { data: [253,254,255], mode: 'byte' }]
color           | 'black'        | Color of the QR code
backgroundColor | 'white'        | Color of the background
enableLinearGradient | false     | enables or disables linear gradient
linearGradient  |  ['rgb(255,0,0)','rgb(0,255,255)']  | array of 2 rgb colors used to create the linear gradient
gradientDirection| [170,0,0,0]  | the direction of the linear gradient
logo | null        | Image source object. Ex. {uri: 'base64string'} or {require('pathToImage')}
logoSize | 20% of size | Size of the imprinted logo. Bigger logo = less error correction in QR code
logoBackgroundColor | backgroundColor        | The logo gets a filled quadratic background with this color. Use 'transparent' if your logo already has its own backdrop.
logoMargin | 2 | logo's distance to its wrapper
logoBorderRadius | 0 | the border-radius of logo image (Android is not supported)
quietZone | 0 | quiet zone around the qr in pixels (useful when saving image to gallery)
getRef          | null       | Get SVG ref for further usage
ecl             | 'M'        | Error correction level
onError(error)  | undefined  | Callback fired when exception happened during the code generating process


## Saving generated code to gallery
 _Note: Experimental only ( not tested on iOS) , uses getRef() and needs [RNFS module](https://github.com/itinance/react-native-fs)_

npm install --save react-native-fs

### Example for Android:

```js
import { CameraRoll , ToastAndroid } from "react-native"
import RNFS from "react-native-fs"
...

  saveQrToDisk() {
   	this.svg.toDataURL((data) => {
   		RNFS.writeFile(RNFS.CachesDirectoryPath+"/some-name.png", data, 'base64')
   		  .then((success) => {
   			  return CameraRoll.saveToCameraRoll(RNFS.CachesDirectoryPath+"/some-name.png", 'photo')
   		  })
   		  .then(() => {
   			  this.setState({ busy: false, imageSaved: true  })
   			  ToastAndroid.show('Saved to gallery !!', ToastAndroid.SHORT)
   		  })
   	})
  }
```
## Development and testing
This library comes with an Example App. You can find it in the directory `./Example`.  
Use the app to easily test your changes to `react-native-qrcode-svg` and when developing new features.

Read more details in the dedicated [README](/Example/README.md).

## Dependencies

### PeerDependencies

* [react-native-svg](https://github.com/software-mansion/react-native-svg)

### Dependencies

* [node-qrcode](https://github.com/soldair/node-qrcode)

### Integrating react-native-qrcode-svg with React Native versions below 0.75
This library works seamlessly with React Native versions 0.75 and above. However, if you're using an older version of React Native (below 0.75), you might need to apply a custom transformation to your project's metro.config.js file to ensure compatibility with the TextEncoder API.

Here's how to configure the transformer for both Expo and React Native projects:

#### Setting Up the Transformer:
Make sure your project has a `metro.config.js` file. If not, create one at the root of your project.

#### Expo Projects:
```js
const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-qrcode-svg/textEncodingTransformation")
  };

  return config;
})();
```
Merge the contents from your project's metro.config.js file with this config.

#### React Native Projects:
```js
const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  transformer: {
    babelTransformerPath: require.resolve("react-native-qrcode-svg/textEncodingTransformation"),
  },
};

module.exports = mergeConfig(defaultConfig, config);
```

