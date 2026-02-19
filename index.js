const display = document.getElementById("display");
let firstInput = true;
let result = 0;

document.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    e.preventDefault(); // to prevent deleting twice
    display.value = display.value.substring(0, display.value.length - 1);
  } else if (e.key === "C" || e.key === "c") {
    e.preventDefault(); // to prevent adding the c to display
    removeFromDisplay();
  } else {
    let regex = /[0-9+\-*/%.]/;
    if (!regex.test(e.key)) {
      e.preventDefault(); // to prevent adding invalid characters to the text type input
    }

    if (!(document.activeElement === display) && regex.test(e.key)) {
      // update display when it is not focused, else it will cause calling addToDisplay() twice
      addToDisplay(e.key);
    }
  }
});

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

function toggleNegative() {
  if (firstInput) {
    display.value = "-ans";
  } else if (!display.value.includes(" ")) {
    // if the display only contains a number (detemened if there was no space from an operator ' operator ')
    display.value = "-" + display.value;
  } else {
    // add negative at the end or before the last inserted number
    lastNumber = display.value.substring(
      display.value.length,
      display.value.lastIndexOf(" ") + 1,
    );

    if (lastNumber.includes("-")) {
      lastNumber = " " + lastNumber.substring(1);
    } else {
      lastNumber = " -" + lastNumber;
    }

    display.value = display.value.substring(0, display.value.lastIndexOf(" ")) + lastNumber;
  }

  firstInput = false;
}

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
