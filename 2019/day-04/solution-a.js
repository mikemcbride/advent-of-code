const [min, max] = require('./input')
// const testVals = [111111, 112345, 123450, 234567] // should produce 2 valid passwords

const passesChecks = function(num) {
  if (num.toString().length !== 6) {
    return false
  }

  if (!hasAdjacentDigits(num)) {
    return false
  }

  if (!hasNoDecreasingDigits(num)) {
    return false
  }

  return true
}

const hasAdjacentDigits = function (num) {
  let digits = num.toString().split('')
  let passes = false
  while (digits.length > 1 && !passes) {
    let x = digits.shift()
    if (x === digits[0]) {
      passes = true
    }
  }

  return passes
}

const hasNoDecreasingDigits = function (num) {
  let digits = num.toString().split('')
  let passes = true
  while (digits.length > 1 && passes) {
    let x = digits.shift()
    if (digits[0] < x) {
      passes = false
    }
  }

  return passes
}

let validPasswords = []
for (i = min; i <= max; i++) {
  if (passesChecks(i)) {
    validPasswords.push(i)
  }
}

console.log('valid passwords', validPasswords)
console.log('num valid passwords', validPasswords.length)

