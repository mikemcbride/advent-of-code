const grid = require('../../readInput')(__dirname).split('\n').map(row => row.split(''))

// it's basically the same concept as Conway's game of life, with slightly different rules
function copyGrid(data) {
    let copy = []
    for (let row of data) {
        let newRow = []
        for (let cell of row) {
            newRow.push(cell)
        }
        copy.push(newRow)
    }
    return copy
}

function didGridChange(first, second) {
    return first.flat().join('') !== second.flat().join('')
}

function getAdjacentOccupiedSeatCount(currentGrid, row, col) {
    let count = 0
    let rows = [-1, 0, 1]
    let cols = [-1, 0, 1]
    for (let r of rows) {
        let rx = row + r
        for (let c of cols) {
            let cx = c + col
            // ignore the current seat
            if (!(r === 0 && c === 0)) {
                let val = currentGrid?.[rx]?.[cx]
                if (val === '#') {
                    count += 1
                }
            }
        }
    }
    return count
}

function getNewSeatValue(currentGrid, row, col) {
    let currentSeatVal = currentGrid[row][col]
    if (currentSeatVal === '.') {
        return '.'
    }
    let adjacentOccupied = getAdjacentOccupiedSeatCount(currentGrid, row, col)
    if (adjacentOccupied === 0) {
        return '#'
    } else if (adjacentOccupied >= 4) {
        return 'L'
    } else {
        return currentSeatVal
    }
}

function getNextGrid(currentGrid) {
    let newGrid = []
    for (let row in currentGrid) {
        let newRow = []
        for (let col in currentGrid[row]) {
            newRow.push(getNewSeatValue(currentGrid, parseInt(row), parseInt(col)))
        }
        newGrid.push(newRow)
    }
    return newGrid
}

let solved = false

let current = copyGrid(grid)
while (!solved) {
    let previous = copyGrid(current)
    current = getNextGrid(previous)
    if (!didGridChange(current, previous)) {
        solved = true
    }
}

let answer = current.flat().filter(cell => cell === '#').length
console.log(answer)
