const readInput = require('../../readInput')
const bags = readInput(__dirname)
    .split('\n')
    .filter(line => line)
    .map(encoded => {
        let [outer, inner] = encoded.split(' bags contain ')
        let color = outer.trim()
        let children = inner.split(', ').map(getInnerBag).filter(x => x)
        return {
            color,
            children
        }
    })

function getInnerBag(item) {
    if (item.trim().startsWith('no other bags')) {
        return null
    }
    // each item follows this format:
    // {count} {adjective} {color} {bag(s).}
    let itemParts = item.trim().split(' ').map(x => x.trim())
    itemParts.pop() // we don't care about the bag(s) - we just want count and color
    let [count, ...color] = itemParts
    return {
        count: parseInt(count, 10),
        color: color.join(' ').trim()
    }
}

function findContainers(color) {
    let options = []
    let childBags = findChildBags(color)
    options = [...options, ...childBags]
    for (let bag of childBags) {
        const nested = findContainers(bag.color)
        if (nested && nested.length) {
            options = [...new Set([...options, ...nested])]
        }
    }
    return options
}

function findChildBags(color) {
    return bags.filter(bag => {
        return bag.children.some(child => child.color === color && child.count > 0)
    })
}

const answer = findContainers('shiny gold')
console.log(answer.length)
