const largeDisplay = document.querySelector(".large-display");
const miniDisplay = document.querySelector(".mini-display");
const darkGreyButtons = document.querySelectorAll(".dark-grey-button");
const operatorButtons = document.querySelectorAll(
  ".orange-button.operator-button"
);
const equalsButton = document.querySelector("#equals-button");

// - Your calculator is going to contain function
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

// Testing the above functions
// console.log(add(2, 3)); // 5
// console.log(add(-1, 3)); // 2
// console.log(subtract(4, 2)); // 2
// console.log(subtract(-1, 3)); // -4
// console.log(multiply(-1, 3)); // -3
// console.log(multiply(2, 3)); // 6
// console.log(divide(4, 2)); // 2
// console.log(divide(2, 4)); // 0.5
// console.log(divide(2, 0)); // Division by 0!

// Create a new function operate that takes an operator and 2 numbers
//  and then calls one of the above functions on the numbers.
function operate(operator, x, y) {
  switch (operator) {
    case "+":
      return add(x, y);
    case "-":
      return subtract(x, y);
    case "x":
      return multiply(x, y);
    case "÷":
      return divide(x, y);
    default:
      return "This is the default operator";
  }
}

// test operate(operator, x, y)

// console.log(operate(add, 2, 3)); // 5
// console.log(operate(add, -1, 3)); // 2
// console.log(operate(subtract, 4, 2)); // 2
// console.log(operate(subtract, -1, 3)); // -4
// console.log(operate(multiply, -1, 3)); // -3
// console.log(operate(multiply, 2, 3)); // 6
// console.log(operate(divide, 4, 2)); // 2
// console.log(operate(divide, 2, 4)); // 0.5
// console.log(operate(divide, 2, 0)); // Division by 0!

// Create the functions that populate the display when you click the number buttons… you should be storing the ‘display value’ in a variable somewhere for use in the next step.

// Event Listeners
// add eventlisteners to store and display value on each press of a number button
darkGreyButtons.forEach((darkGreyButton) =>
  darkGreyButton.addEventListener("click", getNumberButtonValue)
);

// add event listeners to save number1 and operator when pushed and clear screen
operatorButtons.forEach((orangeButton) =>
  orangeButton.addEventListener("click", pushOperatorButton)
);

equalsButton.addEventListener("click", evaluateExpression);

// initialise variables for use in calculator
let num1;
let num2;
let tempNum = 0;
let operator;
let numberButtonValue = "";
let operatorPressed = false;
let readyForNumberTwo = false;

function getNumberButtonValue(e) {
  numberButtonValue = e.target.textContent;
  console.log(numberButtonValue);
  updateLargeDisplay(numberButtonValue);
}

function updateLargeDisplay(numberButtonValue) {
  //   check if operator was just pushed and we're changing to number two
  if (readyForNumberTwo) {
    //  resets display for start of number 2
    largeDisplay.textContent = numberButtonValue;
    readyForNumberTwo = false;
    return;
  }

  // limit to 9 places
  if (largeDisplay.textContent.length >= 9) {
    console.log("nine");
    return;
  }
  // clear initial placeholder "0"
  largeDisplay.textContent !== "0"
    ? (largeDisplay.textContent += numberButtonValue)
    : (largeDisplay.textContent = numberButtonValue);
}

function pushOperatorButton(e) {
  operator = e.target.textContent.trim();
  console.log(operator);

  // TODO save for later for when chaining options together.
  // if (operatorPressed) {
  //   readyToEvaluate(previousOperator);
  // }

  // update num1 for use in functions later
  // read off large display
  num1 = +largeDisplay.textContent;
  readyForNumberTwo = true;
  operatorPressed = true;
  // send operator only for
  updateMiniDisplay(`${operator} `);
}

// display operator only
function updateMiniDisplay(displayInput) {
  miniDisplay.textContent = displayInput;
}

function evaluateExpression() {
  // check if num1 and num2 have values (need 2 numbers to evaluate expression)
  // read num2 from display
  num2 = +largeDisplay.textContent;
  if (num1 !== undefined && num2 != undefined) {
    largeDisplay.textContent = operate(operator, num1, num2);
  }

  // TODO need  to do a check so  that
  //  if this works for repeatedly pushing equals to mimic repeat e.g X2 overagain

  return;
}

//   TODO check if ready to equals (e.g. if operator previously pressed
// and another operator pressed -> chaining commands
// then evaluate and print answer in large display
// and clear mini display
function readyToEvaluate(previousOperator) {}
