export default (matrix, size) => {
  const cellSize = size / matrix.length
  const adjustSize = size * 0.024
  let path = ''
  matrix.forEach((row, i) => {
    let needDraw = false
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          path += `M${cellSize * j + adjustSize} ${cellSize / 2 + cellSize * i} `
          needDraw = true
        }
        if (needDraw && j === matrix.length - 1) {
          path += `L${cellSize * (j + adjustSize)} ${cellSize / 2 + cellSize * i} `
        }
      } else {
        if (needDraw) {
          path += `L${cellSize * j - adjustSize} ${cellSize / 2 + cellSize * i} `
          needDraw = false
        }
      }
    })
  })
  return {
    cellSize,
    path
  }
}
