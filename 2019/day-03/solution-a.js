const input = require('./input')
const WireMapper = require('./WireMapper')

const program = new WireMapper({ wires: input })
const result = program.run()

console.log(result)