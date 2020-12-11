const adapters = require('../../readInput')(__dirname)
    .split('\n')
    .concat(['0']) // outlet
    .map(x => parseInt(x, 10))
    .sort((a, b) => a - b)
    .map((a, index) => ({ min: a, max: a + 3, index }))

// have to account for the device itself
const last = adapters[adapters.length - 1]
adapters.push({
    index: adapters.length,
    min: last.min + 3,
    max: last.max + 3
})

// to get all the different permutations we could use, we'll build a tree and traverse it.
// We'll use recursion to traverse each path and memoization to keep it fast.
const path = []
function traverse(node) {
    // last item only has one edge
    if (node.index === adapters.length - 1) {
        return 1
    }
    // memoize for speed
    if (node.index in path) {
        return path[node.index]
    }

    let count = 0
    // find adapters that we could potentially connect to this one
    let compatible = getCompatibleAdapters(node)

    // for each adapter, make a new branch
    for (let adapter of compatible) {
        count += traverse(adapter)
    }
    // we store the count at the index so we can use memoization
    path[node.index] = count
    return count
}

function getCompatibleAdapters(node) {
    // start with the next item in the array, then
    // filter out any items that it cannot jump to
    return adapters.slice(node.index + 1).filter(adapter => isCompatible(adapter, node))
}

function isCompatible(adapter, node) {
    // an adapter is compatible if its min is less than or equal to the node's max
    // and its max is greater than or equal to the node's max
    return adapter.min <= node.max && adapter.max >= node.max
}

const answer = traverse(adapters[0])
console.log(answer)
