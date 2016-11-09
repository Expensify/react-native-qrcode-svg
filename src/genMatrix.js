import { QrCode } from 'javascript-qrcode';

export default (value) => {
  const qrcode = new QrCode(value);
  return qrcode.getData();
};
