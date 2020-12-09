const input = require('../../readInput')(__dirname).split('\n').map(x => parseInt(x, 10))

let invalidNumber = getInvalidNumber()
let set = findContiguousSet(invalidNumber)
let answer = getSumFromSet(set)
console.log(answer)

function getInvalidNumber() {
    let preamble = input.slice(0, 25)
    let remaining = input.slice(25)

    let done = false

    while (!done) {
        processNextValue()
    }

    return remaining[0]

    function processNextValue() {
        if (isNextNumberValid()) {
            preamble = preamble.slice(1).concat(remaining.shift())
        } else {
            // our answer
            done = true
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
}

function findContiguousSet(num) {
    let found = false
    let startIndex = 0
    let endIndex = 0
    let arr = [...input]
    while (!found && arr.length) {
        let sum = 0
        for (let x of arr) {
            sum += x
            if (sum === num) {
                found = true
                endIndex = input.findIndex(e => e === x)
                break
            }
            if (sum > num) {
                break
            }
        }
        if (!found) {
            startIndex += 1
            arr.shift()
        }
    }
    return input.slice(startIndex, endIndex + 1)
}

function getSumFromSet(set) {
    return (Math.min(...set) + Math.max(...set))
}
