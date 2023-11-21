/**
 * Get path data for a rounded rectangle. Allows for different radius on each corner.
 * @param  {Number} w   Width of rounded rectangle
 * @param  {Number} h   Height of rounded rectangle
 * @param  {Number} tlr Top left corner radius
 * @param  {Number} trr Top right corner radius
 * @param  {Number} brr Bottom right corner radius
 * @param  {Number} blr Bottom left corner radius
 * @return {String}     Rounded rectangle SVG path data
 */


var roundedRectData = (positionX, positionY, width, height, topLeftRadius, topRightRadius, bottomRightRadius, bottomLeftRadius) => {
    return `M${positionX + topLeftRadius},${positionY}\
      h${width - (topLeftRadius + topRightRadius)}\
      a${topRightRadius},${topRightRadius} 0 0 1 ${topRightRadius},${topRightRadius}\
      v${height - (topRightRadius + bottomRightRadius)}\
      a${bottomRightRadius},${bottomRightRadius} 0 0 1 -${bottomRightRadius},${bottomRightRadius}\
      h-${width - (bottomLeftRadius + bottomRightRadius)}\
      a${bottomLeftRadius},${bottomLeftRadius} 0 0 1 -${bottomLeftRadius},-${bottomLeftRadius}\
      v-${height - (topLeftRadius + bottomLeftRadius)}\
      a${topLeftRadius},${topLeftRadius} 0 0 1 ${topLeftRadius},-${topLeftRadius}\
      z`;
  }

export default roundedRectData