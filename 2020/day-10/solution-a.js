const adapters = require('../../readInput')(__dirname)
    .split('\n')
    .concat(['0']) // include the outlet
    .map(x => parseInt(x, 10))
    .sort((a, b) => a - b)
adapters.push(Math.max(...adapters) + 3)
const voltageDiffs = [null, 0, 0, 0]
for (let i in adapters) {
    if (i > 0) {
        const diff = adapters[i] - adapters[i - 1]
        voltageDiffs[diff] += 1
    }
}
console.log(voltageDiffs[1] * voltageDiffs[3])
