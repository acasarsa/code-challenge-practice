import data from './data.json' assert { type: 'json' }
// function normalizeKeys(data) {
//   // loop over the data to get the key. then once you have the key
//   // loop over the characters of the key to see which type of casing it is.
//   // depending on the casing do different things.
//   // save new key and set it to value.
// }

function normalizeKeys(data) {
  const result = {}
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key]
      const newKey = toCamelCase(key)
      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        result[newKey] = normalizeKeys(value)
      } else {
        result[newKey] = value
      }
    }
  }
  return result
}

function toCamelCase(key) {
  if (isUpperCase(key[0])) {
    return key[0].toLowerCase() + key.slice(1)
  }
  // check for '-', '_', uppercase letters
  // if first letter is lowercase and no - or _ or found then it is already camelCase
  // this is a helper function don't forget you are now dealing with just the key
  let newKey = ''

  for (let i = 0; i < key.length; i++) {
    if ((key[i] === '-' || key[i] === '_') && i + 1 < key.length) {
      newKey += key[i + 1].toUpperCase()
      i++
    } else {
      newKey += key[i]
    }
  }
  return newKey
}

function isUpperCase(char) {
  return char === char.toUpperCase()
}
console.log(normalizeKeys(data))
