const display = document.getElementById("display");
let firstInput = true;
let result = 0;

function addToDisplay(value) {
  display.value = firstInput ? "" : display.value; // empty display if its the first input
  if (!Number.isInteger(Number(value)) && value !== ".") {
    if (firstInput) {
      display.value = value === "ans" ? value : `ans ${value} `; // display: 'ans', or 'ans (operator)'
    } else {
      if (value !== "ans") {
        display.value += ` ${value} `; // add to display ' (operator) '
      } else {
        let lastIsNumber =
          display.value.charAt(display.value.length - 1) === " "; // the " " indecates the last input is an opertator
        display.value += lastIsNumber ? value : ` * ${value}`; // add to display 'ans' OR '(num) * ans'
      }
    }
  } else {
    display.value += value; // add number to display
  }
  display.scrollLeft = display.scrollWidth; // to show the last index when the display exceeds the width of the input
  firstInput = false;
}

function removeFromDisplay() {
  display.value = display.value.substring(0, display.value.length - 1);
}

function toggleNegative() {}

function calculate() {
  try {
    display.value = display.value.replaceAll("ans", result);
    display.value = display.value.replaceAll("--", "+");
    result = eval(display.value);
    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
  firstInput = true;
}
