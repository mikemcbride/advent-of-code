const fs = require('fs')
const path = require('path')

module.exports = function (inputPath) {
    const input = fs.readFileSync(path.join(inputPath, 'input.txt'), 'utf-8')
    return input.trim()
}
