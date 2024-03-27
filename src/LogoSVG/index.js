import React from 'react'

const LogoSVG = ({ svg, logoSize, logoColor }) => {
    // the svg prop is actually a svg wrapped in a React component, so for the web we can just render it
    const LogoSVGComponent = svg;

    return <LogoSVGComponent fill={logoColor} width={logoSize} height={logoSize} />;
}

export default LogoSVG;
