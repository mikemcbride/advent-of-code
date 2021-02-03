const instructions = require('../../readInput')(__dirname).split('\n')

let currentDirection = 'E' // start facing east
let coordinates = [0, 0] // [x, y] coordinate system. X is east/west, Y is north/south

for (let instruction of instructions) {
    processInstruction(instruction)
}

let answer = getManhattanDistance()
console.log(answer)

function processInstruction(instruction) {
    let action = instruction.slice(0, 1)
    const value = parseInt(instruction.slice(1), 10)

    if (action === 'F') {
        action = currentDirection
    }

    if (action === 'R' || action === 'L') {
        turn(action, value)
    } else {
        move(action, value)
    }
}

function turn(direction, degrees) {
    let rotations = (degrees / 90) % 4 // if they try to go more than 360 degrees, start over at 0
    let directions = ['N', 'E', 'S', 'W']
    if (direction === 'L') {
        directions = directions.reverse()
    }
    let startIndex = directions.findIndex(c => c === currentDirection)
    if (startIndex > 0) {
        directions = [...directions.slice(startIndex), ...directions.slice(0, startIndex)]
    }
    currentDirection = directions[rotations]
}

function move(direction, spaces) {
    let xy = (direction === 'N' || direction === 'S') ? 1 : 0
    if (direction === 'S' || direction === 'W') {
        spaces = spaces * -1 // south and west go backwards
    }
    coordinates[xy] += spaces
}

function getManhattanDistance() {
    return Math.abs(coordinates[0]) + Math.abs(coordinates[1])
}
