const instructions = require('../../readInput')(__dirname).split('\n')
let visited = new Set()
let done = false
let accumulator = 0
let index = 0

function run() {
    while (!done) {
        if (visited.has(index)) {
            done = true
        } else {
            visited.add(index)
            index = processInstruction(index)
        }
    }
    console.log(accumulator)
}

function processInstruction(i) {
    // processes the instruction
    // returns the new index for next instruction
    let [action, count] = parseInstruction(instructions[i])
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
