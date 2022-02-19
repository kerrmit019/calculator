/*
##############
HTML ELEMENTS
##############
*/

const largeDisplay = document.querySelector(".large-display");
const miniDisplay = document.querySelector(".mini-display");
const darkGreyButtons = document.querySelectorAll(".dark-grey-button");
const operatorButtons = document.querySelectorAll(
  ".orange-button.operator-button"
);
const equalsButton = document.querySelector("#equals-button");
const clearButton = document.querySelector("#clear-button");
const decimalButton = document.querySelector("#decimal-button");

const plusMinusButton = document.querySelector("#pos-neg-button");
const percentageButton = document.querySelector("#percentage-button");

/* 
############## 
Event Listeners
###############
*/

// Number and Decimal Button Actions
darkGreyButtons.forEach((darkGreyButton) =>
  darkGreyButton.addEventListener("click", getNumberButtonValue)
);

// Operator Buttons - x, ÷, +, -
operatorButtons.forEach((orangeButton) =>
  orangeButton.addEventListener("click", pushOperatorButton)
);

equalsButton.addEventListener("click", evaluateExpression);

clearButton.addEventListener("click", clearData);

plusMinusButton.addEventListener("click", reverseSign);

percentageButton.addEventListener("click", convertToPercentage);

// Keyboard input
document.addEventListener("keydown", readKeyboardInput);

// initialise variables for use in calculator
let num1;
let num2;
let tempNum;
let operator;
let numberButtonValue = "";
let operatorPressed = false;
let readyForNumberTwo = false;
let decimalPressed = false;

/* 
#################
Functions
################
*/

// Basic functions add, subtract, multiply, and divide.
function add(x, y) {
  let answer = x + y;
  if (/\./.test(answer)) {
    // round but also remove trailing zeroes
    return parseFloat(answer.toPrecision(9).toString());
  } else return answer;
}

function subtract(x, y) {
  let answer = x - y;
  if (/\./.test(answer)) {
    // round but also remove trailing zeroes
    return parseFloat(answer.toPrecision(9).toString());
  } else return answer;
}

function multiply(x, y) {
  let answer = x * y;
  if (/\./.test(answer)) {
    // round but also remove trailing zeroes
    return parseFloat(answer.toPrecision(9).toString());
  } else return answer;
}

function divide(x, y) {
  if (y === 0) {
    updateMiniDisplay("Division by 0!");
    return "Error";
  }

  let answer = x / y;

  if (/\./.test(answer)) {
    // round but also remove trailing zeroes
    return parseFloat(answer.toPrecision(9).toString());
  } else return answer;
}

// Takes an operator and 2 numbers and calls the add, subtract, multiply, and
// divide functions
function operate(operator, x, y) {
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

function readKeyboardInput(e) {
  if (largeDisplay.textContent == "") {
    largeDisplay.textContent = "0";
  }
  if (e.key === "Backspace") {
    if (largeDisplay.textContent.length === 1) {
      // don't clear the screen completely - change to 0.
      largeDisplay.textContent = "0";
    }
    if (largeDisplay.textContent !== "0") {
      largeDisplay.textContent = largeDisplay.textContent.slice(0, -1);
    }

    if (!/\./.test(largeDisplay.textContent)) {
      // also toggle "." button to work again if decimal has been deleted
      decimalPressed = false;
      toggleDecimalbutton();
    }
  }

  if (/[\/*\-\+]/.test(e.key)) {
    pushOperatorButton(e);
  }

  // only numeric and ".", excluded function keys F12 etc
  if (/[0-9\.]/.test(e.key) && !/F/.test(e.key)) {
    // skip over decimal if already pressed
    if (decimalPressed && e.key === ".") {
      return;
    }
    getNumberButtonValue(e);
    return;
  }

  if (e.key === "Enter") {
    evaluateExpression();
  }
}

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

function convertToPercentage() {
  readyForNumberTwo = true;
  return (largeDisplay.textContent = operate(
    "x",
    +largeDisplay.textContent,
    0.01
  ));
}

function reverseSign() {
  return (largeDisplay.textContent = -largeDisplay.textContent);
}

function getNumberButtonValue(e) {
  // if click event
  if (e.type === "click") {
    numberButtonValue = e.target.textContent;
    // or keyboard event
  } else {
    numberButtonValue = e.key;
  }
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

  // if click
  if (e.type === "click") {
    operator = e.target.textContent.trim();
  } else {
    if (e.key === "*") {
      operator = "x";
    } else if (e.key === "/") {
      operator = "÷";
    } else {
      operator = e.key;
    }
  }

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
