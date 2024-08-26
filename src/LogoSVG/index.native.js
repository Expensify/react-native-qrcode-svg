import React from "react";
import { LocalSvg } from "react-native-svg/css";
import { SvgUri, SvgXml } from "react-native-svg";
import { isString, isUrlString } from "../utils";

const LogoSVG = ({ svg, logoSize, logoColor }) => {
  if (isString(svg)) {
    if (isUrlString(svg)) {
      return (
        <SvgUri uri={svg} fill={logoColor} width={logoSize} height={logoSize} />
      );
    }

    return (
      <SvgXml xml={svg} fill={logoColor} width={logoSize} height={logoSize} />
    );
  }

  return (
    <LocalSvg asset={svg} fill={logoColor} width={logoSize} height={logoSize} />
  );
};

export default LogoSVG;
