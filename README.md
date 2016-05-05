# react-native-qrcode-svg
A QR Code generator for React Native based on react-native-svg and javascript-qrcode.
Please install react-native-svg first.
```
npm install react-native-svg --save
rnpm link react-native-svg
npm install react-native-qrcode-svg --save
```
```
...
import QRCode from 'react-native-qrcode-svg';
...
render {
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
