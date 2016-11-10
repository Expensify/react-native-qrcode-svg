// core
import React, { PropTypes, PureComponent } from 'react';
// libs
import Svg, { Rect, Path, G } from 'react-native-svg';
import genMatrix from './genMatrix';

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
      /* a svg-string logo to imprint on the QR code,*/
      logo: PropTypes.string,
      /* logo width in pixels */
      logoWidth: PropTypes.number,
      /* logo height in pixels */
      logoHeight: PropTypes.number,
      /* should a background rectangle be painted under the logo? */
      paintLogoBackground: PropTypes.bool
      /* scale factor for your svg logo. Play with this to ensure your QR is scannable */
      logoScale: PropTypes.number
    };
  static defaultProps = {
    value: 'This is a QR Code.',
    size: 100,
    color: 'black',
    backgroundColor: 'white',
    paintLogoBackground: true,
    logoScale: 1
  };
  constructor(props) {
    super(props);
    this._matrix = null;
    this._cellSize = null;
    this._path = null;
    this.setMatrix(props);
  }
  componentWillUpdate(nextProps) {
    // if value has changed, re-setMatrix
    if (nextProps.value !== this.props.value) {
      this.setMatrix(nextProps);
    }
  }
  /* calculate the size of the cell and draw the path */
  setMatrix(props) {
    const { value, size } = props;
    this._matrix = genMatrix(value);
    this._cellSize = size / (this._matrix.length + 2);
    this._path = this.transformMatrixIntoPath();
  }
  /* project the matrix into path draw */
  transformMatrixIntoPath() {
    const matrix = this._matrix;
    const cellSize = this._cellSize;
    // adjust origin
    const oY = cellSize * 1.5;
    const oX = cellSize;
    let d = '';
    matrix.forEach((row, i) => {
      let needDraw = false;
      row.forEach((column, j) => {
        if (column) {
          if (!needDraw) {
            d += `M${oX + cellSize * j} ${oY + cellSize * i} `;
            needDraw = true;
          }
          if (needDraw && j === matrix.length - 1) {
            d += `L${oX + cellSize * (j + 1)} ${oY + cellSize * i} `;
          }
        } else {
          if (needDraw) {
            d += `L${oX + cellSize * j} ${oY + cellSize * i} `;
            needDraw = false;
          }
        }
      });
    });
    return d;
  }
  renderLogo() {
    let {logoHeight, logoWidth} = this.props;
    const { size, backgroundColor, logo, paintLogoBackground, logoScale } = this.props;
    const logoMargin = 1

    if(!logoHeight || !logoWidth) return null;

    logoHeight = logoHeight * logoScale
    logoWidth = logoWidth * logoScale
    return (
      <G>
        { paintLogoBackground && (
          <Rect
          x={size / 2 - logoWidth / 2 - logoMargin}
          y={size / 2 - logoHeight / 2 - logoMargin}
          width={logoWidth + logoMargin * 2}
          height={logoHeight + logoMargin * 2}
          fill = {backgroundColor}
          />
        )}
        <Path
          scale={logoScale}
          x={size / 2 - logoWidth / 2}
          y={size / 2 - logoHeight / 2}
          d={logo}
        />
      </G>
    )
  }

  render() {
    const { size, color, backgroundColor } = this.props;

    return (
      <Svg width={size} height={size}>
        <Rect
          x={this._cellSize}
          y={this._cellSize}
          width={size - 2 * this._cellSize}
          height={size - 2 * this._cellSize}
          fill={backgroundColor}
        />
        <Path
          d={this._path}
          stroke={color}
          strokeWidth={this._cellSize}
        />
        { this.renderLogo() }
      </Svg>
    );
  }
}
