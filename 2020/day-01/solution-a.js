const entries = require('./input')

let lower = []
let upper = []
const desiredSum = 2020

// get entries into a lower and upper grouping.
// anything less than half the goal sum needs a number greater than half to equal the desired sum.
// e.g., we won't waste time adding 500 and 700 - we know it will be too small.
// instead we'll loop through the lower numbers and try to find an item from the upper array that gives us our answer.
for (let entry of entries) {
    if (entry <= desiredSum / 2) {
        lower.push(entry)
    } else {
        upper.push(entry)
    }
}

const checkSum = function(a, b, desired) {
    for (let value of b) {
        if (a + value === desired) {
            return [a, value]
        }
    }
    return null
}

for (let value of lower) {
    const values = checkSum(value, upper, desiredSum)
    if (values !== null) {
        let [x, y] = values
        console.log(x * y)
    }
}
