const largeDisplay = document.querySelector(".large-display");
const darkGreyButtons = document.querySelectorAll(".dark-grey-button");
const orangeButtons = document.querySelectorAll(".orange-button");

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
    case add:
      return add(x, y);
    case subtract:
      return subtract(x, y);
    case multiply:
      return multiply(x, y);
    case divide:
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

// add event listeners to clear large display when orange button is pressed
// won't be final functionality of these buttons but just testing out clearing the screen
// not clearing the variables though (that will be for AC)
orangeButtons.forEach((orangeButton) =>
  orangeButton.addEventListener("click", pushOperatorButton)
);

// initialise variables for use in calculator
let num1;
let num2;
let tempNum = 0;
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
    //  resets display for start of umber 2
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

  //   update tempNum holding convert what is displayed to number
  tempNum = +largeDisplay.textContent;
}

function pushOperatorButton(e) {
  let operator = e.target.textContent;
  console.log(operator);
  // update num1 for use in functions later
  num1 = tempNum;
  readyForNumberTwo = true;
  operatorPressed = true;
}

// TODO Make the calculator work! You’ll need to store the first number that is input into the calculator when a user presses an operator, and also save which operation has been chosen and then operate() on them when the user presses the “=” key.

// TODO You should already have the code that can populate the display, so once operate() has been called, update the display with the ‘solution’ to the operation.
//   - This is the hardest part of the project. You need to figure out how to store all the values and call the operate function with them. Don’t feel bad if it takes you a while to figure out the logic.
