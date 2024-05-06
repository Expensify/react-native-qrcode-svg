import roundedRectData from "./svg-rounded-rectangle-path";

export default function transformMatrixIntoRoundedPath(matrix, size) {
  const cellSize = size / matrix.length
  let path = ''

  function drawRect(x, y) {
    const radius = cellSize /2;
    const tlr = matrix[x-1]?.[y] || matrix[x][y-1] ? 0 : radius;
    const trr = matrix[x+1]?.[y] || matrix[x][y-1] ? 0 : radius;
    const brr = matrix[x+1]?.[y] || matrix[x][y+1] ? 0 : radius;
    const blr = matrix[x-1]?.[y] || matrix[x][y+1] ? 0 : radius;
    return roundedRectData(cellSize * x, cellSize * y, cellSize, cellSize,  tlr, trr, brr, blr) + ' '
  }

  matrix.forEach((row, i) => {
    let needDraw = false
    row.forEach((column, j) => {
      if (column) {
        path += drawRect(i, j)
      }
    })
  })

  return {
    cellSize,
    path
  }
}