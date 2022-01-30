// TODO - Your calculator is going to contain functions
// for all of the basic math operators you typically find on simple calculators,
// so start by creating functions for the following items
// and testing them in your browser’s console.

//   - add
//   - subtract
//   - multiply
//   - divide

function add(x, y) {
  return x + y;
}

function subtract(x, y) {
  return x - y;
}

function multiply(x, y) {
  return x * y;
}

function divide(x, y) {
  if (y === 0) {
    return "Division by 0!";
  }
  return x / y;
}

console.log(add(2, 3)); // 5
console.log(add(-1, 3)); // 2
console.log(subtract(4, 2)); // 2
console.log(subtract(-1, 3)); // -4
console.log(multiply(-1, 3)); // -3
console.log(multiply(2, 3)); // 6
console.log(divide(4, 2)); // 2
console.log(divide(2, 4)); // 0.5
console.log(divide(2, 0)); // Division by 0!
