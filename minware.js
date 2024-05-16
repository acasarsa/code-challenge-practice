// What Javascript statement in place of "?" will make the result always be between 6 and 7?
const x = 2
let y = 4
function update(arg) {
  console.log('math random', Math.random())
  console.log('y * arg =', y * arg)
  return Math.random() + y * arg
  // mr always less than 1 so whatever y * arg is would create a range from y * arg to (y*arg + 1)
}
y = 2
y = 1.5
// ?

const result = update(x)
console.log(result)
