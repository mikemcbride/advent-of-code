const labels = require('./input')

let twos = 0
let threes = 0

labels.forEach(label => {
  let {two, three} = getTwosAndThrees(label)
  twos += two
  threes += three
})

const checksum = twos * threes
console.log(checksum)

function getLetterCounts(str) {
  let counts = {}
  
  str.split('').forEach(letter => {
    if (counts[letter] === undefined) {
      counts[letter] = 1
    } else {
      counts[letter] += 1
    }
  })
  
  return counts
}

function getTwosAndThrees(label) {
  let result = {
    two: 0,
    three: 0
  }
  
  let counts = getLetterCounts(label)
  Object.values(counts).forEach(val => {
    if (val === 2) {
      result.two = 1
    }
    
    if (val === 3) {
      result.three = 1
    }
  })
  
  return result
}