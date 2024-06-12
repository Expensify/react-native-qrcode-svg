import React, { useMemo } from 'react'
import Svg, {
  Defs,
  G,
  Path,
  Rect,
  Image,
  ClipPath,
  LinearGradient,
  Stop
} from 'react-native-svg'
import genMatrix from './genMatrix'
import transformMatrixIntoPath from './transformMatrixIntoPath'

const renderLogo = ({
  size,
  logo,
  logoWidth,
  logoHeight,
  logoBackgroundColor,
  logoMarginX,
  logoMarginY,
  logoBorderRadius,
  logoPreserveAspectRatio
}) => {
  const logoPositionX = (size - logoWidth - logoMarginX * 2) / 2
  const logoPositionY = (size - logoHeight - logoMarginY * 2) / 2
  const logoBackgroundSizeWidth = logoWidth + logoMarginX * 2
  const logoBackgroundSizeHeight = logoHeight + logoMarginY * 2
  const logoBackgroundBorderRadiusX = logoBorderRadius + (logoMarginX / logoWidth) * logoBorderRadius
  const logoBackgroundBorderRadiusY = logoBorderRadius + (logoMarginY / logoHeight) * logoBorderRadius

  return (
    <G x={logoPositionX} y={logoPositionY}>
      <Defs>
        <ClipPath id="clip-logo-background">
          <Rect
            width={logoBackgroundSizeWidth}
            height={logoBackgroundSizeHeight}
            rx={logoBackgroundBorderRadiusX}
            ry={logoBackgroundBorderRadiusY}
          />
        </ClipPath>
        <ClipPath id="clip-logo">
          <Rect
            width={logoWidth}
            height={logoHeight}
            rx={logoBorderRadius}
            ry={logoBorderRadius}
          />
        </ClipPath>
      </Defs>
      <G>
        <Rect
          width={logoBackgroundSizeWidth}
          height={logoBackgroundSizeHeight}
          fill={logoBackgroundColor}
          clipPath="url(#clip-logo-background)"
        />
      </G>
      <G x={logoMarginX} y={logoMarginY}>
        <Image
          width={logoWidth}
          height={logoHeight}
          preserveAspectRatio={logoPreserveAspectRatio}
          href={logo}
          clipPath="url(#clip-logo)"
        />
      </G>
    </G>
  )
}

const QRCode = ({
  value = 'this is a QR code',
  size = 100,
  color = 'black',
  backgroundColor = 'white',
  logo,
  logoWidth = size * 0.2,
  logoHeight = size * 0.2,
  logoBackgroundColor = 'transparent',
  logoMarginX = 2,
  logoMarginY = 2,
  logoBorderRadius = 0,
  logoPreserveAspectRatio = 'xMidYMid slice',
  quietZone = 0,
  enableLinearGradient = false,
  gradientDirection = ['0%', '0%', '100%', '100%'],
  linearGradient = ['rgb(255,0,0)', 'rgb(0,255,255)'],
  ecl = 'M',
  getRef,
  onError
}) => {
  const result = useMemo(() => {
    try {
      return transformMatrixIntoPath(genMatrix(value, ecl), size)
    } catch (error) {
      if (onError && typeof onError === 'function') {
        onError(error)
      } else {
        // Pass the error when no handler presented
        throw error
      }
    }
  }, [value, size, ecl])

  if (!result) {
    return null
  }

  const { path, cellSize } = result

  return (
    <Svg
      ref={getRef}
      viewBox={[
        -quietZone,
        -quietZone,
        size + quietZone * 2,
        size + quietZone * 2
      ].join(' ')}
      width={size}
      height={size}
    >
      <Defs>
        <LinearGradient
          id='grad'
          x1={gradientDirection[0]}
          y1={gradientDirection[1]}
          x2={gradientDirection[2]}
          y2={gradientDirection[3]}
        >
          <Stop offset='0' stopColor={linearGradient[0]} stopOpacity='1' />
          <Stop offset='1' stopColor={linearGradient[1]} stopOpacity='1' />
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
          strokeLinecap='butt'
          stroke={enableLinearGradient ? 'url(#grad)' : color}
          strokeWidth={cellSize}
        />
      </G>
      {logo &&
        renderLogo({
          size,
          logo,
          logoWidth,
          logoHeight,
          logoBackgroundColor,
          logoMarginX,
          logoMarginY,
          logoBorderRadius,
          logoPreserveAspectRatio
        })}
    </Svg>
  )
}

export default QRCode
