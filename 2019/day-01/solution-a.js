const input = require('./input')

const getFuelRequirements = function (mass) {
  return Math.floor(mass / 3) - 2
}

const sumFuelRequirements = function (arr) {
  return arr.reduce((acc, mass) => {
    acc += getFuelRequirements(mass)
    return acc
  }, 0)
}

console.log(sumFuelRequirements(input))