const input = require('../../readInput')(__dirname)
let groups = input.split('\n\n')
let answerCount = 0
for (let group of groups) {
    let answers = group.split('\n')
    let memberCount = answers.length
    let seen = new Set()
    for (let answer of answers) {
        let yes = answer.split('')
        for (let y of yes) {
            if (!seen.has(y)) {
                seen.add(y)
                answerCount += 1
            }
        }
    }
}
console.log(answerCount)
