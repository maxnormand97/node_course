const fs = require('fs')
const data = fs.readFileSync('1-json.json').toString()
console.log(data)
const parseJson = JSON.parse(data)
console.log(parseJson.name)
const stringifyJson = JSON.stringify(parseJson)
console.log(stringifyJson)