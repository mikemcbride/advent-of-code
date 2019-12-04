const [min, max] = require('./input')
const testVals = [111111, 111122, 122345, 111222, 133450, 112233, 123444, 112222]

const passesChecks = function(num) {
  if (num.toString().length !== 6) {
    return false
  }

  if (!hasExactlyTwoAdjacentMatchingDigits(num)) {
    return false
  }

  if (!hasNoDecreasingDigits(num)) {
    return false
  }

  return true
}

const hasExactlyTwoAdjacentMatchingDigits = function (num) {
  let digits = num.toString().split('')
  let passes = false
  let consecutiveMatchingDigits = 0

  while (digits.length > 1 && !passes) {
    let x = digits.shift()
    if (x === digits[0]) {
      consecutiveMatchingDigits += 1
    } else if (consecutiveMatchingDigits === 1) {
      // we just had two and only two consecutive matching digits, we pass.
      passes = true
      consecutiveMatchingDigits = 0
    } else {
      consecutiveMatchingDigits = 0
    }
  }

  // handles case where last two digits match
  if (consecutiveMatchingDigits === 1) {
    passes = true
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

let possibleVals = []
for (i = min; i <= max; i++) {
  possibleVals.push(i)
}

// let validPasswords = testVals.filter(it => passesChecks(it))
let validPasswords = possibleVals.filter(it => passesChecks(it))
console.log('valid passwords', validPasswords)
console.log('num valid passwords', validPasswords.length)

