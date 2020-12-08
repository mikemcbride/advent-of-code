const instructions = require('../../readInput')(__dirname).split('\n')
let visited = new Set()
let attempted = new Set()
let shouldAttempt = true
let done = false
let reachedEnd = false
let accumulator = 0
let index = 0

function run() {
    while (!reachedEnd) {
        index = 0
        accumulator = 0
        done = false
        visited = new Set()
        shouldAttempt = true

        while (!done) {
            if (visited.has(index) || !instructions[index]) {
                done = true
            } else {
                visited.add(index)
                index = processInstruction(index)
            }
        }
        reachedEnd = index === instructions.length
    }
    console.log(accumulator)
}

function processInstruction(i) {
    // processes the instruction
    // returns the new index for next instruction
    let [action, count] = parseInstruction(instructions[i])
    if (shouldAttempt && !attempted.has(i)) {
        if (action === 'nop') {
            action = 'jmp'
            shouldAttempt = false
            attempted.add(i)
        } else if (action === 'jmp') {
            action = 'nop'
            shouldAttempt = false
            attempted.add(i)
        }
    }

    if (action === 'acc') {
        accumulator += count
        return i + 1
    } else if (action === 'nop') {
        return i + 1
    } else if (action === 'jmp') {
        return i + count
    }
}

function parseInstruction(instruction) {
    let [action, count] = instruction.split(' ')
    if (count.startsWith('+')) {
        count = count.slice(1)
    }
    count = parseInt(count, 10)
    return [action, count]
}

run()
