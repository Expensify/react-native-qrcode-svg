// core
import React, { PropTypes, Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
// libs
import { QrCode } from 'javascript-qrcode';
import SVG, { Rect, Path } from 'react-native-svg';

export default class QRCode extends Component {
  static propTypes = {
    value: PropTypes.string,
    size: PropTypes.number,
    color: PropTypes.string,
    backgroundColor: PropTypes.string,
  };
  static defaultProps = {
    value: 'This is a QR Code.',
    size: 100,
    color: 'black',
    backgroundColor: 'white',
  };
  constructor(props) {
    super(props);
    this._cellSize = null;
    this._matrix = null;
    this.setMatrix(props);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }
  componentWillUpdate(nextProps) {
    this.setMatrix(nextProps);
  }
  setMatrix(props) {
    const { value, size } = props;
    const qrcode = new QrCode(value);
    this._matrix = qrcode.getData();
    this._cellSize = size / (this._matrix.length + 2);
  }
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
  render() {
    const { size, color, backgroundColor } = this.props;

    return (
      <SVG width={size} height={size}>
        <Rect
          x={this._cellSize}
          y={this._cellSize}
          width={size - 2 * this._cellSize}
          height={size - 2 * this._cellSize}
          fill={backgroundColor}
        />
        <Path
          d={this.transformMatrixIntoPath()}
          stroke={color}
          strokeWidth={this._cellSize}
        />
      </SVG>
    );
  }
}
