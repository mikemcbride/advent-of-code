const labels = require('./input')

let matchIndex
let uncheckedLabels = [...labels]
let result = ''

do {
  findMatch(uncheckedLabels.shift())
} while (matchIndex === undefined && uncheckedLabels.length > 2)

function findMatch(label) {
  let foundMatch = false
  let matches = []
  let currentIndex = 0
  
  do {
    let currentItem = uncheckedLabels[currentIndex]
    let res = oneLetterOff(label, currentItem)    
    if (res.correct === true) {
      foundMatch = true
      matchIndex = res.diffIndex
      result = label.split('').filter((item, index) => index !== matchIndex).join('')
      console.log(result)
    } else {
      currentIndex += 1
    }
  } while (foundMatch === false && currentIndex < uncheckedLabels.length)
  
  return
}

function oneLetterOff(a, b) {
  let len = a.length
  let currentPosition = 0
  let diffCount = 0
  let diffPosition = 0
  
  do {
    let aVal = a.charAt(currentPosition)
    let bVal = b.charAt(currentPosition)
    
    if (aVal !== bVal) {
      diffCount += 1
      diffPosition = currentPosition
    }
    
    if (diffCount < 2) {
      currentPosition += 1
    }
  } while (diffCount < 2 && currentPosition < len)
  
  return diffCount === 1 ? { correct: true, diffIndex: diffPosition } : { correct: false }
}