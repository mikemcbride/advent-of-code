const passwords = require('./input')
let validPasswordCount = 0

function passwordIsValid(instance) {
    // format is 1-3 a: abcde
    let [policy, password] = instance.split(': ')
    let [count, char] = policy.split(' ')
    let [min, max] = count.split('-').map(x => parseInt(x))
    password = password.split('') // get password characters as an array
    let charCount = 0
    for (let character of password) {
        if (character === char) {
            charCount += 1
        }
    }
    return (min <= charCount) && (charCount <= max)
}

for (let instance of passwords) {
    if (passwordIsValid(instance)) {
        validPasswordCount += 1
    }
}

console.log(validPasswordCount)
