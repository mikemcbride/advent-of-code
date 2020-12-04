const map = require('./input')
const totalRows = map.length - 1
const repeatInterval = map[0].length
let col = 0, row = 0, trees = 0
const getNextCoordinates = (x, y) => ([x + 3, y + 1])
while (row < totalRows) {
    ;[col, row] = getNextCoordinates(col, row)
    if (map[row].charAt(col % repeatInterval) === '#') {
        trees += 1
    }
}
console.log(trees)
