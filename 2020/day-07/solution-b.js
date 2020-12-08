const readInput = require('../../readInput')

const bagMap = {}
readInput(__dirname)
    .split('\n')
    .filter(line => line)
    .forEach(encoded => {
        let [outer, inner] = encoded.split(' bags contain ')
        let color = outer.trim()
        let children = inner.split(', ').map(getInnerBag).filter(x => x)
        bagMap[color] = {
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

function findRequiredBagsCount(color) {
    const bagColor = bagMap[color]
    return bagColor.children.reduce((acc, bag) => {
        const innerCount = findRequiredBagsCount(bag.color)
        return acc + bag.count + bag.count * innerCount
    }, 0)
}

const answer = findRequiredBagsCount('shiny gold')
console.log(answer)
