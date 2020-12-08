const entries = require('../../readInput')(__dirname).split('\n').map(it => parseInt(it, 10))
const desiredSum = 2020

// sort it first - we know the sum of 3 will all be towards the front
entries.sort((a, b) => a - b)
let solved = false
let answer = null

while (!solved && entries.length) {
    // remove the first item from the array.
    // we'll go through every possible combination with this item before moving on
    let a = entries.shift()
    let aEntriesCopy = [...entries]
    // loop through remaining values
    for (let x of entries) {
        // take the first item in the remaining values - this will be our second of three numbers
        // we'll then loop through the rest of the values and check the sum of each
        // if we get a match, we'll break the loop and set the answer
        // we if we get to the end without a match, we're done with item b and move on to the next item in the array
        // we'll progress through this way until we hit all possible combinations and get a match
        let b = aEntriesCopy.shift()
        let rest = [...aEntriesCopy]
        for (let entry of rest) {
            if (a + b + entry === desiredSum) {
                solved = true
                answer = a * b * entry
            }
        }
    }
}

console.log(answer)
