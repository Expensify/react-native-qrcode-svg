import * as React from "react";
import type {ImageSourcePropType} from "react-native";
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
  * Can be either a svg string or a React component if you're using ex: '@svgr/webpack' or similar
  * In case both this prop and `logo` are provided, then this prop takes precedence and `logo` will be ignored. */
  logoSVG?: React.FC<SvgProps> | string;
  /* an image source object. example {uri: 'base64string'} or {require('pathToImage')} */
  logo?: ImageSourcePropType | string;
  /* logo size in pixels */
  logoSize?: number;
  /* the logo gets a filled rectangular background with this color. Use 'transparent'
         if your logo already has its own backdrop. Default = same as backgroundColor */
  logoBackgroundColor?: string;
  /* If the logo is provided via `logoSVG` prop, this color will be set as it's `fill` property,
  * otherwise it does nothing */
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
  /** testID for testing */
  testID?: string;
}

export default QRCode;
