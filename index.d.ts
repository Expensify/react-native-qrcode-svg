import * as React from "react";
import {ImageSourcePropType} from "react-native";
import type {SvgProps} from "react-native-svg";

declare class QRCode extends React.PureComponent<QRCodeProps, any> {}

export interface QRCodeProps {
  /* what the qr code stands for */
  value?: string;
  /* the whole component size */
  size?: number;
  /* the color of the cell */
  color?: string;
  /* the color of the background */
  backgroundColor?: string;
  /* SVG to render as logo.
  * If this prop is provided then `logo` prop will be ignored. */
  logoSVG?: React.FC<SvgProps>;
  /* an image source object. example {uri: 'base64string'} or {require('pathToImage')} */
  logo?: ImageSourcePropType;
  /* logo size in pixels */
  logoSize?: number;
  /* the logo gets a filled rectangular background with this color. Use 'transparent'
         if your logo already has its own backdrop. Default = same as backgroundColor */
  logoBackgroundColor?: string;
  /* If the logo is provided via SVG this color will be set as it's `fill` property
  * it does nothing if logo is provided as an Image source object */
  logoColor?: string;
  /* logo's distance to its wrapper */
  logoMargin?: number;
  /* the border-radius of logo image */
  logoBorderRadius?: number;
  /* quiet zone in pixels */
  quietZone?: number;
  /* enable linear gradient effect */
  enableLinearGradient?: boolean;
  /* linear gradient direction */
  gradientDirection?: string[];
  /* linear gradient color */
  linearGradient?: string[];
  /* get svg ref for further usage */
  getRef?: (c: any) => any;
  /* error correction level */
  ecl?: "L" | "M" | "Q" | "H";
  /* error handler called when matrix fails to generate */
  onError?: Function;
}

export default QRCode;
