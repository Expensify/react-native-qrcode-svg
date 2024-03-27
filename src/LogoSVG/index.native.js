import React from 'react'
import {LocalSvg} from 'react-native-svg/css'

const LogoSVG = ({ svg, logoSize, logoColor }) => {
    return <LocalSvg asset={svg} fill={logoColor} width={logoSize} height={logoSize} />;
}

export default LogoSVG;
