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
    for (let r of [-1, 0, 1]) {
        for (let c of [-1, 0, 1]) {
            // ignore the current seat
            if (!(r === 0 && c === 0)) {
                let rx = r + row
                let cx = c + col
                let val = getSeatValue(currentGrid, rx, cx)
                while (val === '.') {
                    rx = rx + r
                    cx = cx + c
                    val = getSeatValue(currentGrid, rx, cx)
                }
                if (val === '#') {
                    count += 1
                }
            }
        }
    }
    return count
}

function getSeatValue(currentGrid, row, col) {
    return currentGrid?.[row]?.[col]
}

function getNewSeatValue(currentGrid, row, col) {
    let currentSeatVal = currentGrid[row][col]
    let adjacentOccupied = getAdjacentOccupiedSeatCount(currentGrid, row, col)
    if (adjacentOccupied === 0 && currentSeatVal === 'L') {
        return '#'
    } else if (adjacentOccupied >= 5 && currentSeatVal === '#') {
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
