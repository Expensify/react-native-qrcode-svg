import React, { PureComponent } from 'react'
import { Image as RNImage } from 'react-native'
import PropTypes from 'prop-types'
import Svg, {
  Defs,
  G,
  Rect,
  Path,
  Image,
  ClipPath,
  LinearGradient,
  Stop
} from 'react-native-svg'
import genMatrix from './genMatrix'

const QR_SIZE = 100
const DEFAULT_SIZE = 100
const DEFAULT_BG_COLOR = 'white'

/* calculate the size of the cell and draw the path */
function calculateMatrix (props) {
  const { value, ecl, onError } = props
  try {
    const matrix = genMatrix(value, ecl)
    const cellSize = QR_SIZE / matrix.length
    return {
      value,
      size: QR_SIZE,
      cellSize,
      path: transformMatrixIntoPath(cellSize, matrix)
    }
  } catch (error) {
    if (onError && typeof onError === 'function') {
      onError(error)
    } else {
      // Pass the error when no handler presented
      throw error
    }
  }
  return {}
}

/* project the matrix into path draw */
function transformMatrixIntoPath (cellSize, matrix) {
  let d = ''
  matrix.forEach((row, i) => {
    let needDraw = false
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          d += `M${cellSize * j} ${cellSize / 2 + cellSize * i} `
          needDraw = true
        }
        if (needDraw && j === matrix.length - 1) {
          d += `L${cellSize * (j + 1)} ${cellSize / 2 + cellSize * i} `
        }
      } else {
        if (needDraw) {
          d += `L${cellSize * j} ${cellSize / 2 + cellSize * i} `
          needDraw = false
        }
      }
    })
  })
  return d
}

/**
 * A simple component for displaying QR Code using svg
 */
export default class QRCode extends PureComponent {
  static propTypes = {
    /* what the qr code stands for */
    value: PropTypes.string,
    /* the whole component size */
    size: PropTypes.number,
    /* the color of the cell */
    color: PropTypes.string,
    /* the color of the background */
    backgroundColor: PropTypes.string,
    /* an image source object. example {uri: 'base64string'} or {require('pathToImage')} */
    logo: RNImage.propTypes.source,
    /* logo size in pixels */
    logoSize: PropTypes.number,
    /* the logo gets a filled rectangular background with this color. Use 'transparent'
         if your logo already has its own backdrop. Default = same as backgroundColor */
    logoBackgroundColor: PropTypes.string,
    /* logo's distance to its wrapper */
    logoMargin: PropTypes.number,
    /* the border-radius of logo image */
    logoBorderRadius: PropTypes.number,
    /* get svg ref for further usage */
    getRef: PropTypes.func,
    /* error correction level */
    ecl: PropTypes.oneOf(['L', 'M', 'Q', 'H']),
    /* quiet zone around the qr, useful when saving as image */
    quietZone: PropTypes.number,
    /* Callback function that's called in case if any errors
     * appeared during the process of code generating.
     * Error object is passed to the callback.
     */
    onError: PropTypes.func
  }

  static defaultProps = {
    value: 'This is a QR Code.',
    size: DEFAULT_SIZE,
    color: 'black',
    backgroundColor: DEFAULT_BG_COLOR,
    logoSize: DEFAULT_SIZE * 0.2,
    logoBackgroundColor: DEFAULT_BG_COLOR,
    logoMargin: 2,
    logoBorderRadius: 0,
    ecl: 'M',
    onError: undefined,
    gradientDirection: ['0%', '0%', '100%', '100%'],
    linearGradient: ['rgb(255,0,0)', 'rgb(0,255,255)'],
    enableLinearGradient: false,
    quietZone: 0
  }

  constructor (props) {
    super(props)
    this.state = calculateMatrix(props)
  }

  static getDerivedStateFromProps (props, state) {
    // if value has changed, re-calculateMatrix
    if (props.value !== state.value || props.size !== state.size) {
      return calculateMatrix(props)
    }
    return null
  }

  render () {
    const {
      getRef,
      size,
      color,
      backgroundColor,
      logo,
      logoBackgroundColor,
      enableLinearGradient,
      gradientDirection,
      linearGradient
    } = this.props

    const qrScale = QR_SIZE / size

    // scale sizes that relate to qr to match with the size of the whole image
    const logoSize = this.props.logoSize * qrScale
    const logoMargin = this.props.logoMargin * qrScale
    const logoBorderRadius = this.props.logoBorderRadius * qrScale
    const quietZone = this.props.quietZone * qrScale

    const logoPosition = QR_SIZE / 2 - logoSize / 2 - logoMargin
    const logoWrapperSize = logoSize + logoMargin * 2
    const logoWrapperBorderRadius =
      logoBorderRadius + (logoBorderRadius && logoMargin)

    const { cellSize, path } = this.state

    return (
      <Svg id='rn-qr-svg-container' ref={getRef} width={size} height={size}>
        <Rect width={size} height={size} fill={backgroundColor} />
        <Svg
          id='qr-container'
          viewBox={[
            -quietZone,
            -quietZone,
            QR_SIZE + quietZone * 2,
            QR_SIZE + quietZone * 2
          ].join(' ')}
          width={size}
          height={size}
        >
          <Defs>
            <ClipPath id='clip-wrapper'>
              <Rect
                width={logoWrapperSize}
                height={logoWrapperSize}
                rx={logoWrapperBorderRadius}
                ry={logoWrapperBorderRadius}
              />
            </ClipPath>
            <ClipPath id='clip-logo'>
              <Rect
                width={logoSize}
                height={logoSize}
                rx={logoBorderRadius}
                ry={logoBorderRadius}
              />
            </ClipPath>
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
          {path && cellSize && (
            <Path
              d={path}
              stroke={enableLinearGradient ? 'url(#grad)' : color}
              strokeWidth={cellSize}
            />
          )}
          {logo && (
            <G x={logoPosition} y={logoPosition}>
              <Rect
                width={logoWrapperSize}
                height={logoWrapperSize}
                fill={logoBackgroundColor}
                clipPath='url(#clip-wrapper)'
              />
              <G x={logoMargin} y={logoMargin}>
                <Image
                  width={logoSize}
                  height={logoSize}
                  preserveAspectRatio='xMidYMid slice'
                  href={logo}
                  clipPath='url(#clip-logo)'
                />
              </G>
            </G>
          )}
        </Svg>
      </Svg>
    )
  }
}
