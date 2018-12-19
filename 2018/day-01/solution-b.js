const frequencies = require('./input')

const seen = new Set()
seen.add(0)
let firstRepeat = null
let frequency = 0

do {
  frequency = reduceFrequencies(frequency)
} while (firstRepeat === null)

function reduceFrequencies(initialVal = 0) {
  let total = frequencies.reduce((acc, key) => {
    acc += key
    
    if (!seen.has(acc)) {
      seen.add(acc)
    } else if (firstRepeat === null) {
      firstRepeat = acc
    }
    
    return acc
  }, initialVal)
  
  return total
}

console.log(firstRepeat)