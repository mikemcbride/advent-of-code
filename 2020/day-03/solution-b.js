const map = require('./input')
const totalRows = map.length - 1
const repeatInterval = map[0].length
let slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]
let treesPerSlope = []

function getNextCoordinatesFromSlope(currentCoordinates, slope) {
    // current coordinates and slope are both [x, y] arrays
    let [col, row] = currentCoordinates
    let [x, y] = slope
    return [col + x, row + y]
}


for (let slope of slopes) {
    let col = 0, row = 0, trees = 0
    while (row < totalRows) {
        ;[col, row] = getNextCoordinatesFromSlope([col, row], slope)
        if (map[row].charAt(col % repeatInterval) === '#') {
            trees += 1
        }
    }
    treesPerSlope.push(trees)
}
const answer = treesPerSlope.reduce((a, b) => a * b, 1)
console.log(answer)
