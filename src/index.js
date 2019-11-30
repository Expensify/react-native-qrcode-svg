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
  logoSize,
  logoBackgroundColor,
  logoMargin,
  logoBorderRadius
}) => {
  const width = typeof logoSize === 'number' ? logoSize : logoSize.width
  const height = typeof logoSize === 'number' ? logoSize : logoSize.height
  const logoPositionX = (size - width - logoMargin * 2) / 2
  const logoPositionY = (size - height - logoMargin * 2) / 2
  const logoBackgroundSizeX = width + logoMargin * 2
  const logoBackgroundSizeY = height + logoMargin * 2
  const logoBackgroundBorderRadiusX =
    logoBorderRadius + (logoMargin / width) * logoBorderRadius
  const logoBackgroundBorderRadiusY =
    logoBorderRadius + (logoMargin / height) * logoBorderRadius

  return (
    <G x={logoPositionX} y={logoPositionY}>
      <Defs>
        <ClipPath id='clip-logo-background'>
          <Rect
            width={logoBackgroundSizeX}
            height={logoBackgroundSizeY}
            rx={logoBackgroundBorderRadiusX}
            ry={logoBackgroundBorderRadiusY}
          />
        </ClipPath>
        <ClipPath id='clip-logo'>
          <Rect
            width={width}
            height={height}
            rx={logoBorderRadius}
            ry={logoBorderRadius}
          />
        </ClipPath>
      </Defs>
      <G>
        <Rect
          width={logoBackgroundSizeX}
          height={logoBackgroundSizeY}
          fill={logoBackgroundColor}
          clipPath='url(#clip-logo-background)'
        />
      </G>
      <G x={logoMargin} y={logoMargin}>
        <Image
          width={width}
          height={height}
          preserveAspectRatio='xMidYMid slice'
          href={logo}
          clipPath='url(#clip-logo)'
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
  logoSize = size * 0.2,
  logoBackgroundColor = 'transparent',
  logoMargin = 2,
  logoBorderRadius = 0,
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
        <Rect width={size} height={size} fill={backgroundColor} />
      </G>
      <G>
        <Path
          d={path}
          stroke={enableLinearGradient ? 'url(#grad)' : color}
          strokeWidth={cellSize}
        />
      </G>
      {logo &&
        renderLogo({
          size,
          logo,
          logoSize,
          logoBackgroundColor,
          logoMargin,
          logoBorderRadius
        })}
    </Svg>
  )
}

export default QRCode
