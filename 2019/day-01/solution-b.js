const input = require('./input')

const getFuelRequirements = function (mass, vals = []) {
  const req = Math.floor(mass / 3) - 2

  if (req > 0) {
    vals.push(req)
    return getFuelRequirements(req, vals)
  } else {
    return vals.reduce((acc, val) => {
      return acc + val
    }, 0)
  }
}

const sumFuelRequirements = function (arr) {
  return arr.reduce((acc, mass) => {
    acc += getFuelRequirements(mass)
    return acc
  }, 0)
}

console.log(sumFuelRequirements(input))