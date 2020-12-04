const batch = require('./input')
let passports = batch.split('\n\n')
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] // cid is optional
let validPassportCount = 0
for (let passport of passports) {
    // split into an array of fields that we can map over.
    // passports can be split by spaces or newlines
    let kvPairs = passport.split(/\s/g)
    let info = {}
    for (let pair of kvPairs) {
        let [key, value] = pair.split(':')
        info[key] = value
    }
    let hasAllRequiredFields = true
    for (let f of requiredFields) {
        if (info[f] === undefined) {
            hasAllRequiredFields = false
        }
    }
    if (hasAllRequiredFields) {
        validPassportCount += 1
    }
}

console.log(validPassportCount)
