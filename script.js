const largeDisplay = document.querySelector(".large-display");
const miniDisplay = document.querySelector(".mini-display");
const darkGreyButtons = document.querySelectorAll(".dark-grey-button");
const operatorButtons = document.querySelectorAll(
  ".orange-button.operator-button"
);
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector("#clear-button");
const decimalButton = document.querySelector("#decimal-button");

// - Your calculator is going to contain function
// for all of the basic math operators you typically find on simple calculators,
// so start by creating functions for the following items
// and testing them in your browser’s console.

//   - add
//   - subtract
//   - multiply
//   - divide

function add(x, y) {
  let answer = x + y;
  if (/\./.test(answer)) {
    return answer.toPrecision(4);
  } else return answer;
}

function subtract(x, y) {
  let answer = x - y;
  if (/\./.test(answer)) {
    return answer.toPrecision(4);
  } else return answer;
}

function multiply(x, y) {
  let answer = x * y;
  if (/\./.test(answer)) {
    return answer.toPrecision(4);
  } else return answer;
}

function divide(x, y) {
  if (y === 0) {
    updateMiniDisplay("Division by 0!");
    return "Error";
  }

  let answer = x / y;

  if (/\./.test(answer)) {
    return answer.toPrecision(4);
  } else return answer;
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
  // console.log({ x }, { y });
  // console.log(typeof x);

  //  check for NaN
  // will always be false if NaN
  if (x === x && y === y) {
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
        return largeDisplay.textContent;
    }
  }
  return (largeDisplay.textContent = "Error");
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

clearButton.addEventListener("click", clearData);

// initialise variables for use in calculator
let num1;
let num2;
let tempNum;
let operator;
let numberButtonValue = "";
let operatorPressed = false;
let readyForNumberTwo = false;
let decimalPressed = false;

function clearData() {
  // reset all variables when AC is pressed
  num1 = undefined;
  num2 = undefined;
  tempNum = undefined;
  operator = undefined;
  numberButtonValue = "0";
  operatorPressed = false;
  readyForNumberTwo = false;
  decimalPressed = false;
  toggleDecimalbutton();
  // reset screen to say 0
  largeDisplay.textContent = "0";
  // reset mini display to be blank
  updateMiniDisplay("");
}

function getNumberButtonValue(e) {
  numberButtonValue = e.target.textContent;
  // console.log(numberButtonValue);
  updateLargeDisplay(numberButtonValue);
  // clears '=' from minidisplay after starting second expression
  if (!readyForNumberTwo && !operatorPressed) {
    updateMiniDisplay("");
  }
  if (numberButtonValue === ".") {
    decimalPressed = true;
    toggleDecimalbutton();
  }
}

function toggleDecimalbutton() {
  if (decimalPressed) {
    decimalButton.removeEventListener("click", getNumberButtonValue);
    return;
  }
  decimalButton.addEventListener("click", getNumberButtonValue);
  return;
}

function updateLargeDisplay(numberButtonValue) {
  //   check if operator was just pushed and we're changing to number two
  if (readyForNumberTwo) {
    //  resets display for start of number 2
    largeDisplay.textContent = numberButtonValue;
    if (numberButtonValue === ".") {
      // add leading zero
      largeDisplay.textContent = "0.";
    }
    // reset decimal press
    decimalPressed = false;
    toggleDecimalbutton();
    readyForNumberTwo = false;
    return;
  }

  // limit to 9 places in the screen
  if (largeDisplay.textContent.length >= 9) {
    // console.log("nine");
    return;
  }

  //  if button is decimal and is first button pressed add leading "0"
  if (largeDisplay.textContent === "0" && numberButtonValue === ".") {
    largeDisplay.textContent += numberButtonValue;
    return;
  }
  // clear initial placeholder "0"
  largeDisplay.textContent !== "0"
    ? (largeDisplay.textContent += numberButtonValue)
    : (largeDisplay.textContent = numberButtonValue);
}

function pushOperatorButton(e) {
  // if operator previously  pressed and already have number 2  means chaining
  if (operator) {
    if (operatorPressed && !readyForNumberTwo) {
      evaluateExpression();
    }
  }
  operator = e.target.textContent.trim();
  // console.log(operator);

  // update num1 for use in functions later
  // read off large display
  num1 = +largeDisplay.textContent;
  decimalPressed = false;
  toggleDecimalbutton();
  readyForNumberTwo = true;
  operatorPressed = true;
  // send operator only for mini display
  updateMiniDisplay(`${operator} `);
}

// display operator only
function updateMiniDisplay(displayInput) {
  miniDisplay.textContent = displayInput;
}

function evaluateExpression() {
  // update mini display with equals sign
  updateMiniDisplay("=");
  // check if operator was pressed
  if (operatorPressed) {
    // read num2 from display
    num2 = +largeDisplay.textContent;
    largeDisplay.textContent = operate(operator, num1, num2);
    // then num2 becomes held in tempnum for next operation, this will help if = repeatedly pushed to
    // repeat previous operation e.g x2 to get 3x2 = 6, = 12, = 24 ...
    tempNum = num2;
    operatorPressed = false;
    // get ready for next number to input, because if "=" pushed then more number buttons pressed
    // previously would just add on to the answer, but we want a new number input
    readyForNumberTwo = true;
    decimalPressed = false;
    toggleDecimalbutton();
    return;
  }

  // this will only run if operator not previously pressed again and equals is
  //  if this works for repeatedly pushing equals to mimic repeat e.g X2 overagain
  num2 = tempNum;
  num1 = +largeDisplay.textContent;
  largeDisplay.textContent = operate(operator, num1, num2);

  return;
}
// TODO Add in percentage button functionality
// TODO Add in +/- button functionality
// TODO Add backspace button to delete errors
// TODO Add keyboard support
