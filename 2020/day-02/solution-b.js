const passwords = require('./input')
let validPasswordCount = 0

function passwordIsValid(instance) {
    // format is 1-3 a: abcde
    let [policy, password] = instance.split(': ')
    let [count, char] = policy.split(' ')
    let [index1, index2] = count.split('-').map(x => parseInt(x))
    let matches = 0
    if (password.charAt(index1 - 1) === char) matches += 1
    if (password.charAt(index2 - 1) === char) matches += 1
    return matches === 1
}

for (let instance of passwords) {
    if (passwordIsValid(instance)) {
        validPasswordCount += 1
    }
}

console.log(validPasswordCount)
