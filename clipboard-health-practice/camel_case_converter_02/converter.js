// normalize case to camelCase
// takes in json object and returns converted json object
// camelCase, snake_case, PascalCase, kebab-case
// no arrays or other types - so technically i wouldn't need to check for null or arrays?

import data from './data.json' assert { type: 'json' }
data
function toCamelCase(key) {
  if (key[0] === key[0].toUpperCase()) {
    // if the first letter is capitalized
    return key[0].toLowerCase() + key.slice(1)
  }
  let newKey = ''

  // handle '-' and '_'. to convert those we can loop over the key
  // and when we find a _ or a - then the next character should be capital and the -/_ removed
  for (var i = 0; i < key.length; i++) {
    if ((key[i] === '-' || key[i] === '_') && key[i + 1] !== null) {
      newKey += key[i + 1].toUpperCase()
      i++
    } else {
      newKey += key[i]
    }
  }
  return newKey
}

function processNestedJson(json) {
  let result = {}

  for (const key in json) {
    if (json.hasOwnProperty(key)) {
      // if the value of the key is not an object then we can camelCase the key and set the value ot it.
      // if it is an object then we pass it back to this function
      const newKey = toCamelCase(key)
      const value = json[key]

      if (typeof value === 'object' && value !== null) {
        // this data does not have array values. it is well formed so may not need to check for null either tbh.
        result[newKey] = processNestedJson(value)
      } else {
        result[newKey] = value
      }
    }
  }

  return result
}

function normalizeCase(json) {
  return processNestedJson(json)
}

console.log(normalizeCase(data))
// toCamelCase(Object.keys(data)[0])
