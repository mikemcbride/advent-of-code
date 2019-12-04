const input = require('./input')
const WireMapper = require('./WireMapper')
// const input = [
//   ['R8','U5','L5','D3'],
//   ['U7','R6','D4','L4']
// ]
const program = new WireMapper({ wires: input })
program.run()
const steps = [...program.intersectingCoordinates].map(coord => {
  return program.getTotalStepsToIntersection(coord)
}).reduce((acc, val) => {
  if (val < acc) {
    return val
  } else {
    return acc
  }
}, Infinity)

console.log(steps)