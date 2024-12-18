import { Platform } from "react-native";
import React, { useMemo, useEffect } from "react";
import Svg, {
  Defs,
  G,
  Path,
  Rect,
  Image,
  ClipPath,
  LinearGradient,
  Stop,
} from "react-native-svg";
import genMatrix from "./genMatrix";
import transformMatrixIntoPath from "./transformMatrixIntoPath";
import LogoSVG from "./LogoSVG";

const renderLogo = ({
  size,
  backgroundColor,
  logo,
  logoSVG,
  logoSize,
  logoBackgroundColor,
  logoColor,
  logoMargin,
  logoBorderRadius,
}) => {
  const logoPosition = (size - logoSize - logoMargin * 2) / 2;
  const logoBackgroundSize = logoSize + logoMargin * 2;
  const logoBackgroundBorderRadius =
    logoBorderRadius + (logoMargin / logoSize) * logoBorderRadius;

  return (
    <G x={logoPosition} y={logoPosition}>
      <Defs>
        <ClipPath id="clip-logo-background">
          <Rect
            width={logoBackgroundSize}
            height={logoBackgroundSize}
            rx={logoBackgroundBorderRadius}
            ry={logoBackgroundBorderRadius}
          />
        </ClipPath>
        <ClipPath id="clip-logo">
          <Rect
            width={logoSize}
            height={logoSize}
            rx={logoBorderRadius}
            ry={logoBorderRadius}
          />
        </ClipPath>
      </Defs>
      <G>
        <Rect
          width={logoBackgroundSize}
          height={logoBackgroundSize}
          fill={backgroundColor}
          clipPath="url(#clip-logo-background)"
        />
      </G>
      <G x={logoMargin} y={logoMargin} clipPath="url(#clip-logo)">
        <Rect
          width={logoBackgroundSize - logoMargin}
          height={logoBackgroundSize - logoMargin}
          fill={logoBackgroundColor}
        />
        {logoSVG ? (
          <LogoSVG svg={logoSVG} logoSize={logoSize} logoColor={logoColor} />
        ) : (
          <Image
            width={logoSize}
            height={logoSize}
            preserveAspectRatio="xMidYMid slice"
            href={logo}
            clipPath="url(#clip-logo)"
          />
        )}
      </G>
    </G>
  );
};

const QRCode = ({
  value = "this is a QR code",
  size = 100,
  color = "black",
  backgroundColor = "white",
  logo,
  logoSVG,
  logoSize = size * 0.2,
  logoBackgroundColor = "transparent",
  logoColor,
  logoMargin = 2,
  logoBorderRadius = 0,
  quietZone = 0,
  enableLinearGradient = false,
  gradientDirection = ["0%", "0%", "100%", "100%"],
  linearGradient = ["rgb(255,0,0)", "rgb(0,255,255)"],
  ecl = "M",
  getRef,
  onError,
  testID,
}) => {
  useEffect(loadTextEncodingPolyfill, []);

  const result = useMemo(() => {
    try {
      return transformMatrixIntoPath(genMatrix(value, ecl), size);
    } catch (error) {
      if (onError && typeof onError === "function") {
        onError(error);
      } else {
        // Pass the error when no handler presented
        throw error;
      }
    }
  }, [value, size, ecl]);

  if (!result) {
    return null;
  }

  const { path, cellSize } = result;
  const displayLogo = logo || logoSVG;

  return (
    <Svg
      testID={testID}
      ref={getRef}
      viewBox={[
        -quietZone,
        -quietZone,
        size + quietZone * 2,
        size + quietZone * 2,
      ].join(" ")}
      width={size}
      height={size}
    >
      <Defs>
        <LinearGradient
          id="grad"
          x1={gradientDirection[0]}
          y1={gradientDirection[1]}
          x2={gradientDirection[2]}
          y2={gradientDirection[3]}
        >
          <Stop offset="0" stopColor={linearGradient[0]} stopOpacity="1" />
          <Stop offset="1" stopColor={linearGradient[1]} stopOpacity="1" />
        </LinearGradient>
      </Defs>
      <G>
        <Rect
          x={-quietZone}
          y={-quietZone}
          width={size + quietZone * 2}
          height={size + quietZone * 2}
          fill={backgroundColor}
        />
      </G>
      <G>
        <Path
          d={path}
          strokeLinecap="butt"
          stroke={enableLinearGradient ? "url(#grad)" : color}
          strokeWidth={cellSize}
        />
      </G>
      {displayLogo &&
        renderLogo({
          size,
          backgroundColor,
          logo,
          logoSVG,
          logoSize,
          logoBackgroundColor,
          logoColor,
          logoMargin,
          logoBorderRadius,
        })}
    </Svg>
  );
};

function loadTextEncodingPolyfill() {
  const { major, minor } = Platform.constants.reactNativeVersion;
  if (!global.TextEncoder && major === 0 && minor < 75) {
    try {
      require.resolve("text-encoding");
      import("text-encoding").then((m) => {
        global.TextEncoder = m.TextEncoder;
      });
    } catch (error) {
      console.error(
        "If you are using RN < 0.75 please install the `text-encoding` library in your project"
      );
    }
  }
}

export default QRCode;
