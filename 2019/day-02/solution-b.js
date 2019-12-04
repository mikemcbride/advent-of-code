const input = require('./input')
const Intcode = require('./Intcode')
const desiredOutput = 19690720
let solved = false
let tuple = [0, 0]

function checkInput(memory) {
  const program = new Intcode(memory)
  program.run()
  return program.output
}

function incrementTuple(t) {
  let [noun, verb] = t
  if (noun === 99) {
    noun = 0
    verb += 1
  } else {
    noun += 1
  }

  return [noun, verb]
}

while (!solved) {
  const [noun, verb] = tuple
  const memory = [...input]
  memory[1] = noun
  memory[2] = verb
  const actualOutput = checkInput(memory)

  if (actualOutput === desiredOutput) {
    solved = true
  } else {
    tuple = incrementTuple(tuple)
  }
}

console.log('the noun/verb pair producing the desired output is', tuple)
console.log('solution to problem is', (100*tuple[0] + tuple[1]))