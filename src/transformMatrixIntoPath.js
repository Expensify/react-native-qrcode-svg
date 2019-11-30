export default (matrix, size) => {
  const cellSize = size / matrix.length
  let path = ''
  matrix.forEach((row, i) => {
    let needDraw = false
    row.forEach((column, j) => {
      if (column) {
        if (!needDraw) {
          path += `M${cellSize * j} ${cellSize / 2 + cellSize * i} `
          needDraw = true
        }
        if (needDraw && j === matrix.length - 1) {
          path += `L${cellSize * (j + 1)} ${cellSize / 2 + cellSize * i} `
        }
      } else {
        if (needDraw) {
          path += `L${cellSize * j} ${cellSize / 2 + cellSize * i} `
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
