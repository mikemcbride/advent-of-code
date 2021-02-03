const instructions = require('../../readInput')(__dirname).split('\n')

let coordinates = [0, 0] // [x, y] coordinate system. X is east/west, Y is north/south
let waypointCoords = [10, 1] // waypoint starting coordinates. follows same x/y plane rules

for (let instruction of instructions) {
    processInstruction(instruction)
}

let answer = getManhattanDistance()
console.log(answer)

function processInstruction(instruction) {
    let action = instruction.slice(0, 1)
    const value = parseInt(instruction.slice(1), 10)

    if (action === 'R' || action === 'L') {
        turnWaypoint(action, value)
    } else if (action === 'F') {
        goToWaypoint(value)
    } else {
        moveWaypoint(action, value)
    }
}

function turnWaypoint(direction, degrees) {
    let [x, y] = waypointCoords
    let rotations = (degrees / 90) % 4 // if they try to go more than 360 degrees, start over at 0
    if (rotations === 0) return
    if (rotations === 2) {
        // 180 deg is easiest - we just invert the waypoint coordinates
        waypointCoords = [x * -1, y * -1]
    }
    if (direction === 'L') {
        rotations = rotations * -1
    }
    // TODO: calculate new waypoint coordinates based on rotation
    if (rotations === 1 || rotations === -3) {
        waypointCoords = [y, (x * -1)]
    }
    if (rotations === -1 || rotations === 3) {
        waypointCoords = [y * -1, x]
    }
}

function moveWaypoint(direction, spaces) {
    let xy = (direction === 'N' || direction === 'S') ? 1 : 0
    if (direction === 'S' || direction === 'W') {
        spaces = spaces * -1 // south and west go backwards
    }
    waypointCoords[xy] += spaces
}

function goToWaypoint(tripCount) {
    coordinates[0] += (waypointCoords[0] * tripCount)
    coordinates[1] += (waypointCoords[1] * tripCount)
}

function getManhattanDistance() {
    return Math.abs(coordinates[0]) + Math.abs(coordinates[1])
}
