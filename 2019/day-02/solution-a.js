const input = require('./input')
const Intcode = require('./Intcode')

let newInput = [...input]

// we are asked to modify these values before executing program:
newInput[1] = 12
newInput[2] = 2

const program = new Intcode(newInput)
program.run()
console.log(program.output)