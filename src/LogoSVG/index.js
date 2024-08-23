import React from "react";
import { Image } from "react-native-svg";
import { isString, isUrlString } from "../utils";

const LogoSVG = ({ svg, logoSize, logoColor }) => {
  if (isString(svg)) {
    const href = isUrlString(svg)
      ? svg
      : `data:image/svg+xml;base64,${window.btoa(svg)}`;

    return <Image href={encodeURI(href)} width={logoSize} height={logoSize} />;
  }

  // if `svg` prop is actually a svg asset wrapped in a React component, then we can just render it
  const LogoSVGComponent = svg;

  return (
    <LogoSVGComponent fill={logoColor} width={logoSize} height={logoSize} />
  );
};

export default LogoSVG;
