const batch = require('./input')
let passports = batch.split('\n\n')
let validPassportCount = 0
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'] // cid is optional
const checkRequirements = {
    byr: val => parseInt(val) >= 1920 && parseInt(val) <= 2002,
    iyr: val => parseInt(val) >= 2010 && parseInt(val) <= 2020,
    eyr: val => parseInt(val) >= 2020 && parseInt(val) <= 2030,
    hgt: val => {
        if (val.endsWith('in')) {
            let num = parseInt(val.slice(0, -2))
            return num >= 59 && num <= 76
        } else if (val.endsWith('cm')) {
            let num = parseInt(val.slice(0, -2))
            return num >= 150 && num <= 193
        }
        return false
    },
    hcl: val => (/^#[0-9A-F]{6}$/i).test(val),
    ecl: val => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(val),
    pid: val => val.length === 9 && !isNaN(parseInt(val)),
}

for (let passport of passports) {
    // split into an array of fields that we can map over.
    // passports can be split by spaces or newlines
    let kvPairs = passport.split(/\s/g)
    let info = {}
    for (let pair of kvPairs) {
        let [key, value] = pair.split(':')
        info[key] = value
    }
    let isValid = checkPassportValid(info)
    if (isValid) {
        validPassportCount += 1
    }
}

function checkPassportValid(data) {
    for (let f of requiredFields) {
        if (data[f] === undefined) {
            return false // not valid if missing a field
        } else if (!fieldIsValid(f, data[f])) {
            return false // return false if the field is invalid
        }
    }
    return true
}

function fieldIsValid(fieldName, value) {
    return checkRequirements[fieldName](value)
}

console.log(validPassportCount)
