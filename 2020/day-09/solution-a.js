const input = require('../../readInput')(__dirname).split('\n').map(x => parseInt(x, 10))
let preamble = input.slice(0, 25)
let remaining = input.slice(25)

let done = false

while (!done) {
    processNextValue()
}

function processNextValue() {
    if (isNextNumberValid()) {
        preamble = preamble.slice(1).concat(remaining.shift())
    } else {
        // our answer
        done = true
        console.log(remaining[0])
    }
}

function isNextNumberValid() {
    let next = remaining[0]
    let arr = [...preamble]
    let isValid = false
    while (!isValid && arr.length) {
        const a = arr.shift()
        const copy = [...arr]
        for (let b of copy) {
            if (a + b === next) {
                isValid = true
                break
            }
        }
    }
    return isValid
}
