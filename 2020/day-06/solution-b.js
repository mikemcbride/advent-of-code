const input = require('../../readInput')(__dirname)
let groups = input.split('\n\n')
let answerCount = 0
for (let group of groups) {
    let answers = group.split('\n')
    let memberCount = answers.length
    let yesMap = new Map()
    for (let answer of answers) {
        let yes = answer.split('')
        for (let y of yes) {
            if (yesMap.has(y)) {
                let count = yesMap.get(y)
                yesMap.set(y, count + 1)
            } else {
                yesMap.set(y, 1)
            }
        }
    }
    for (let val of yesMap.values()) {
        if (val === memberCount) {
            answerCount += 1
        }
    }
}
console.log(answerCount)
