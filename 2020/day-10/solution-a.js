const adapters = require('../../readInput')(__dirname).split('\n').map(x => parseInt(x, 10)).sort((a, b) => a - b)
// we need to include the outlet and device in our chain
const outlet = 0
const device = Math.max(...adapters) + 3
const chain = [outlet, ...adapters, device]
const voltageDiffs = [null, 0, 0, 0]

for (let i in chain) {
    if (i > 0) {
        const diff = chain[i] - chain[i - 1]
        voltageDiffs[diff] += 1
    }
}
console.log(voltageDiffs[1] * voltageDiffs[3])
