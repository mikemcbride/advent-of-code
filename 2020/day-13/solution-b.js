let [, busIds] = require('../../readInput')(__dirname).split('\n')
let busses = busIds.split(',').map((it, offset) => {
    let interval
    if (it !== 'x') {
        interval = parseInt(it, 10)
    } else {
        interval = it
    }
    return { interval, offset }
}).filter(it => it.interval !== 'x')

// greatest common denominator
function gcd(a, b) {
    if (a === 0) {
        return [b, 0, 1]
    }
    const [g, x1, y1] = gcd(b % a, a)
    return [g, y1 - Math.trunc(b/a) * x1, x1]
}

// multiplicative inverse
function multInv(b, m) {
    const [g, x, y] = gcd(b, m)
    if (g !== 1) {
        console.log('fail')
    }
    let result = x % m
    while (result < 0) {
        result += m
    }
    return result
}

let departure = 0
let N = 1
for (let bus of busses) {
    const { offset, interval } = bus
    const ttl = (interval - (departure + offset) % interval) % interval
    const inverse = multInv(N, interval)
    const step = (inverse * ttl) % interval
    departure = departure + (N * step)
    N = N * interval
}
console.log(departure)
