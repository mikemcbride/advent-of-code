const passes = require('../../readInput')(__dirname).split('\n')
const ROW_COUNT = 128
const COL_COUNT = 8

let seatIds = []
for (let pass of passes) {
    let [passRow, passCol] = getSeatFromPass(pass)
    seatIds.push(getSeatId(passRow, passCol))
}

function getSeatFromPass(pass) {
    let keys = pass.split('')
    let rows = [...keys].slice(0, 7)
    let cols = [...keys].slice(7)
    let row = search(fillArray(ROW_COUNT), rows, 'F')
    let col = search(fillArray(COL_COUNT), cols, 'L')
    return [row, col]
}

function fillArray(len) {
    return new Array(len).fill(null).map((_, index) => index)
}

function search(arr, keys, code) {
    for (let key of keys) {
        let split = arr.length / 2
        if (key === code) {
            arr = arr.slice(0, split)
        } else {
            arr = arr.slice(split)
        }
    }
    return arr[0]
}

function getSeatId(row, col) {
    return (row * 8) + col
}

let sortedSeatIds = seatIds.sort((a, b) => a - b)
let prev = sortedSeatIds[0] - 1
for (let id of sortedSeatIds) {
    if (prev !== id - 1) {
        console.log(id - 1)
    }
    prev = id
}
